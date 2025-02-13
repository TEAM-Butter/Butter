from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
sock = SocketIO(cors_allowed_origins="*")
CORS(app, allowed_origins="*")


def create_app():
    # 환경 변수 또는 설정 파일 로드
    app.config["SECRET_KEY"] = "your_secret_key"

    with app.app_context():
        from .routes.api import api_bp
        from .routes.ai import ai_bp

        sock.init_app(app=app)

        # 블루프린트 등록
        app.register_blueprint(api_bp, url_prefix="/api")
        app.register_blueprint(ai_bp, url_prefix="/ai")

        return app