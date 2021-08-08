const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('../config.json');
const { Client, Intents } = require('discord.js');
const util = require('./util');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

mongoose.connect('mongodb://localhost/', { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to Sitrep bot database.');
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith(config.prefix)) {
        if (!message.guild) {
            message.channel.send('You should probably be in a server to do that.');
            return;
        }
        const actualMessage = message.content.replace(/{|}/g, '').trim().split(' ');
        if (!(actualMessage[0] in util.commands)) {
            message.channel.send('Invalid command.');
            return;
        }
        if (actualMessage[0] === 'setup') {
            util.setup(actualMessage, message);
        }
        else if (actualMessage[0] === 'sitrep') {
            util.sitrep(actualMessage, message);
        }
    }
});

client.login(process.env.BOT_TOKEN);