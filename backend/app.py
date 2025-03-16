from flask import Flask, jsonify
from flask_cors import CORS
from routes.stock_routes import stock_routes
from routes.auth_routes import auth_routes
from routes.investment_routes import investment_bp
from routes.transaction_routes import transaction_routes
from routes.user_routes import user_routes
from routes.saving_routes import savings_bp
from routes.budget_routes import budget_bp

from config.firebase import db

import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Hello, this is moneymitra api!"

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(investment_bp)
app.register_blueprint(transaction_routes)
app.register_blueprint(stock_routes)
app.register_blueprint(user_routes)
app.register_blueprint(budget_bp)
app.register_blueprint(savings_bp)

    
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Render provides PORT env variable
    app.run(host='0.0.0.0', port=port)