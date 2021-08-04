const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith('{setup ')) {
        console.log('Do setup stuff');
    }
	console.log(message.content);
});

client.login(process.env.BOT_TOKEN);