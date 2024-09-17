class TradeInfo {
    constructor(stockSymbol, tradeType, optionPrice, quantity, transactionDate) {
        this.stockSymbol = stockSymbol;
        this.tradeType = tradeType;
        this.optionPrice = optionPrice;
        this.quantity = quantity;
        this.transactionDate = transactionDate;
    }

    getStockSymbol() {
        return this.stockSymbol;
    }

    getTradeType() {
        return this.tradeType;
    }

    getOptionPrice() {
        return this.optionPrice;
    }

    getQuantity() {
        return this.quantity;
    }

    getTransactionDate() {
        return this.transactionDate;
    }
}

module.exports = TradeInfo;
