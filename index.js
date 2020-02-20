const Discord = require("discord.js");

const TOKEN = "NjU1NzY5Njk1MzcwMjE1NDI1.XkexNw.2bHaCg5aHLgU-GLraZmGbH6jOoY";
const PREFIX = "?a";


var fortunes = [
  "🟢It is decidedly so.",
  "🟢Without a doubt.",
  "🟢Yes - definitely.",
  "🟢As I see it, yes.",
  "🟢Signs point to yes.",
  "🟡Reply hazy, try again.",
  "🟡Ask again later.",
  "🟡Better not tell you now.",
  "🟡Cannot predict now.",
  "🟡Concentrate and ask again.",
  "🔴Don't count on it.",
  "🔴My reply is no.",
  "🔴My sources say no.",
  "🔴Outlook not so good.",
  "🔴Very doubtful."
];

var bot = new Discord.Client();

var moment = require('moment');


bot.on("ready", function() {
  console.log("Connected as Aot#0350");
  bot.user.setStatus('online')
  bot.user.setActivity("?ahelp")
});

bot.on("guildMemberAdd", function(member) {
  member.addRole(member.guild.roles.find("name", "Members"));

  member.addRole(member.guild.roles.find("name", "Noob Fans"));

  const channel = member.guild.channels.find(channel => channel.name === "↪in-n-out")
  if(!channel) return;

  channel.send(`Welcome to Official Acton's Empire, ${member}! Please subscribe to Acton: https://bit.ly/cleverActon0126_Youtube and READ THE RULES! Thank you!\rBy Acton`)
});

