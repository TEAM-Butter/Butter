import cv2
import torch

# YOLO v10 모델 로드
MODEL_PATH = "models/yolov10.pt"  # YOLO v10 가중치 경로
model = torch.hub.load("ultralytics/yolov10", "yolov10", pretrained=True)

def process_frame(frame):
    """
    YOLO v10을 사용해 실시간 영상 프레임을 분석하는 함수.
    
    Args:
        frame (np.ndarray): OpenCV 이미지 배열 (BGR)

    Returns:
        list: 신뢰도 80% 이상 탐지된 객체 목록
    """
    results = model(frame)
    detection = None

    for result in results.xyxy[0]:  # (x1, y1, x2, y2, conf, cls)
        x1, y1, x2, y2, conf, cls = result.tolist()
        if conf >= 0.8:
            if detection is None or conf > detection["confidence"]:
                detection = {
                    "label": model.names[int(cls)],
                    "confidence": conf,
                    "bbox": [x1, y1, x2, y2]
                    }

    return detection
