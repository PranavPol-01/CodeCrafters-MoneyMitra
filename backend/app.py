from flask import Flask
from routes.auth_routes import auth_routes
from routes.investment_routes import investment_bp

app = Flask(__name__)
app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(investment_bp)

if __name__ == "__main__":
    app.run(debug=True)
