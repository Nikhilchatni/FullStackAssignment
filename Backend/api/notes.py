from flask import request, jsonify, Blueprint
from model import db, Note
from flask_jwt_extended import jwt_required, get_jwt_identity

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/notes', methods=['POST'])
@jwt_required()
def create_note():
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if not all([title, content]):
        return jsonify({"error": "Title and Content are required"}), 400
    user_id = int(get_jwt_identity())

    new_note = Note(
        note_title=title,
        note_content=content,
        user_id=user_id
    )

    db.session.add(new_note)
    db.session.commit()

    return jsonify({"message": "Note created successfully"}), 201


@notes_bp.route('/notes', methods=['GET'])
@jwt_required()
def get_notes():
    user_id = int(get_jwt_identity())

    notes = Note.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": n.note_id,
            "title": n.note_title,
            "content": n.note_content,
            "created_on": n.created_on,
            "last_update": n.last_update
        } for n in notes
    ]), 200


@notes_bp.route('/notes/<int:note_id>', methods=['PUT'])
@jwt_required()
def update_note(note_id):
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if not all([title, content]):
        return jsonify({"error": "Title and Content are required"}), 400

    user_id = int(get_jwt_identity())

    note = Note.query.filter_by(note_id=note_id, user_id=user_id).first()

    if not note:
        return jsonify({"error": "Note not found or unauthorized"}), 404

    note.note_title = title
    note.note_content = content
    db.session.commit()

    return jsonify({"message": "Note updated successfully"}), 200


@notes_bp.route('/notes/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    user_id = int(get_jwt_identity())

    note = Note.query.filter_by(note_id=note_id, user_id=user_id).first()

    if not note:
        return jsonify({"error": "Note not found or unauthorized"}), 404

    db.session.delete(note)
    db.session.commit()

    return jsonify({"message": "Note deleted successfully"}), 200
