import os

def modify_lines_in_files(folder_path):
    replacements = {
        "0 ": "16 ",
        "1 ": "31 ",
        "2 ": "32 ",
        "3 ": "34 ",
        "4 ": "35 "
    }
    
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):  # Only process .txt files
            file_path = os.path.join(folder_path, filename)
            with open(file_path, "r", encoding="utf-8") as file:
                lines = file.readlines()
            
            modified_lines = [next((replacement + line[len(key):] for key, replacement in replacements.items() if line.startswith(key)), line) for line in lines]
            
            with open(file_path, "w", encoding="utf-8") as file:
                file.writelines(modified_lines)

# 사용 예시: 특정 폴더 경로 지정
folder_path = "C:/Users/SSAFY/Downloads/obj_train_data"  # 여기에 대상 폴더 경로 입력
modify_lines_in_files(folder_path)