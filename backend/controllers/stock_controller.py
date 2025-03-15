from flask import jsonify
from models.stocks import StockData

class StockController:
    @staticmethod
    def fetch_historical_data(ticker, start="2020-01-01", end="2023-10-01"):
        stock = StockData(ticker)
        response = stock.get_historical_data(start, end)
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_stock_info(ticker):
        stock = StockData(ticker)
        response = stock.get_stock_info()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_dividends(ticker):
        stock = StockData(ticker)
        response = stock.get_dividends()
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_splits(ticker):
        stock = StockData(ticker)
        response = stock.get_splits()
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_earnings_dates(ticker):
        stock = StockData(ticker)
        response = stock.get_earnings_dates()
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_analyst_recommendations(ticker):
        stock = StockData(ticker)
        response = stock.get_analyst_recommendations()
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_institutional_holders(ticker):
        stock = StockData(ticker)
        response = stock.get_institutional_holders()
        return jsonify(response), (200 if "file_path" in response else 404)

    @staticmethod
    def fetch_sustainability(ticker):
        stock = StockData(ticker)
        response = stock.get_sustainability()
        return jsonify(response), (200 if "file_path" in response else 404)
