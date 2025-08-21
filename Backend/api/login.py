from flask import request, jsonify, Blueprint
from model import db, Users
from flask_jwt_extended import create_access_token

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Email and password are required"}), 400
    
    user = Users.query.filter_by(user_email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if user.user_password != password:
        return jsonify({"error": "Invalid password"}), 401
    
    access_token = create_access_token(identity=str(user.user_id))

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "user_email": user.user_email
        }
    }), 200
