const dotenv = require('dotenv');
const config = require('../config.json');
const { Client, Intents } = require('discord.js');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith(config.prefix)) {
        console.log('Do setup stuff');
        message.channel.send('Yeet');
    }
	console.log(message.content);
});

client.login(process.env.BOT_TOKEN);