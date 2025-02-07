import torch
import cv2
from ultralytics import YOLO  # Ensure ultralytics package is installed

def train():
    # Check for CUDA availability
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f'Using device: {device}')
    
    # Load YOLOv10 model (update path if necessary)
    model = YOLO('./YOLOv10n_gestures.pt')  # Ensure the correct model file is used
    model.to(device)
    
    # Fine-tune the model
    model.train(data='./data.yaml', epochs=50, batch=10, imgsz=1024, device=device)
    
    print("Training completed.")
    
if __name__ == "__main__":
    train()
