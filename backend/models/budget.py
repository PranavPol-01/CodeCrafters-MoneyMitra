class BudgetModel:  # BudgetModel class definition
    def __init__(self, data):
        self.income = data.get('income', 0)
        
        self.stocks = data.get('stocks', 0)
        self.bonds = data.get('bonds', 0)
        self.mutualFunds = data.get('mutualFunds', 0)
        self.realEstate = data.get('realEstate', 0)
        self.crypto = data.get('crypto', 0)
        self.fixedDeposits = data.get('fixedDeposits', 0)
        self.gold = data.get('gold', 0)
        self.emi = data.get('emi', 0)
        self.savings = data.get('savings', 0)

    def to_dict(self):
        return {
            'income': self.income,
            
            'stocks': self.stocks,
            'bonds': self.bonds,
            'mutualFunds': self.mutualFunds,
            'realEstate': self.realEstate,
            'crypto': self.crypto,
            'fixedDeposits': self.fixedDeposits,
            'gold': self.gold,
            'emi': self.emi,
            'savings': self.savings
        }
