const Discord = require("discord.js");
const ms = require("ms");

const TOKEN = "NjU1NzY5Njk1MzcwMjE1NDI1.XltsKw.9iHz5WJsqo2awd6NrfnBiAS7s3g";
const PREFIX = "?a";

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Connected as Aot#0350");
  bot.user.setStatus('dnd')
  bot.user.setActivity("?ahelp")
});

bot.on("guildMemberAdd", function(member) {
  member.roles.add(member.guild.roles.cache.find(role => role.name === "Members"));

  member.roles.add(member.guild.roles.cache.find(role => role.name === "Noob Fans"));

  const inChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!inChannel) return;

  inChannel.send(`Welcome to Official Acton's Empire, <@${member.id}>! Please READ THE RULES! Thank you!`)
});

bot.on("guildMemberRemove", function(member) {
  const outChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!outChannel) return;

  outChannel.send(`<@${member.id}> just left, but we will never forget him/her!`)
});

bot.on("message", async function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    //general commands
    case "ping":
     message.channel.send("🏓Pinging").then(m => {
      var ping = m.createdTimestamp - message.createdTimestamp;
      var botping = bot.ws.ping;

      m.edit(`🏓Bot ping is ${ping}ms\r API Latency is ${botping}ms`)
     });
    break;
    case "noticeme":
     message.reply("Got'cha!");
    break;
    case "hello":
     message.channel.send("Hi. Nice to meet you!");
    break;
    case "aot":
     message.channel.send("Wut's the matter?");
    break;
    case "bye":
     message.channel.send("OK. Cya!")
    break;
    //end of general commands
    //food Commands
    case "salmon":
     message.channel.send("Do you want it `raw` or `cooked`?");
    break;
    case "raw":
     message.channel.send("OK. Here you go. A raw salmon.");
    break;
    case "cooked":
     message.channel.send("OK. Wait for a sec. (Try command `done`)");
    break;
    case "done":
     message.channel.send("Done. Here you go.");
    break;
    case "apple":
     message.channel.send("OK. Here's your golden apple. Here you go.");
    break;
    case "pie":
     message.channel.send("OK. Here's your *pre-baked* pie.");
    break;
    case "candy":
     message.channel.send("OK. Oops, it went out of stock, never come back!");
    break;
    //end of food Commands
    //fun commands
    case "door":
     dUser = message.author;

     message.channel.send(`${dUser.tag} => :door:`)
    break;
    case "8ball":
     var eightball = [
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

     if (args[1])  message.channel.send(eightball[Math.floor(Math.random() * eightball.length)]);
     else  message.channel.send("Can't read that.");
    break;
    case "coinflip":
     var coinflip = [
      "Your coin landed on **TAIL**.",
      "Your coin landed on **HEADS**."
     ];

     message.channel.send(coinflip[Math.floor(Math.random() * coinflip.length)]);
    break;
    case "ding":
     message.channel.send("DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG!");
    break;
    case "beep":
     message.channel.send("Boop!")
    break;
    case "kill":
     const iUser = message.mentions.members.first();
     
     var kill = [
      `${message.author} has been roasted to a a toast like a bread.`,
      `${message.author} accidentally stuck his head in the washing machine and got his head washed off`,
      `${message.author}\'s beard got pulled off and he lost too much blood. He died. RIP`,
      `${message.author} jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `${message.author} jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `${message.author} is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself`,
      `${message.author} is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `${message.author} got a gun and didn't know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `${message.author} was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `${message.author} wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];
     
     if(!iUser) message.channel.send(kill[Math.floor(Math.random() * kill.length)])

     var killer = [
      `<@${iUser.id}> has been roasted to a a toast like a bread.`,
      `<@${iUser.id}> accidentally stuck his head in the washing machine and got his head washed off`,
      `<@${iUser.id}>\'s beard got pulled off and he lost too much blood. He died. RIP`,
      `<@${iUser.id}> jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `<@${iUser.id}> jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `<@${iUser.id}> is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself`,
      `<@${iUser.id}> is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `<@${iUser.id}> got a gun and didn't know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`
     ];

     message.channel.send(killer[Math.floor(Math.random() * killer.length)])
    break;
    case "hack":
      const hsUser = message.member;
      const hUser = message.mentions.members.first();const { promisify } = require("util");
      let hwait = require('util').promisify(setTimeout);
      if(!hUser) return message.channel.send('Who to hack?');

      await message.channel.send(`Prepare to hack <@${hUser.id}>...`)
      await hwait(2500)
      await message.channel.send('Starting process...')
      await hwait(2500)
      await message.channel.send(`Locating ${hUser.id}'s device.`)
      await hwait(10000)
      await message.channel.send(`Found ${hUser.id}'s location.`)
      await hwait(3000)
      await message.channel.send("Hacking IP address...")
      await hwait(13000)
      await message.channel.send("IP address found.")
      await hwait(2500)
      await message.channel.send(`Starting to hack ${hUser.id}'s device`)
      await hwait(5000)
      await message.channel.send(`Failed to hack ${hUser.id}'s device. Manual hack needed.`)
      var embed = new Discord.MessageEmbed()
      .setTitle("Hacking manual")
      .setDescription("Someone's hacking! Beware!")
      .setColor(0xc8e9ca)
      .addField("Who's Hacking?", `<@${hsUser.id}>`)
      .addField("Who's being hacked?", `<@${hUser.id}>`)
      .addField(`${hUser.id}'s IP`, "127.0.0.1")
      .addField("Windows 7/8/8.1/10", "Windows is easy to hack. If you're using Windows, follow the steps below.")
      .addField("Step 1", "Open Cmd in administrator.", true)
      .addField("Step 2", "Type `shutdown /i` then hit enter.", true)
      .addField("Step 3", "You will see a pop-up window, press add, then type the IP address writen above, hit add.", true)
      .addField("Step 4", "Choose if you want to shutdown or restart his computer.", true)
      .addField("Step 5", "Type in a message for him.", true)
      .addField("Step 6", "Hit ok.", true)
      .addField("Step 7", "See someone freaks out.", true)
      .addField("Linux and MacOS", `We haven't test out using Linux or MacOS, but you can use a virtual machine to hack <@${hUser.id}>.`)
      message.channel.send(embed)
    break;
    //end of fun commands
    //messing Commands
    case "mess":
     message.channel.send("sfajdfhewfuinewoiaf");
    break;
    case "messer":
     message.channel.send("afhq930jr3o249ru43984n3qf0jq9032dkj90j3209fj34h98f0wqxm90qj2389d23y58934fnrejwtoiewrjtoeritfioejfeie");
    break;
    case "messest":
     message.channel.send("dfjadsifdsalfiuwe09472345r;ekfhsdafohidpfewihfolsdgjsdailfjdskafjweohrieifhsdoihfwenifhsdklfnsdklfhsuadfwoijeisrhwoefihwe89e7r4239irjweilfhsadF?ksdajf'erypsd]pgsd]g[e[fkiae7y8o21638i`9`-=]12=3]4[elflksdhvuiTAFoiwejankfch")
     message.channel.send("dfaiouawe0r9850io34hfkdsjlf78dayfhoegiutqw[0pifjhauidfhx,nvcjksadhcildncklwahiupfhwkefbhiuwehoifqhiUR")
     message.channel.send("SDAR8F723Q8UHFDSNUOCMOADJIhfoiahebfigdhvbnksdlahvaoesifwe");
    break;
    //end of messing Commands
    //utilities
    case "report":
     const rUser = message.mentions.members.first();
     if(!rUser) return message.channel.send("Could not find user.")
     let rReason = args.join(' ').slice(' ')

     var embed = new Discord.MessageEmbed()
     .setTitle("User reports User")
     .setColor(0xff0000)
     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", rReason)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")

     let reportsChannel = message.guild.channels.cache.find(channel => channel.name === "report-approval");
     if(!reportsChannel) return message.channel.send("Could not find report channel.");

     message.delete().catch(()=> {});
     reportsChannel.send(embed);
    break;
    //end of utilities
    //admin commands
    case "kick":
     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = args.join(' ').slice(' ')
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have the permission to do that!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

     var embed = new Discord.MessageEmbed()
     .setDescription("~Kick~")
     .setColor(0xff0000)
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")

     let kickChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!kickChannel) return message.channel.send("Could not find server logs channel.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(embed);

     kUser.send(`You have been kicked from Acton's Official Empire. Reason: ${kReason}.`)
    break;
    case "ban":
     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = args.join(' ').slice(' ')
     if(!message.member.hasPermission("BAN_MEMBERS"))  return message.channel.send("You don't have the permission to do that!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");

     var embed = new Discord.MessageEmbed()
     .setDescription("~Kick~")
     .setColor(0xff0000)
     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", bReason)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")

     let banChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!banChannel) return message.channel.send("Could not find server logs channel.");

     message.guild.member(bUser).ban(bReason);
     banChannel.send(embed);

     bUser.send(`You have been banned from Acton's Official Empire. Duration: *Infinity*; Reason: ${bReason}`)
    break;
    case "update":
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot do that!");

     var embed = new Discord.MessageEmbed()
     .setTitle("Update Successful!")
     .setDescription("Successfully updated to Version 0.25.0!")
     .addField("Prefix", "?a \(Uncustomable\)")
     .addField("Public Commands", "`help` \(Will lead you to other help commands\), `hello`, `aot`, `bye`, `noticeme`, `support`, `salmon`, `apple`, `pie`, `candy`, `mess`, `messer`, `messest`, `8ball`, `ding`, `ping`, `beep`, `door`, `coinflip`, `kill`, `report`, `botinfo`, `userinfo`, `hack`")
     .addField("Admin Commands", "`kick`, `ban`, `mute`, `tempmute`, `unmute`, `clear`", true)
     .addField("New Commands", "N/A", true)
     .addField("Removed Commands", "`invite`, `support`", true)
     .addField("Updates", "Commands removed")
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")

     message.delete().catch(()=> {});
     message.channel.send(embed);
    break;
    case "mute":
     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send("That person doesn't exist");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don't have the permission to do that!");
     if(mUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can't be muted!");
     let mReason = args.join(' ').slice(' ')

     let muterole = mUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!muterole) return message.channel.send("Role doesn't exist");

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === "mute-logs")
     if(!muteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${mUser.id}>`)
     .addField("Duration", "Infinity")
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", mReason)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     muteChannel.send(embed)
    break;
    case "tempmute":
     const tmUser = message.mentions.members.first();
     if (!tmUser) return message.channel.send("That person doesn't exist");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don't have the permission to do that!");
     if(tmUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can't be muted!");
     let tmReason = args.join(' ').slice(' ')

     let tempmuterole = tmUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!tempmuterole) return message.channel.send("Role doesn't exist");

     let time = args[2];

     if(!time){
       return message.channel.send("You did not say how much time!");
     }

     tmUser.roles.add(tempmuterole.id);

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === "mute-logs")
     if(!tempmuteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${tmUser.id}>`)
     .addField("Duration", `${ms(ms(time))}`)
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", tmReason)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     tempmuteChannel.send(embed)
     
     setTimeout(async function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(`<@${tmUser.id}> has been unmuted!`)
     }, ms(time));
    break;
    case "unmute":
     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send("That person doesn't exist");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don't have the permission to do that!");

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!unmuterole) return message.channel.send("Role doesn't exist");

     umUser.roles.remove(unmuterole.id);

     const unmuteChannel = umUser.guild.channels.cache.find(channel => channel.name === "mute-logs")
     if(!unmuteChannel) return;

     unmuteChannel.send(`<@${umUser.id}> has now been unmuted.`);
    break;
    case "clear":
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don't have the permission to do that!");
     if(!args[1]) return message.channel.send("How many?");
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:5000}));
     });
    break;
    //end of admin Commands
    //information
    case "botinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Bot Information")
     .setColor(0x00bfff)
     .addField("Bot Name", bot.user.username)
     .addField("Bot Created On:", bot.user.createdAt)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "userinfo":
     const sUser = message.mentions.members.first();
     const snUser = message.member;
     
     var noembed = new Discord.MessageEmbed()
     .setTitle("User Info")
     .setColor(0x00bfff)
     .setThumbnail(snUser.user.displayAvatarURL())
     .addField("Username", snUser.user.tag)
     .addField("Account created at", snUser.user.createdAt, true)
     .addField("Joined server at", snUser.guild.joinedAt, true)
     .addField("Roles", snUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     if(!sUser) return message.channel.send(noembed)

     var embed = new Discord.MessageEmbed()
     .setTitle("User Info")
     .setColor(0x00bfff)
     .setThumbnail(sUser.user.displayAvatarURL())
     .addField("Username", sUser.user.tag)
     .addField("Account created at", sUser.user.createdAt, true)
     .addField("Joined server at", sUser.guild.joinedAt, true)
     .addField("Roles", sUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    case "serverinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Server Info")
     .setDescription("Message server's information.")
     .setColor(0x00bfff)
     .addField("Server General", "Server General Information")
     .addField("Server Name", message.guild.name, true)
     .addField("Owner", message.guild.owner, true)
     .addField("Created at", message.guild.createdAt, true)
     .addField("People in server", message.guild.memberCount, true)
     .addField("Server Boost", "Server Boost Information")
     .addField("Server Boost Level", message.guild.premiumTier, true)
     .addField("Server Boosts Count", message.guild.premiumSubscriptionCount, true)
     .addField("Voice Channels", "Voice Channels Information")
     .addField("AFK Channel", message.guild.afkChannel, true)
     .addField("Voice Channel AFK Timeout", message.guild.afkTimeout, true)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
     break;
    //end of Information
    //help menus
    case "help":
     var embed = new Discord.MessageEmbed()
     .setTitle("❓Help Menu❓")
     .addField("🔣General Menu🔣", "`helpgeneral`", true)
     .addField("🍴Food Menu🍴", "`helpfood`", true)
     .addField("😀Fun Menu😀", "`helpfun`", true)
     .addField("❓Info Menu❓", "`helpinfo`", true)
     .addField("🤬Messing Menu🤬", "`helpmess`", true)
     .addField("🏳️‍🌈Utilities Menu🏳️‍🌈", "`helputilities`", true)
     .addField("⚒️Moderation Menu⚒️", "`helpmod`", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpgeneral":
     var embed = new Discord.MessageEmbed()
     .setTitle("🔣General Menu🔣", "These are the general commands.")
     .addField("`aot`", "Waking Aot up", true)
     .addField("`bye`", "Waving hands to Aot", true)
     .addField("`hello`", "A greeting command", true)
     .addField("`noticeme`", "Let Aot to notice you", true)
     .addField("`ping`", "Bot ping", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpfood":
     var embed = new Discord.MessageEmbed()
     .setTitle("🍴Food Menu🍴", "These are the foods for you to eat.")
     .addField("`apple`", "NORMAL apple", true)
     .addField("`candy`", "Sweet one", true)
     .addField("`pie`", "Pie", true)
     .addField("`salmon`", "Raw salmon or cooked salmon can be choose", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpmess":
     var embed = new Discord.MessageEmbed()
     .setTitle("🤬Messing Menu🤬", "These are the commands to mess up.")
     .addField("`mess`", "Beginner mess up", true)
     .addField("`messer`", "Advanced mess up", true )
     .addField("`messest`", "??? mess up", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpfun":
     var embed = new Discord.MessageEmbed()
     .setTitle("😀Fun Menu😀", "Available games.")
     .addField("`8ball`", "Predict your future", true)
     .addField("`beep`", "Beep, beep, boop, boop", true)
     .addField("`coinflip`", "Flip a coin!", true)
     .addField("`ding`", "Ding, Dong", true)
     .addField("`door`", "Portal door", true)
     .addField("`hack`", "Hack people", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("❓Info Menu❓", "Informations")
     .addField("`botinfo`", "This bot's info")
     .addField("`serverinfo`", "Server information.")
     .addField("`userinfo`", "User's information.")
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpmod":
     var embed = new Discord.MessageEmbed()
     .setTitle("⚒️Moderation Menu⚒️")
     .addField("`ban`", "Ban people (BAN_MEMBERS)")
     .addField("`clear`", "Bulk delete messages (VIEW_AUDIT_LOG)")
     .addField("`kick`", "Kick people (KICK_MEMBERS)")
     .addField("`mute`", "Mute people (VIEW_AUDIT_LOG)")
     .addField("`tempmute`", "Temporary mute people (VIEW_AUDIT_LOG)")
     .addField("`unmute`", "Unmute a muted person (VIEW_AUDIT_LOG)")
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    case "helputilities":
     var embed = new Discord.MessageEmbed()
     .setTitle("‍🏳️‍🌈Utilities Menu🏳️‍🌈")
     .setColor(0x00ffff)
     .addField("`report`", "To report people's behavior in the server", true)
     .setTimestamp()
     .setFooter("Aot Version 0.25.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    //end of help menus
    default:
     message.channel.send("Invalid command!");
  }
});

bot.login(TOKEN);
