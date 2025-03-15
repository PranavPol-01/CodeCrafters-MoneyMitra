from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_routes
from routes.investment_routes import investment_bp
from routes.transaction_routes import transaction_routes

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(investment_bp)
app.register_blueprint(transaction_routes)

if __name__ == "__main__":
    app.run(debug=True)
