const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('../config.json');
const { Client, Intents } = require('discord.js');
const activities = require('./commands');

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
        if (!(actualMessage[0] in activities)) {
            message.channel.send('Invalid command.');
            return;
        }
        if (actualMessage[0] === 'setup') {
            activities.setup(
                message.guild.id,
                `${message.author.username}#${message.author.discriminator}`,
                message.author.id,
                actualMessage,
            ).then((result) => {
                message.channel.send(result);
            }).catch((err)=>{
                console.log(err);
                message.channel.send('Error processing command.');
            });
        }
        else if (actualMessage[0] === 'sitrep') {
            let authorSearch;
            try {
                authorSearch = actualMessage[1].replace('@', '');
            }
            catch (err) {
                authorSearch = '';
            }
            activities.sitrep(
                message.guild.id,
                authorSearch,
            ).then((results)=> {
                const activityList = [];
                results.forEach((result) => {
                    console.log(result);
                    const title = result.name;
                    const ownerName = result.ownerName;
                    const startDate = result.start;
                    const endDate = result.end;
                    let line = `**${title}** ${ownerName} `;
                    const start = `${startDate.getMonth()}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`;
                    const end = `${endDate.getMonth()}/${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`;
                    line += `${start} - ${end}`;
                    activityList.push(line);
                });
                message.channel.send(activityList.join('\n'));
            }).catch((err) => {
                console.log(err);
                message.channel.send('Error processing command.');
            });
        }
    }
});

client.login(process.env.BOT_TOKEN);