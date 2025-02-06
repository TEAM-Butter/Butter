from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")  # CORS 허용

def create_app():
    app = Flask(__name__)
    
    # 환경 변수 또는 설정 파일 로드
    app.config["SECRET_KEY"] = "your_secret_key"

    # 블루프린트 등록
    from .routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    # WebSocket 초기화
    socketio.init_app(app)

    return app