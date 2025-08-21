# FullStackAssignment

A full-stack **Notes Management Application** built with:  
- **Backend**: Python(Flask),MySQl
- **Frontend**: React.js

## Features
- User authentication (Signup & Login)  
- Create, Read, Update, and Delete (CRUD) notes  
- Responsive React UI (Login, Signup, Notes Dashboard)  
- JWT-based session handling  
- MySQL database for persistence  

## Project Structure
FullStackAssignment/
│── backend/ # Flask backend (Python, MySQL, JWT)
│── frontend/ # React frontend (React.js)
│── outputscreenshots(which contains the screenshots of the output) 

**Backend Setup(Python)**
1. Navigate to backend folder:
2. Install dependencies:
pip install flask
pip install flask-sqlalchemy
pip install flask-jwt-extended
pip install pymysql   # MySQL driver

Set up MySQL database:
Create a database named assignment
Update DB username & password in main.py if needed

Run backend:
python main.py
Backend runs on http://127.0.0.1:5000

**Frontend Setup (React)**
1. Navigate to frontend folder:
2. Install dependencies: npm install
3. Start React dev server:
npm start
Frontend runs on http://localhost:3000

**Output Details**
These present in the output screenshots
Login page -> outputscreenshots/Loginscreen.png
SignUp page -> outputscreenshots/Signupscreen.png
HomeScreen -> outputscreenshots/homescreen.png
Addingnote & after adding notes -> outputscreenshots/Addingnote.png & outputscreenshots/afteraddingnote.png
Editingnote & after editingnotes -> outputscreenshots/editing.png & outputscreenshots/aftereditingnote.png
Deletingnote -> outputscreenshots/Deletingnote.png

Note: There 2 ways to setup either you can install the python dependenices and run the main file then from the backend url itself you can see the frontend , or there is an another option setup the frontend and comment the lines which i mentioned in main.py file so that react and python runs on the different localhosts
