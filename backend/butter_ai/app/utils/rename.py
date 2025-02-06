import os
import re

def rename_files_in_folder(folder_path, prefix="IK"):
    if not os.path.exists(folder_path):
        print("지정된 폴더가 존재하지 않습니다.")
        return
    
    for filename in os.listdir(folder_path):
        if re.match(r'^\d', filename):
            new_name = prefix + filename
            old_path = os.path.join(folder_path, filename)
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)
            print(f'Renamed: {filename} -> {new_name}')

folder_path = "C:/Users/SSAFY/Downloads/F_job_2008900_won/obj_train_data"
rename_files_in_folder(folder_path)
