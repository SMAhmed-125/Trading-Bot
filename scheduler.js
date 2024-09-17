const schedule = require('node-schedule');

// Scheduling the bot to run once per day at midnight
schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Running scheduled TradeBot...');
    const bot = new TradeBot();
    await bot.run();
    console.log('TradeBot ran successfully.');
});
