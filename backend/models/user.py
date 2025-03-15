import bcrypt
import uuid
from config.firebase import db
from datetime import datetime
import yfinance as yf
class User:
    def __init__(self, uid, email, username, funds=10000.0, holdings=None, transactions=None):
        self.uid = uid
        self.email = email
        self.username = username
        self.funds = funds
        self.holdings = holdings if holdings else {}
        self.transactions = transactions if transactions else []

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
            # Validate inputs
            if not email or not isinstance(email, str):
                return {"error": "Email is required and must be a string"}, 400
            if not password or not isinstance(password, str):
                return {"error": "Password is required and must be a string"}, 400
            if not username or not isinstance(username, str):
                return {"error": "Username is required and must be a string"}, 400

            # Check if user already exists
            user_ref = db.collection("users").where("email", "==", email).stream()
            if any(user_ref):
                return {"error": "User already exists"}, 400

            # Create new user
            uid = str(uuid.uuid4())
            hashed_password = User.hash_password(password)

            user_data = {
                "uid": uid,
                "email": email,
                "username": username,
                "password": hashed_password,
                "funds": 10000.0,
                "holdings": {},
                "transactions": []
            }
            db.collection("users").document(uid).set(user_data)

            return {"message": "User registered successfully!", "uid": uid}, 201
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def authenticate_user(email, password):
        try:
            # Validate inputs
            if not email or not isinstance(email, str):
                return {"error": "Email is required and must be a string"}, 400
            if not password or not isinstance(password, str):
                return {"error": "Password is required and must be a string"}, 400

            # Fetch user data
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

    @staticmethod
    def get_funds(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid).get()
            if user_ref.exists:
                user_data = user_ref.to_dict()
                return {"funds": float(user_data.get("funds", 0.0))}, 200
            return {"error": "User not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def add_funds(uid, amount):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not amount or not isinstance(amount, (str, int, float)):
                return {"error": "Amount is required and must be a number"}, 400

            # Convert amount to float
            amount = float(amount)

            # Validate that amount is positive
            if amount <= 0:
                return {"error": "Amount must be a positive number"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid)
            user_data = user_ref.get().to_dict()

            # Ensure current_funds is a float
            current_funds = float(user_data.get("funds", 0.0))

            # Calculate new funds
            new_funds = current_funds + amount

            # Update user's funds
            user_ref.update({"funds": new_funds})

            return {"message": "Funds added successfully!", "new_funds": new_funds}, 200
        except ValueError as e:
            return {"error": f"Invalid amount: {amount}"}, 400
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def buy_stock(uid, stock_symbol, quantity, price_per_share):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not stock_symbol or not isinstance(stock_symbol, str):
                return {"error": "Stock symbol is required and must be a string"}, 400
            if not quantity or not isinstance(quantity, (str, int, float)):
                return {"error": "Quantity is required and must be a number"}, 400
            if not price_per_share or not isinstance(price_per_share, (str, int, float)):
                return {"error": "Price per share is required and must be a number"}, 400

            # Convert quantity and price_per_share to float
            quantity = float(quantity)
            price_per_share = float(price_per_share)

            # Validate that quantity and price_per_share are positive
            if quantity <= 0 or price_per_share <= 0:
                return {"error": "Quantity and price per share must be positive numbers"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid)
            user_data = user_ref.get().to_dict()

            # Calculate total cost
            total_cost = quantity * price_per_share

            # Check if user has sufficient funds
            if user_data.get("funds", 0.0) < total_cost:
                return {"error": "Insufficient funds"}, 400

            # Update holdings
            holdings = user_data.get("holdings", {})
            if stock_symbol in holdings:
                holdings[stock_symbol] += quantity
            else:
                holdings[stock_symbol] = quantity

            # Update funds and transactions
            new_funds = user_data.get("funds", 0.0) - total_cost
            transaction = {
                "type": "buy",
                "stock_symbol": stock_symbol,
                "quantity": quantity,
                "price_per_share": price_per_share,
                "total_cost": total_cost,
                "timestamp": datetime.now().isoformat()
            }

            user_ref.update({
                "funds": new_funds,
                "holdings": holdings,
                "transactions": user_data.get("transactions", []) + [transaction]
            })

            return {"message": "Stock purchased successfully!", "new_funds": new_funds}, 200
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def sell_stock(uid, stock_symbol, quantity, price_per_share):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not stock_symbol or not isinstance(stock_symbol, str):
                return {"error": "Stock symbol is required and must be a string"}, 400
            if not quantity or not isinstance(quantity, (str, int, float)):
                return {"error": "Quantity is required and must be a number"}, 400
            if not price_per_share or not isinstance(price_per_share, (str, int, float)):
                return {"error": "Price per share is required and must be a number"}, 400

            # Convert quantity and price_per_share to float
            quantity = float(quantity)
            price_per_share = float(price_per_share)

            # Validate that quantity and price_per_share are positive
            if quantity <= 0 or price_per_share <= 0:
                return {"error": "Quantity and price per share must be positive numbers"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid)
            user_data = user_ref.get().to_dict()
            holdings = user_data.get("holdings", {})

            # Check if user has enough shares to sell
            if stock_symbol not in holdings or holdings[stock_symbol] < quantity:
                return {"error": "Not enough shares to sell"}, 400

            # Calculate total earnings
            total_earnings = quantity * price_per_share

            # Update holdings
            holdings[stock_symbol] -= quantity
            if holdings[stock_symbol] == 0:
                del holdings[stock_symbol]

            # Update funds and transactions
            new_funds = user_data.get("funds", 0.0) + total_earnings
            transaction = {
                "type": "sell",
                "stock_symbol": stock_symbol,
                "quantity": quantity,
                "price_per_share": price_per_share,
                "total_earnings": total_earnings,
                "timestamp": datetime.now().isoformat()
            }

            user_ref.update({
                "funds": new_funds,
                "holdings": holdings,
                "transactions": user_data.get("transactions", []) + [transaction]
            })

            return {"message": "Stock sold successfully!", "new_funds": new_funds}, 200
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def get_holdings(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid).get()
            if user_ref.exists:
                user_data = user_ref.to_dict()
                return {"holdings": user_data.get("holdings", {})}, 200
            return {"error": "User not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def get_transactions(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data
            user_ref = db.collection("users").document(uid).get()
            if user_ref.exists:
                user_data = user_ref.to_dict()
                return {"transactions": user_data.get("transactions", [])}, 200
            return {"error": "User not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 400
   