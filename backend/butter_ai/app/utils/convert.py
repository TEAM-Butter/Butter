import torch
import json

# .pt 파일 경로 지정
pt_file_path = './last.pt'
json_file_path = './model.json'

# CUDA 사용 가능 여부 확인
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# PyTorch 모델 로드
model = torch.load(pt_file_path, map_location=device)

# 모델 상태 딕셔너리 확인
if isinstance(model, dict) and 'state_dict' in model:
    model_state_dict = model['state_dict']
else:
    model_state_dict = model

# Tensor를 Python 기본 데이터 타입으로 변환
def tensor_to_list(tensor):
    return tensor.cpu().detach().numpy().tolist()

model_dict = {}
for key, value in model_state_dict.items():
    model_dict[key] = tensor_to_list(value) if torch.is_tensor(value) else value

# JSON 파일로 저장
with open(json_file_path, 'w') as json_file:
    json.dump(model_dict, json_file)

print(f"Model successfully converted to JSON and saved to {json_file_path}")