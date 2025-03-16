from flask import request, jsonify
from config.firebase import db
from models.budget import BudgetModel  # Import BudgetModel


class BudgetController:
    def create_budget(self, user_id):
        try:
            budget_data = request.get_json()
            budget_model = BudgetModel(budget_data)
            budget_dict = budget_model.to_dict()

            budget_ref = db.collection('users').document(user_id)
            budget_ref.set({'budget': budget_dict}, merge=True)  # <--- MERGE

            return jsonify({"message": "Budget created successfully"}), 201

        except Exception as e:
            print(f"Error creating budget: {e}")
            return jsonify({"error": str(e)}), 500

    def get_budget(self, user_id):
        try:
            budget_ref = db.collection('users').document(user_id)
            doc = budget_ref.get()

            if not doc.exists:
                return jsonify({"message": "Budget not found"}), 404

            doc_dict = doc.to_dict()

            if doc_dict and 'budget' in doc_dict:
              budget_data = doc_dict['budget']
              return jsonify(budget_data), 200
            else:
              return jsonify({"message": "Budget data not found in document"}), 404

        except Exception as e:
            print(f"Error getting budget: {e}")
            return jsonify({"error": str(e)}), 500

    def update_budget(self, user_id):
        try:
            budget_data = request.get_json()
            budget_model = BudgetModel(budget_data)
            budget_dict = budget_model.to_dict()

            budget_ref = db.collection('users').document(user_id)
            budget_ref.update({'budget': budget_dict}) # Update now is merge by default

            return jsonify({"message": "Budget updated successfully"}), 200

        except Exception as e:
            print(f"Error updating budget: {e}")
            return jsonify({"error": str(e)}), 500
