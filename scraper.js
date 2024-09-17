const axios = require('axios');
const cheerio = require('cheerio');
const TradeInfo = require('./TradeInfo');

async function scrapeLatestBuyTrades() {
    const url = 'https://www.quiverquant.com/congresstrading/politician/Nancy%20Pelosi-P000197';

    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        console.log("Page fetched successfully. Data length:", data.length);

        const $ = cheerio.load(data);
        const rows = $('table tbody tr');

        const currentDate = new Date();
        for (let i = 0; i < rows.length; i++) {
            const tradeRow = $(rows[i]);
            const tradeType = tradeRow.find('td').eq(3).text().trim();
            const transactionDate = tradeRow.find('td').eq(4).text().trim();
            const tradeDate = new Date(transactionDate);

            const diffDays = Math.floor((currentDate - tradeDate) / (1000 * 60 * 60 * 24));
            console.log(`Row ${i}: Type: ${tradeType}, Date: ${transactionDate}, Days ago: ${diffDays}`);  // Log each row

            if (tradeType === 'BUY' && diffDays <= 30) {
                console.log("Found a valid BUY order.");
                const stockSymbol = tradeRow.find('td').eq(1).text().trim();
                const optionPrice = parsePrice(tradeRow.find('td').eq(5).text());
                const quantity = parseInt(tradeRow.find('td').eq(6).text());
                return new TradeInfo(stockSymbol, tradeType, optionPrice, quantity, transactionDate);
            }
        }

        console.log("No valid BUY orders found in the last 30 days.");
        return null;

    } catch (err) {
        console.error('Error scraping data:', err);
        return null;
    }
}

function parsePrice(priceText) {
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}

module.exports = { scrapeLatestBuyTrades };
