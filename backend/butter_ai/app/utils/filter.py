import os
import shutil

def move_files(base_path, target_folder):
    subsets = ['valid', 'train', 'test']
    os.makedirs(target_folder, exist_ok=True)
    os.makedirs(os.path.join(target_folder, 'images'), exist_ok=True)
    os.makedirs(os.path.join(target_folder, 'labels'), exist_ok=True)
    
    for subset in subsets:
        labels_path = os.path.join(base_path, subset, 'labels')
        images_path = os.path.join(base_path, subset, 'images')
        
        if not os.path.exists(labels_path) or not os.path.exists(images_path):
            continue
        
        for label_file in os.listdir(labels_path):
            label_file_path = os.path.join(labels_path, label_file)
            
            if not label_file.endswith('.txt'):
                continue
            
            with open(label_file_path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                
            if any(line.startswith('5') for line in lines if line.strip()):
                image_file = os.path.splitext(label_file)[0] + '.jpg'  # 확장자 변경 가능
                image_file_path = os.path.join(images_path, image_file)
                
                shutil.move(label_file_path, os.path.join(target_folder, 'labels', label_file))
                if os.path.exists(image_file_path):
                    shutil.move(image_file_path, os.path.join(target_folder, 'images', image_file))
                print(f"Moved: {label_file} and {image_file}")

# 사용 예시
base_directory = "C:/Users/SSAFY/Downloads/Hand Gesture.v6i.yolov7pytorch"  # 데이터셋 경로
output_directory = "C:/Users/SSAFY/Downloads/Hand Gesture.v6i.yolov7pytorch/filter"  # 이동할 폴더 경로
move_files(base_directory, output_directory)
