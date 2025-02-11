import base64
import numpy as np
import cv2
from flask import Blueprint, request, jsonify
from flask_socketio import join_room, leave_room
from app.services.ai_service import process_frame

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
    sock.emit("message", f"User {request.sid}({role}) joined room {room_id}", room=room_id)


@sock.on("leave")
def on_leave(data):
    room_id = data["roomName"]
    leave_room(room_id)
    sock.emit("message", f"User {request.sid} left room {room_id}", room=room_id)
