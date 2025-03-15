from flask import Blueprint, request
from controllers.authcontroller import register_user, login_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    return register_user(data['email'], data['password'], data['username'])

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    return login_user(data['email'], data['password'])
