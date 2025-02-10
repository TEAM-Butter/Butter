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
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    img_np = np.frombuffer(file.read(), np.uint8)  # 바이트 데이터를 numpy 배열로 변환
    frame = cv2.imdecode(img_np, cv2.IMREAD_COLOR)  # OpenCV로 이미지 디코딩

    # YOLO v10 객체 탐지
    detection = process_frame(frame)

    # 웹소켓으로 탐지 결과 송신
    room_id = request.form.get("roomId")
    sock.emit("message", jsonify(detection), roomId=room_id)

    return jsonify(detection) if detection else jsonify({"status": "no_object"}), 200


@sock.on("join")
def on_join(data):
    room_id = data["roomId"]
    join_room(room_id)
    sock.emit("message", f"User {request.sid} joined room {room_id}", room=room_id)


@sock.on("leave")
def on_leave(data):
    room_id = data["roomId"]
    leave_room(room_id)
    sock.emit("message", f"User {request.sid} left room {room_id}", room=room_id)


@sock.on("uploadFrame")
def on_upload_frame(data):
    room_id = data["roomId"]
    detection = f"Flask detected: {data}"
    sock.emit("message", detection, room=room_id)
