from flask import Flask
from flask_cors import CORS
from routes.stock_routes import stock_routes
from routes.auth_routes import auth_routes
from routes.investment_routes import investment_bp
from routes.transaction_routes import transaction_routes
from routes.user_routes import user_routes
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(investment_bp)
app.register_blueprint(transaction_routes)
app.register_blueprint(stock_routes)
app.register_blueprint(user_routes)

if __name__ == "__main__":
    app.run(debug=True)
