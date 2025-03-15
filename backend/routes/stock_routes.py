from flask import Blueprint, request
from controllers.stock_controller import StockController

stock_routes = Blueprint("stock_routes", __name__)

@stock_routes.route("/stock/historical/<ticker>", methods=["GET"])
def get_historical_data(ticker):
    start = request.args.get("start", "2020-01-01")
    end = request.args.get("end", "2023-10-01")
    return StockController.fetch_historical_data(ticker, start, end)

@stock_routes.route("/stock/info/<ticker>", methods=["GET"])
def get_stock_info(ticker):
    return StockController.fetch_stock_info(ticker)

@stock_routes.route("/stock/dividends/<ticker>", methods=["GET"])
def get_dividends(ticker):
    return StockController.fetch_dividends(ticker)

@stock_routes.route("/stock/splits/<ticker>", methods=["GET"])
def get_splits(ticker):
    return StockController.fetch_splits(ticker)

@stock_routes.route("/stock/earnings/<ticker>", methods=["GET"])
def get_earnings_dates(ticker):
    return StockController.fetch_earnings_dates(ticker)

@stock_routes.route("/stock/analyst/<ticker>", methods=["GET"])
def get_analyst_recommendations(ticker):
    return StockController.fetch_analyst_recommendations(ticker)

@stock_routes.route("/stock/institutional/<ticker>", methods=["GET"])
def get_institutional_holders(ticker):
    return StockController.fetch_institutional_holders(ticker)

@stock_routes.route("/stock/sustainability/<ticker>", methods=["GET"])
def get_sustainability(ticker):
    return StockController.fetch_sustainability(ticker)
