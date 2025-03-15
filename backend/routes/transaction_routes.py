from flask import Blueprint
from controllers.transaction_controller import (
    add_transaction,
    get_transactions,
    get_transaction,
    update_transaction,
    delete_transaction
)

transaction_routes = Blueprint("transaction_routes", __name__)

transaction_routes.route("/transactions/<user_id>", methods=["POST"])(add_transaction)
transaction_routes.route("/transactions/<user_id>", methods=["GET"])(get_transactions)
transaction_routes.route("/transactions/<user_id>/<transaction_id>", methods=["GET"])(get_transaction)
transaction_routes.route("/transactions/<user_id>/<transaction_id>", methods=["PUT"])(update_transaction)
transaction_routes.route("/transactions/<user_id>/<transaction_id>", methods=["DELETE"])(delete_transaction)
