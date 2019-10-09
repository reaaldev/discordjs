const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.channel.send("this is a example of a command")
}


module.exports.help = {
    name: 'test'
}
