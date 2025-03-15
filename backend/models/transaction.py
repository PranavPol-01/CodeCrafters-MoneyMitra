import firebase_admin
from firebase_admin import credentials, firestore
from config.firebase import db



class Transaction:
    COLLECTION_NAME = "transactions"

    @staticmethod
    def add_transaction(user_id, data):
        # Reference to user's transactions
        user_transactions_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions")

        # Add transaction
        transaction_ref = user_transactions_ref.add(data)
        return {"message": "Transaction added", "transaction_id": transaction_ref[1].id}

    @staticmethod
    def get_all_transactions(user_id):
        transactions = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").stream()
        return [{"id": t.id, **t.to_dict()} for t in transactions]
    
    @staticmethod
    def get_transaction_by_id(user_id, transaction_id):
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id).get()
        if transaction_ref.exists:
            return transaction_ref.to_dict()
        return None

    @staticmethod
    def update_transaction(user_id, transaction_id, data):
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id)
        if transaction_ref.get().exists:
            transaction_ref.update(data)
            return {"message": "Transaction updated"}
        return None

    @staticmethod
    def delete_transaction(user_id, transaction_id):
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id)
        if transaction_ref.get().exists:
            transaction_ref.delete()
            return {"message": "Transaction deleted"}
        return None
