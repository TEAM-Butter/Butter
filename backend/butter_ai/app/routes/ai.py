import base64
import numpy as np
import cv2
from flask import Blueprint, request, jsonify
from app.services.ai_service import process_frame

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

    # TODO: 소켓쪽으로 연결 필요


    return jsonify(detection) if detection else jsonify({"status": "no_object"}), 200
