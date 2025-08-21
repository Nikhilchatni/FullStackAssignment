from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(100))
    user_email = db.Column(db.String(150))
    user_password = db.Column(db.String(50), nullable=False)
    last_update = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    create_on = db.Column(db.DateTime, default=datetime.utcnow)

    # If a user is deleted, all their notes will also be deleted automatically.
    notes = db.relationship("Note", backref="user", cascade="all, delete-orphan", lazy=True)


class Note(db.Model):
    __tablename__ = 'notes'
    note_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    note_title = db.Column(db.String(200), nullable=False)
    note_content = db.Column(db.Text, nullable=False)
    last_update = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)