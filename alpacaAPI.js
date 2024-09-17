const Alpaca = require('@alpacahq/alpaca-trade-api');

class AlpacaAPI {
    constructor() {
        // My alpaca keys
        this.alpaca = new Alpaca({
            keyId: 'PKEHD3GWX959W6P7BQGA',
            secretKey: 'U8F0SG77NLowsMpeqh7IwwQvMCDUt3FOIDbIJPpY',
            paper: true 
        });
    }

    // Place a market buy order
    async placeMarketOrder(symbol, qty) {
        try {
            console.log(`Placing order for ${symbol}, Quantity: ${qty}`);
            const order = await this.alpaca.createOrder({
                symbol: symbol,
                qty: qty,
                side: 'buy',
                type: 'market',
                time_in_force: 'gtc'
            });
            console.log(`Order placed successfully for ${symbol}`);
            console.log(order);
        } catch (err) {
            console.error('Error placing order:', err);
        }
    }
    
}

module.exports = AlpacaAPI;
