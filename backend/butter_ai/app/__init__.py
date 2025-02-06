from flask import Flask
from flask_sock import Sock
from .routes.api import api_bp
from app.routes.ai import ai_bp

socketio = SocketIO(cors_allowed_origins="*")  # CORS 허용

def create_app():
    app = Flask(__name__)
    
    # 환경 변수 또는 설정 파일 로드
    app.config["SECRET_KEY"] = "your_secret_key"

    # 블루프린트 등록
    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(ai_bp, url_prefix="/ai")

    # WebSocket 초기화
    socketio.init_app(app)

    return app