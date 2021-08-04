const dotenv = require('dotenv');

dotenv.config();
console.log(`https://discord.com/oauth2/authorize?client_id=${process.env.APP_ID}&scope=bot+applications.commands`);