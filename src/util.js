const commands = require('./commands');
const { MessageEmbed } = require('discord.js');

function setup(messageArr, message) {
    commands.setup(
        message.guild.id,
        `${message.author.username}#${message.author.discriminator}`,
        message.author.id,
        messageArr,
    ).then((result) => {
        message.channel.send(result);
    }).catch((err)=>{
        console.log(err);
        message.channel.send('Error processing command.');
    });
}

function sitrep(messageArr, message) {
    let authorSearch;
    try {
        authorSearch = messageArr[1].replace('@', '');
    }
    catch (err) {
        authorSearch = '';
    }
    commands.sitrep(
        message.guild.id,
        authorSearch,
    ).then((results)=> {
        const events = [];
        results.forEach((result) => {
            const event = {};
            event.name = result.name;
            const ownerName = result.ownerName;
            const startDate = result.start;
            const endDate = result.end;
            let line = `${ownerName.padEnd(35, ' ')} | `;
            const start = `${startDate.getMonth()}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`;
            const end = `${endDate.getMonth()}/${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`;
            line += `${start} - ${end}`;
            event.value = line;
            events.push(event);
        });
        if(events.length > 0) {
            const eventEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Sitrep of ${message.guild.name}`)
                .addFields(events);
            console.log(eventEmbed);
            message.channel.send({ embed: eventEmbed });
        }
        else {
            message.channel.send('No one\'s doing anything . . . ');
        }
    }).catch((err) => {
        console.log(err);
        message.channel.send('Error processing command.');
    });
}

function help(message) {
    const commandsHelp = require('./help.json');
    const eventEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Sitrep Help')
        .addFields(commandsHelp);
    message.channel.send({ embed: eventEmbed });
}

module.exports = {
    setup: setup,
    sitrep: sitrep,
    help: help,
    commands: commands,
};