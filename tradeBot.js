const { scrapeLatestBuyTrades } = require('./scraper');
const AlpacaAPI = require('./AlpacaAPI');

class TradeBot {
    constructor() {
        this.scraper = scrapeLatestBuyTrades;
        this.alpacaAPI = new AlpacaAPI();
        console.log("TradeBot constructor initialized.");
    }

    async run() {
        console.log("Running TradeBot...");

        try {

            // Scrape the latest valid BUY trade from the last 30 days
            const tradeInfo = await this.scraper();

            // Check if scraper is returning data
            console.log("Scraper result:", tradeInfo); 
            
            if (tradeInfo === null) {
                console.log("Nothing to buy.");
                return;
            }

            console.log(`Processing trade for: ${tradeInfo.getStockSymbol()}`);

            const optionPrice = tradeInfo.getOptionPrice();
            console.log(`Option price for ${tradeInfo.getStockSymbol()}: ${optionPrice}`);

            if (optionPrice >= 50 && optionPrice <= 1000) {
                console.log(`Placing a market order for ${tradeInfo.getStockSymbol()} at ${optionPrice}`);
                await this.alpacaAPI.placeMarketOrder(tradeInfo.getStockSymbol(), tradeInfo.getQuantity());
            } else if (optionPrice > 1000) {
                console.log("Price too high, adjust strike price logic as needed.");
            }
        } catch (error) {
            // Catch any errors
            console.error("An error occurred during the bot execution:", error); 
        }
    }
}

const bot = new TradeBot();
bot.run();

