from flask import request, jsonify, Blueprint
from model import db, Users


signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup',methods=['POST'])

def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "All fields are required"}), 400
    
    existing_user = Users.query.filter_by(user_email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400
    
    new_user = Users(
        user_name=name,
        user_email=email,
        user_password=password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Server Error", "error": str(e)}), 500

