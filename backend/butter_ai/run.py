import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))  # 현재 디렉토리를 sys.path에 추가

from app import create_app, sock

app = create_app()

if __name__ == "__main__":
    sock.run(app=app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
    # app.run(host="0.0.0.0", port=5000, debug=True)
