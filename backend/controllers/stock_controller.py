from flask import jsonify
from models.stocks import StockData
from utils.csv_utils import read_csv, is_file_up_to_date
import os
import pandas as pd

class StockController:
    @staticmethod
    def get_available_tickers():
        """Get a list of available ticker symbols from the static CSV file."""
        try:
            df = read_csv("static/TickerList.csv")
            tickers = df["SYMBOL"].tolist()
            return jsonify({"tickers": tickers}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def fetch_historical_data(ticker):
        """Fetch historical data for a given ticker symbol."""
        try:
            file_path = f"generated_csv/{ticker}_historical.csv"
            if os.path.exists(file_path) and is_file_up_to_date(file_path):
                # Serve the existing CSV file
                df = pd.read_csv(file_path)
                return jsonify(df.to_dict(orient="records")), 200
            else:
                # Fetch new data and save to CSV
                stock = StockData(ticker)
                response = stock.get_historical_data()
                if "error" in response:
                    return jsonify(response), 404
                return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def fetch_stock_info(ticker):
        """Fetch general stock information."""
        stock = StockData(ticker)
        response = stock.get_stock_info()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_dividends(ticker):
        """Fetch dividend history."""
        stock = StockData(ticker)
        response = stock.get_dividends()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_splits(ticker):
        """Fetch stock split history."""
        stock = StockData(ticker)
        response = stock.get_splits()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_earnings_dates(ticker):
        """Fetch earnings dates."""
        stock = StockData(ticker)
        response = stock.get_earnings_dates()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_analyst_recommendations(ticker):
        """Fetch analyst recommendations."""
        stock = StockData(ticker)
        response = stock.get_analyst_recommendations()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_institutional_holders(ticker):
        """Fetch institutional holders."""
        stock = StockData(ticker)
        response = stock.get_institutional_holders()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_sustainability(ticker):
        """Fetch sustainability data."""
        stock = StockData(ticker)
        response = stock.get_sustainability()
        return jsonify(response), (200 if "error" not in response else 500)