import cv2
import time
import os

def get_unique_filename(base_name):
    count = 1
    filename = f"{base_name}_{count}.jpg"
    while os.path.exists(filename):
        count += 1
        filename = f"{base_name}_{count}.jpg"
    return filename

def capture_image():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        return
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        cv2.imshow("Camera", frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == 13:
            start_time = time.time()
            while time.time() - start_time < 3:
                ret, frame = cap.read()
                if not ret:
                    break
                cv2.imshow("Camera", frame)
                cv2.waitKey(1)
            filename = get_unique_filename("captured_image")
            cv2.imwrite(filename, frame)
            print(f"이미지가 '{filename}'로 저장되었습니다.")
        elif key == 27:
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    capture_image()
