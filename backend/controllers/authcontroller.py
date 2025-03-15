from models.user import User

def register_user(email, password, username):
    return User.create_user(email, password, username)

def login_user(email, password):
    return User.authenticate_user(email, password)
