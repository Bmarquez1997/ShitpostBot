var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var copyPastas = ['gayCat.txt', 'mood.txt', 'steveHarvey.txt', 'stuartLittle.txt', 'navySeal.txt'];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: fs.readFileSync('./helpScript.txt', 'utf-8')
                });
            break;
            case 'shitpost':
                bot.sendMessage({
                    to: channelID,
                    message: 'no u'
                });
            break;
            case 'copypasta':
                luckyNumber = Math.floor(Math.random() * 5);
                bot.sendMessage({
                    to: channelID,
                    message: fs.readFileSync('./copypastas/' + copyPastas[luckyNumber], 'utf-8')
                });
            break;
            case 'meme':
                bot.sendMessage({
                    to: channelID,
                    message: 'still working on it m8, check back later'
                });
            break;
         }
     }
});