import base64
import numpy as np
import cv2
from flask import Blueprint, request, jsonify
from app.services.ai_service import process_frame

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/upload_frame", methods=["POST"])
def upload_frame():
    """
    클라이언트에서 HTTP POST 요청으로 영상 프레임을 전송받아 YOLO v10으로 분석하는 엔드포인트.
    """
    try:
        data = request.json  # JSON 데이터 수신
        if "frame" not in data:
            return jsonify({"error": "No frame provided"}), 400

        # Base64 디코딩 → OpenCV 프레임 변환
        img_data = base64.b64decode(data["frame"])
        np_arr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # YOLO v10 객체 탐지
        detection = process_frame(frame)

        # TODO: 소켓쪽으로 연결 필요


        return jsonify(detection) if detection else jsonify({"status": "no_object"}), 200


    except Exception as e:
        print(f"Error processing frame: {e}")
        return jsonify({"error": str(e)}), 500
