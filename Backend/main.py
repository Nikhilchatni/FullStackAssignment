from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import urllib.parse
import os
from model import db
from api.signup import signup_bp
from api.login import login_bp
from api.notes import notes_bp
from flask_jwt_extended import JWTManager

# Point Flask static files to React build folder
app = Flask(__name__, static_folder="build", static_url_path="/") #comment this line if you are running the react project on localhost

# Database configuration
password = urllib.parse.quote_plus("P@ssw0rd")
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{password}@localhost/assignment"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "supersecretkey"

db.init_app(app)
jwt = JWTManager(app)

# Register API blueprints 
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(notes_bp)

# Serve React frontend , comment these snippet if you are running the react project on localhost
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    build_dir = app.static_folder
    if path != "" and os.path.exists(os.path.join(build_dir, path)):
        return send_from_directory(build_dir, path)
    else:
        return send_from_directory(build_dir, "index.html")

# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
