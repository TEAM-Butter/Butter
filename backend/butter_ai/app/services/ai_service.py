import os
import torch
import concurrent.futures
from ultralytics import YOLO  # Ensure ultralytics package is installed

# YOLO v10 모델 로드
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # flask-server/app/
MODEL_PATH = os.path.join(BASE_DIR, "models", "last.pt")  # flask-server/models/last.pt

device = "cuda" if torch.cuda.is_available() else "cpu"  # GPU 사용 여부 확인
print(f"🔹 Using device: {device}")
model = YOLO(MODEL_PATH)  # Ensure the correct model file is used
model.to(device)

def process_single_frame(frame):
    """
    YOLO v10을 사용해 실시간 영상 프레임을 분석하는 함수.
    
    Args:
        frame (np.ndarray): OpenCV 이미지 배열 (BGR)

    Returns:
        list: 신뢰도 80% 이상 탐지된 객체 목록
    """
    results = model(frame)
    detection = None

    for result in results:  # (x1, y1, x2, y2, conf, cls)
        boxes = result.boxes  # 🔹 YOLO v10에서는 .boxes 사용
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()  # 경계 상자 좌표
            conf = float(box.conf[0].cpu().item())  # 신뢰도 점수
            cls = int(box.cls[0].cpu().item())  # 클래스 ID
            if conf >= 0.7:
                if detection is None or conf > detection["confidence"]:
                    detection = {
                        "label": model.names[int(cls)],
                        "confidence": conf,
                        "bbox": [float(x1), float(y1), float(x2), float(y2)]
                        }

    return detection

def process_frames_parallel(frames):
    results = []
    with concurrent.futures.ThreadPoolExecutor() as executor:  # 또는 ProcessPoolExecutor
        futures = [executor.submit(process_single_frame, frame) for frame in frames]
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    return results
