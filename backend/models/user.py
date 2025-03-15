import bcrypt
import uuid
from config.firebase import db

class User:
    def __init__(self, uid, email, username):
        self.uid = uid
        self.email = email
        self.username = username

    @staticmethod
    def hash_password(password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')

    @staticmethod
    def check_password(password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

    @staticmethod
    def create_user(email, password, username):
        try:
            user_ref = db.collection("users").where("email", "==", email).stream()
            if any(user_ref):
                return {"error": "User already exists"}, 400

            uid = str(uuid.uuid4())

            hashed_password = User.hash_password(password)

            user_data = {
                "uid": uid,
                "email": email,
                "username": username,
                "password": hashed_password,  
            }
            db.collection("users").document(uid).set(user_data)

            return {"message": "User registered successfully!", "uid": uid}, 201
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def authenticate_user(email, password):
        try:
            user_ref = db.collection("users").where("email", "==", email).stream()
            user_doc = next(user_ref, None)

            if user_doc:
                user_data = user_doc.to_dict()
                stored_password = user_data.get("password", "")

                if User.check_password(password, stored_password):
                    return {"message": "Login successful", "user": user_data}, 200
                else:
                    return {"error": "Invalid email or password"}, 401

            return {"error": "User not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 400