bot.on('error', error => {
	 console.error('The websocket connection encountered an error:', error);
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "ping":
     message.channl.send("Pong!");
    break;
    case "8ball":
    if (args[1])  message.channl.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    else  message.channl.send("Can't read that.");
    break;
    case "noticeme":
    message.reply("Got'cha!");
    break;
    case "hello":
     message.channl.send("Hi. Nice to meet you!");
    break;
    case "aot":
     message.channl.send("Wut's the matter?");
    break;
    case "bye":
     message.channl.send("OK. Cya!")
    break;
    case "salmon":
     message.channl.send("Do you want it `raw` or `cooked`?");
    break;
    case "raw":
     message.channl.send("OK. Here you go. A raw salmon.");
    break;
    case "cooked":
     message.channl.send("OK. Wait for a sec. (Try command `done`)");
    break;
    case "done":
     message.channl.send("Done. Here you go.");
    break;
    case "apple":
     message.channl.send("OK. Here's your golden apple. Here you go.");
    break;
    case "pie":
     message.channl.send("OK. Here's your *pre-baked* pie.");
    break;
    case "candy":
     message.channl.send("OK. Oops, it went out of stock, never come back!");
    break;
    case "mess":
     message.channl.send("sfajdfhewfuinewoiaf");
    break;
    case "messer":
     message.channl.send("afhq930jr3o249ru43984n3qf0jq9032dkj90j3209fj34h98f0wqxm90qj2389d23y58934fnrejwtoiewrjtoeritfioejfeie");
    break;
    case "messest":
     message.channl.send("~&^@*~\(&#\)_~\(fksljdaslkfjewiury3498|fljkdfiuheufk_#\)$*&57*^&~*^#*~\)_+\(HGFUHIhifhsdasfjeiuwahfoejflkfjewijfieoajala<?><:\"ALDOHQO!\"\)KRWH OI@ NOI HJOIRNMJO@*&%()@*$)(%&%*)_@()%@&+)%@(*%@)_OV%)MV%()@%*VM()V%*V@M)(@U*VM)@{PIRW IUNO IRUWIOUR WOP RUW*UOWJ(!uidfsjgiseut93uri34ojgelkgsjveirsut943pkjteirhtewtijoerwltij349utjrepojgkdfhgierjgelkrjg349ut)}gierwut9w4teutioerutweiotrjtioeuteroitu94tu49tu3945834poj543iohtoirejteriojteortjeijteriojterjteritweroitu349u534i2j5i34n5j3n5kl34jute84thierjeroigjerijtlreiutiretjerioutiretureioutioertuerioterutioeruter8oitu438tu");
    break;
    case "ding":
     message.channl.send("DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG!");
    break;
    case "beep":
     message.channl.send("Boop!")
    break;
    case "botinfo":
    var embed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor(0x00bfff)
    .addField("Bot Name", bot.user.username)
    .addField("Bot Created On:", bot.user.createdAt)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channel.send(embed);
    break;
    case "report":
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Could not find user.")
    let reason = args.join().slice(22)

    var embed = new Discord.RichEmbed()
    .setTitle("User reports User")
    .setColor(0xff0000)
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")

    let reportschannel = message.guild.channels.find(`name`, "report-approval");
    if(!reportschannel) return message.channel.send("Could not find report channel.")

    message.delete().catch(()=> {});
    reportschannel.send(embed);
    break;
    case "update":
    var embed = new Discord.RichEmbed()
    .setTitle("Update Successful!")
    .setDescription("Successfully updated to Version 0.11.1!")
    .addField("Prefix", "?a \(Uncustomable\)")
    .addField("Commands", "`help` \(Will lead you to other help commands\), `hello`, `aot`, `bye`, `noticeme`, `support`, `salmon`, `apple`, `pie`, `candy`, `mess`, `messer`, `messest`, `8ball`, `ding`, `ping`, `beep`, `report`, `botinfo`")
    .addField("New Commands", "`N/A`", true)
    .addField("Removed Commands", "`userinfo`", true)
    .addField("Updates", "Updated back to normal")
    .setColor(0x00ff00)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channel.send(embed);
    break;
    case "help":
    var embed = new Discord.RichEmbed()
    .setTitle("❓Help Menu❓")
    .addField("🔣General Menu🔣", "`helpgeneral`", true)
    .addField("❓Info Menu❓", "`helpinfo`", true)
    .addField("🍴Food Menu🍴", "`helpfood`", true)
    .addField("🤬Messing Menu🤬", "`helpmess`", true)
    .addField("😀Fun Menu😀", "`helpfun`", true)
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    case "helpgeneral":
    var embed = new Discord.RichEmbed()
    .setTitle("🔣General Menu🔣", "These are the general commands.")
    .addField("`hello`", "A greeting command", true)
    .addField("`aot`", "Waking Aot up", true)
    .addField("`bye`", "Waving hands to Aot", true)
    .addField("`noticeme`", "Let Aot to notice you", true)
    .addField("`support`", "To report a bug and have some Aot support", true)
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    case "helpfood":
    var embed = new Discord.RichEmbed()
    .setTitle("🍴Food Menu🍴", "These are the foods for you to eat.")
    .addField("`salmon`", "Raw salmon or cooked salmon can be choose", true)
    .addField("`apple`", "NORMAL apple", true)
    .addField("`pie`", "Pie", true)
    .addField("`candy`", "Sweet one", true)
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);

    break;
    case "helpmess":
    var embed = new Discord.RichEmbed()
    .setTitle("🤬Messing Menu🤬", "These are the commands to mess up.")
    .addField("`mess`", "Beginner mess up", true)
    .addField("`messer`", "Advanced mess up", true )
    .addField("`messest`", "??? mess up", true)
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    case "helpfun":
    var embed = new Discord.RichEmbed()
    .setTitle("😀Fun Menu😀", "Available games.")
    .addField("`8ball`", "Seeing your future", true)
    .addField("`ding`", "Ding, Dong", true)
    .addField("`ping`", "Ping, pong", true)
    .addField("`beep`", "Beep, beep, boop, boop", true)
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    case "helpinfo":
    var embed = new Discord.RichEmbed()
    .setTitle("❓Info Menu❓", "Informations")
    .addField("`userinfo(@user)`", "Your account's information or other user's information")
    .setColor(0x00ffff)
    .addField("`botinfo`", "This bot's info").setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    case "support":
    var embed = new Discord.RichEmbed()
    .setTitle("Aot Support")
    .addField("Press the link below to have some Aot support or report a bug!", "https://bit.ly/Aot_Support")
    .setColor(0xff0000)
    .setTimestamp()
    .setFooter("Aot Version 0.11.1, Made by cleverActon0126#3517")
    message.channl.send(embed);
    break;
    default:
     message.channl.send("**Error 404**:Invalid command!");
  }
});

bot.login(TOKEN);
