from flask import request, jsonify
from models.transaction import Transaction

def add_transaction(user_id):
    data = request.json

    # Validate required fields
    if not all(k in data for k in ("amount", "type", "description", "date", "time")):
        return jsonify({"error": "Missing fields"}), 400

    # Include user_id in the transaction data
    data["user_id"] = user_id  

    response = Transaction.add_transaction(user_id, data)
    return jsonify(response), 201

def get_transactions(user_id):
    """
    Get all transactions for a specific user.
    """
    transactions = Transaction.get_all_transactions(user_id)
    return jsonify(transactions)

def get_transaction(user_id, transaction_id):
    """
    Get a specific transaction for a user.
    """
    transaction = Transaction.get_transaction_by_id(user_id, transaction_id)
    if transaction:
        return jsonify(transaction)
    return jsonify({"error": "Transaction not found"}), 404

def update_transaction(user_id, transaction_id):
    """
    Update a specific transaction for a user.
    """
    data = request.json
    response = Transaction.update_transaction(user_id, transaction_id, data)
    if response:
        return jsonify(response)
    return jsonify({"error": "Transaction not found"}), 404

def delete_transaction(user_id, transaction_id):
    """
    Delete a specific transaction for a user.
    """
    response = Transaction.delete_transaction(user_id, transaction_id)
    if response:
        return jsonify(response)
    return jsonify({"error": "Transaction not found"}), 404
