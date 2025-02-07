from flask import Blueprint, jsonify, request

api_bp = Blueprint("api", __name__)

@api_bp.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "OK"}), 200


@api_bp.route("/data", methods=["POST"])
def receive_data():
    if not request.is_json:
        return jsonify({"error": "Invalid JSON"}), 400

    data = request.get_json()
    return jsonify({"received": data}), 201