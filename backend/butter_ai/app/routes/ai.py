import base64

import flask_socketio
import numpy as np
import cv2
from flask import Blueprint, request, jsonify
from flask_socketio import join_room, leave_room, rooms
from app.services.ai_service import process_frame
from app.services import websocket_room_service

from app import sock

ai_bp = Blueprint("ai", __name__)


@ai_bp.route("/upload_frame", methods=["POST"])
def upload_frame():
    room_id = request.form.get("room-id")
    if room_id is None or room_id == '':
        error = {"error": "No room ID provided"}
        return error, 400

    if "file" not in request.files:
        error = {"error": "No file provided"}
        return error, 400

    file = request.files["file"]
    img_np = np.frombuffer(file.read(), np.uint8)  # 바이트 데이터를 numpy 배열로 변환
    frame = cv2.imdecode(img_np, cv2.IMREAD_COLOR)  # OpenCV로 이미지 디코딩

    # YOLO v10 객체 탐지
    detection = process_frame(frame)
    if detection is None:
        detection = {"status": "no_object"}
    detection["participant"] = request.form.get("participant")
    detection["role"] = request.form.get("role")
    detection["roomMotions"] = websocket_room_service.room_motions.get(room_id)
    detection["members"] = websocket_room_service.room_members.get(room_id)

    # 웹소켓으로 탐지 결과 송신
    sock.emit("message", detection, room=room_id)

    return detection, 200


@sock.on("join")
def on_join(data):
    room_id = data["roomName"]
    if room_id is None or room_id == '':
        print("No room ID provided")
        sock.emit("message", "No room ID provided", room=room_id)
        return

    print("Joined room {}".format(room_id))

    role = data["role"]

    join_room(room_id)
    member = {"nickname": data["participant"], "avatarType": data["avatarType"]}
    websocket_room_service.put_member(room_id, member)
    join_response = {"motions": websocket_room_service.room_motions.get(room_id)}
    room_members = websocket_room_service.room_members.get(room_id)
    if len(room_members) < 20:
        join_response["members"] = room_members
    else:
        join_response["members"] = room_members[:20]
    sock.emit("join", join_response, room=room_id)


@sock.on("leave")
def on_leave(data):
    room_id = data["roomName"]
    if room_id is None or room_id == '':
        print("No room ID provided")
        sock.emit("message", "No room ID provided", room=room_id)
        return

    leave_room(room_id)
    websocket_room_service.remove_member(room_id, data["participant"])
    if get_room_size(room_id) == 0:
        print(f"Room {room_id} is empty")
        websocket_room_service.remove_room(room_id)
    sock.emit("leave", websocket_room_service.room_members.get(room_id), room=room_id)


@sock.on("increaseEmotionCount")
def on_increase_emotion_count(data):
    print("################ Increase emotion count ################")
    print(data)
    room_id = data["roomName"]
    if room_id is None or room_id == '':
        print("No room ID provided")
        sock.emit("message", "No room ID provided", room=room_id)
        return

    websocket_room_service.increase_motion_count(room_id, data["emotion"])
    sock.emit("increaseEmotionCount", websocket_room_service.room_motions[room_id], room=room_id)
    print(websocket_room_service.room_motions)


def get_room_size(room_id):
    return len(sock.server.manager.rooms.get("/", {}).get(room_id, {}))
