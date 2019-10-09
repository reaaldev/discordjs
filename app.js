// RECOMMENED DON'T CHANGE THINGS IN HERE UNLESS NECESSARY

const Discord = require("discord.js"); // loads discord.js libary
const config = require("./config.json");

const bot = new Discord.Client({ disableEveryone: true }); // defines bot.
bot.commands = new Discord.Collection(); // defines bot commands.

fs.readdir("./commands/", (err, files) => { // reads all commands.
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Could not find command");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
})

bot.on("message", async message => {  // loads commands.
    let prefix = config.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    if (cmd.slice(0, prefix.length) !== prefix) return;
    let args = msgArray.slice(1);
    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    if (cmdFile) cmdFile.run(bot, message, args)
});


bot.login(config.token); // place your bot token in here.

