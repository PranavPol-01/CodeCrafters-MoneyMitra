import yfinance as yf
import pandas as pd
import os

# Define folder to save CSV files
CSV_FOLDER = "generated_csv"
os.makedirs(CSV_FOLDER, exist_ok=True)  # Ensure the folder exists

class StockData:
    def __init__(self, ticker_symbol):
        """Initialize StockData with a properly formatted ticker."""
        self.ticker_symbol = self.format_ticker(ticker_symbol)
        self.ticker = yf.Ticker(self.ticker_symbol)

    def format_ticker(self, ticker):
        """Ensure ticker is uppercase and ends with .NS if missing."""
        ticker = ticker.upper()
        return ticker if ticker.endswith(".NS") else f"{ticker}.NS"

    def save_to_csv(self, data, filename, columns=None):
        """Save data to CSV if valid, return file path or error."""
        if "error" in data or not data:
            return {"error": "No valid data available"}

        df = pd.DataFrame.from_dict(data) if isinstance(data, dict) else pd.DataFrame(data, columns=columns)
        file_path = os.path.join(CSV_FOLDER, filename)
        df.to_csv(file_path, index=False)

        return {"message": "CSV file generated successfully", "file_path": file_path}

    def get_historical_data(self, start="2020-01-01", end="2023-10-01"):
        """Fetch and return historical stock data."""
        try:
            data = yf.download(self.ticker_symbol, start=start, end=end).to_dict()
            return self.save_to_csv(data, f"{self.ticker_symbol}_historical.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_stock_info(self):
        """Fetch general stock information and save as CSV."""
        try:
            data = self.ticker.info
            return self.save_to_csv(data, f"{self.ticker_symbol}_info.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_dividends(self):
        """Fetch dividend history and save it as CSV."""
        try:
            data = self.ticker.dividends.to_frame().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_dividends.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_splits(self):
        """Fetch stock split history and save it as CSV."""
        try:
            data = self.ticker.splits.to_frame().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_splits.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_earnings_dates(self):
        """Fetch past and future earnings dates and save as CSV."""
        try:
            data = self.ticker.get_earnings_dates().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_earnings.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_analyst_recommendations(self):
        """Fetch analyst recommendations and save as CSV."""
        try:
            data = self.ticker.recommendations  # Corrected attribute reference

            if data is None or data.empty:  # Check if data exists
                return {"error": "No analyst recommendation data available"}

            return self.save_to_csv(data, f"{self.ticker_symbol}_analyst_recommendations.csv")

        except Exception as e:
            return {"error": str(e)}


    def get_institutional_holders(self):
        """Fetch institutional holders and save as CSV."""
        try:
            data = self.ticker.institutional_holders.reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_institutional.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_sustainability(self):
        """Fetch sustainability data and save as CSV."""
        try:
            data = self.ticker.sustainability.reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_sustainability.csv")
        except Exception as e:
            return {"error": str(e)}