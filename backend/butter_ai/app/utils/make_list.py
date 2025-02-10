import os
import yaml

def generate_data_yaml(dataset_path, classes):
    data_yaml = {
        "train": os.path.join(dataset_path, "images", "train"),
        "val": os.path.join(dataset_path, "images", "val"),
        "nc": len(classes),
        "names": classes
    }

    yaml_path = os.path.join(dataset_path, "data.yaml")
    with open(yaml_path, "w") as file:
        yaml.dump(data_yaml, file, default_flow_style=False)

    print(f"data.yaml saved at: {yaml_path}")

def get_classes(labels_path):
    classes_set = set()
    
    for label_file in os.listdir(labels_path):
        if label_file.endswith(".txt"):
            with open(os.path.join(labels_path, label_file), "r") as f:
                for line in f:
                    parts = line.strip().split()
                    if parts:
                        classes_set.add(int(parts[0]))  # Class ID 추가

    return sorted(list(classes_set))

if __name__ == "__main__":
    dataset_path = "./dataset"  # 데이터셋 폴더 경로 설정
    labels_path = os.path.join(dataset_path, "labels", "train")  # 라벨 폴더 경로
    
    if not os.path.exists(labels_path):
        print(f"Error: Labels path {labels_path} not found.")
    else:
        class_ids = get_classes(labels_path)
        class_names = [f"class_{i}" for i in class_ids]  # 클래스명을 자동 생성 (필요시 직접 수정)
        
        generate_data_yaml(dataset_path, class_names)
