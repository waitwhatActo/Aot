const Discord = require("discord.js");
const ms = require("ms");
const randomPuppy = require("random-puppy");

const config = require("./config.json");
const PREFIX = "?a";

const bot = new Discord.Client();

var hmf = [
  "Need help? ?ahelp will be able to help you.",
  "Enjoy your time using Aot.",
  "Trying to report somebody? DM <@575252669443211264>",
  "Made by cleverActon0126#0126",
  "Version 0.51.2"
];

bot.on("ready", function() {
  console.log("Connected as Aot#0350 and using version 0.51.2");
  bot.user.setPresence({ activity: { name: "?ahelp" }, status: "online" })
});

bot.on("guildMemberAdd", function(member) {
  let newmem = [
    `<@${member.id}> just joined the server - glhf!`,
    `<@${member.id}> just joined. Everyone, look busy!`,
    `<@${member.id}> just joined. Can I get a heal?`,
    `<@${member.id}> joined your party.`,
    `<@${member.id}> joined. You must construct additional pylons.`,
    `Ermagherd. <@${member.id}> is here.`,
    `Welcome, <@${member.id}>. Stay awhile and listen.`,
    `Welcome, <@${member.id}>. We were expecting you ( ͡° ͜ʖ ͡°)`,
    `Welcome, <@${member.id}>. We hope you brought pizza.`,
    `Welcome <@${member.id}>. Leave your weapons by the door.`,
    `A wild <@${member.id}> appeared.`,
    `Swoooosh. <@${member.id}> just landed.`,
    `Brace yourselves. <@${member.id}> just joined the server.`,
    `<@${member.id}> just joined. Hide your bananas.`,
    `<@${member.id}> just arrived. Seems OP - please nerf.`,
    `<@${member.id}> just slid into the server.`,
    `A <@${member.id}> has spawned in the server.`,
    `Big <@${member.id}> showed up!`,
    `Where’s <@${member.id}>? In the server!`,
    `<@${member.id}> hopped into the server. Kangaroo!!`,
    `<@${member.id}> just showed up. Hold my beer.`,
    `Challenger approaching - <@${member.id}> has appeared!`,
    `It's a bird! It's a plane! Nevermind, it's just <@${member.id}>.`,
    `It's <@${member.id}>! Praise the sun! [T]/`,
    `Never gonna give <@${member.id}> up. Never gonna let <@${member.id}> down.`,
    `Ha! <@${member.id}> has joined! You activated my trap card!`,
    `Cheers, love! <@${member.id}>'s here!`,
    `Hey! Listen! <@${member.id}> has joined!`,
    `We've been expecting you <@${member.id}>`,
    `It's dangerous to go alone, take <@${member.id}>!`,
    `<@${member.id}> has joined the server! It's super effective!`,
    `Cheers, love! <@${member.id}> is here!`,
    `<@${member.id}> is here, as the prophecy foretold.`,
    `<@${member.id}> has arrived. Party's over.`,
    `Ready player <@${member.id}>`,
    `<@${member.id}> is here to kick butt and chew bubblegum. And <@${member.id}> is all out of gum.`,
    `Hello. Is it <@${member.id}> you're looking for?`,
    `<@${member.id}> has joined. Stay a while and listen!`,
    `Roses are red, violets are blue, <@${member.id}> joined this server with you`
  ];

  var inchannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out");

  inchannel.send(newmem[Math.floor(Math.random() * newmem.length)]);

  var embed = new Discord.MessageEmbed()
  .setTitle(`Welcome to ${member.guild.name}!`)
  .setColor("RANDOM")
  .addField(`Welcome to ${member.guild.name}!`, `Here, you can enjoy your time talking to people in <#709339392564527185>. Have fun!`)
  .addField(`Announcements`, `Announcements always goes in to this channel: <#740870989134561331>. It is also a announcement channel so if you don't want to click multiple times to be able to see the announcements, you can just follow the channel into your own server.`)
  .addField(`Rules`, `Please always remember to read the rule in any server you join. For this server, please visit <#651410686705926145> for the rules.`)
  .addField(`Server Information`, `Server informations are available at <#739800400361947176>. It has list of Staffs, Channel Categories, Bots, Roles, Moderations and other useful information about the server.`)
  .setTimestamp()
  .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
  member.send(embed).catch(() => inchannel.send(`Welcome, <@${member.id}>. Unfortunately, I could not send a direct message to you, so if you would like to check out the welcome message, type in \`?awelcome\`in <#709663772620357692> to check out the welcome message!`))
});

bot.on("guildMemberRemove", function(member) {
  const outChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!outChannel) return;

  outChannel.send(`**<@${member.id}>** has left, but we will never forget them.`)
});

bot.on("message", async function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
    //food Commands
    case "salmon":
     function filter(m) {
        return m.author.id === message.author.id;
      }
     message.channel.send("Do you want it `raw` or `cooked`? You could also `cancel` if you don't want your salmon. (Please answer in 15 seconds)")
     message.channel.awaitMessages(filter, 
      {max: 1, 
        time: 15000
      }).then(collected => {
        if(collected.size == 0) message.channel.send("What the heck were you typing? You type so SLOW bro.")
        else if(collected.first().content == "cooked") message.channel.send("We just ran out of salmon. Go buy one and we will cook it for ya.")
        else if(collected.first().content == "cancel") message.channel.send("You just saved another salmon. Help out the earth! #TeamTrees #GoGreen")
        else if(collected.first().content == "raw") message.channel.send("Here\'s your invisible raw salmon.")
        else message.channel.send("That's not one of the option. If you wish to get that kind of salmon, please go to the other shop. We do NOT welcome you here.")
     });
    break;
    case "apple":
     message.channel.send("OK. Here\'s your golden apple. Here you go. Use your imagination to see the apple.");
     message.channel.send("🍎")
    break;
    case "pie":
     message.channel.send("OK. Here\'s your *pre-baked* pie.");
     message.channel.send("🥧");
    break;
    case "candy":
     message.channel.send("OK. Oops, it went out of stock, never come back! (No refund)");
    break;
    //end of food Commands
    //fun commands
    case "door":
     dUser = message.author;

     message.channel.send(`<@${dUser.id}>`)
     message.channel.send("🚪")
    break;
    case "8ball":
     var eballerrembed = new Discord.MessageEmbed()
     .setTitle("8Ball")
     .setDescription("You might not know the usage of 8ball. So let's learn how to use it here.")
     .addField("`8ball [Your question]`", "It's just that simple.")
     .setColor(0xff0000)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      var eballq = args.slice(1).join(" ");
      if(!eballq) return message.channel.send(eballerrembed);

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
       "🔴Don\'t count on it.",
       "🔴My reply is no.",
       "🔴My sources say no.",
       "🔴Hell nah.",
       "🔴Very doubtful."
      ];
 
     message.channel.send(`Your question: ${eballq} \rThe fortune teller: ${eightball[Math.floor(Math.random() * eightball.length)]}`);
    break;
    case "coinflip":
     var coinflip = [
      "Your coin landed on **TAIL**.",
      "Your coin landed on **HEADS**."
     ];

     var wait = require("util").promisify(setTimeout);

     var msg = await message.channel.send("Flipping the coin...")
     await wait(5000)
     await msg.edit(coinflip[Math.floor(Math.random() * coinflip.length)]);
    break;
    case "kill":
     const iUser = message.mentions.members.first();
     if (!iUser) return message.channel.send("Please ping someone to kill or you are gonna kill yourself.");    

     var kill = [
      `<@${iUser.id}> has been roasted to a a toast like a bread.`,
      `<@${iUser.id}> accidentally stuck his head in the washing machine and got his head washed off.`,
      `<@${iUser.id}>\'s beard got pulled off and he lost too much blood. He died. RIP.`,
      `<@${iUser.id}> jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `<@${iUser.id}> jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `<@${iUser.id}> is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
      `<@${iUser.id}> is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `<@${iUser.id}> got a gun and didn't know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `<@${iUser.id}> wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     message.channel.send(kill[Math.floor(Math.random() * kill.length)]);
    break;
    case "shutdown":
      var shutdownerrembed = new Discord.MessageEmbed()
      .setTitle("Shutdown")
      .setDescription("You might not know the usage of shutdown. So let's learn how to use it here.")
      .addField("`shutdown <@someone>`", "It's just that simple.")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      const sdmUser = message.member;
      const sdUser = message.mentions.members.first();const { promisify } = require("util");
      var wait = require("util").promisify(setTimeout);
      if(!sdUser) return message.channel.send(shutdownerrembed);

        var msg = await message.channel.send(`Prepare to shutdown ${sdUser.id}\'s device.`)
      await wait(2500)
      await msg.edit("Starting process...")
      await wait(2500)
      await msg.edit(`Locating ${sdUser.id}'s device.`)
      await wait(10000)
      await msg.edit(`Found ${sdUser.id}'s location.`)
      await wait(3000)
      await msg.edit("Hacking IP address...")
      await wait(13000)
      await msg.edit("IP address found.")
      await wait(2500)
      await msg.edit(`Starting to shutdown ${sdUser.id}'s device`)
      await wait(5000)
      await msg.edit(`Failed to shutdown ${sdUser.id}'s device. Manual shutdown needed.`)

      var embed = new Discord.MessageEmbed()
      .setTitle("Remote Shutdown")
      .setDescription("Someone\'s trying to shudown someone\s device! Beware!")
      .setColor(0xc8e9ca)
      .addField("Who\'s remote shutting down people\' device?", `<@${sdmUser.id}>`)
      .addField("Who\'s being shutted down?", `<@${sdUser.id}>`)
      .addField(`${sdUser.id}"s IP`, "127.0.0.1")
      .addField("Windows 7/8.1/10", "Windows is easy to remote shutdown. If you\'re using Windows, follow the steps below.")
      .addField("Step 1", "Open Cmd in administrator.", true)
      .addField("Step 2", "Type `shutdown /i` then hit enter.", true)
      .addField("Step 3", "You will see a pop-up window, press add, then type the IP address writen above, hit add.", true)
      .addField("Step 4", "Choose if you want to shutdown or restart his computer.", true)
      .addField("Step 5", "Type in a message for them.", true)
      .addField("Step 6", "Hit ok.", true)
      .addField("Step 7", "Watch someone freak out.", true)
      .addField("Linux and MacOS", `We haven't tested out using Linux or MacOS, but you can use a virtual machine to shutdown <@${sdUser.id}>\'s device.`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
      message.channel.send(embed);
    break;
    case "spam":
    const spamChannel = message.member.guild.channels.cache.find(channel => channel.name === "spam");
    if(!spamChannel) return;

    message.channel.send(`To not go againest the rules, I did spam, and I spammed 1 whole message. You should be proud of me. ||Find it||`);

    spamChannel.send("spam spam");
    break;
    case "hack":
     var hackerrembed = new Discord.MessageEmbed()
     .setTitle("Hack")
     .setDescription("You might not know the usage of Hack. So let's learn how to use it here.")
     .addField("`hack [@someone]`", "It's just that simple.")
     .setColor(0xff0000)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      const hsUser = message.member;
      const hUser = message.mentions.members.first();
      if(!hUser) return message.channel.send(hackerremebed);
      var wait = require("util").promisify(setTimeout);

      var msg = await message.channel.send(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c)   Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\`\`\``)
      await wait(500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.51.2] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>cls\`\`\``)
      await wait(500)
      await msg.edit(`\`\`\`C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>exit\`\`\``)
      await wait(500)
      await msg.edit("\`\`\`You have exited the application, nothing to display here.\`\`\`")
    break;
    case "meme":
      const memeSource = [
        "dankmeme", 
        "meme", 
        "memes",
        "animemes",
        "MemesOfAnime",
        "dankmemes",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
      ];
      const memeRandomizer = memeSource[Math.floor(Math.random() * memeSource.length)];
      const memeImage = await randomPuppy(memeRandomizer);
      
      var embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(memeImage)
      .setTitle("Here's your meme, mom.")
      .setURL(`https://reddit.com/r/${memeRandomizer}`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
      message.channel.send(embed);
    break;
    case "rps":
      const rpspUser = message.mentions.members.first();
      const rpsUser = message.member.id;

      var rpswp = [
        `<@${rpsUser}> You have chosen :rock:!\r ${rpspUser} You have chosen :scissors:! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen :scissors:!\r ${rpspUser} You have chosen :rock:! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen :roll_of_paper:!\r ${rpspUser} You have chosen :scissors:! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen :scissors:!\r ${rpspUser} You have chosen :roll_of_paper:! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen :rock:!\r ${rpspUser} You have chosen :roll_of_paper:! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen :roll_of_paper:!\r ${rpspUser} You have chosen :rock:! \r <@${rpsUser}> **YOU WON!**`
      ];

      var rpswb = [
        `<@${rpsUser}> You have chosen :rock:!\r  The bot have have chosen :scissors:! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen :scissors:!\r The bot have chosen :rock:! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen :roll_of_paper:!\r The bot have chosen :scissors:! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen :scissors:!\r The bot have chosen :roll_of_paper:! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen :rock:!\r The bot have chosen :roll_of_paper:! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen :roll_of_paper:!\r The bot have chosen :rock:! \r <@${rpsUser}> **YOU WON!**`
      ];

      if(!args[1]) {
        let bwait = require("util").promisify(setTimeout)
        var bmsg = await message.channel.send("**Please wait 10 seconds to proceed.**  \rYou have chosen to play \"Rock-Paper-Scisors\" with the bot. The proccess is automatic and generated by the bot. \r*DDos is provided by RoadFlare*")
        await bwait(10000)
        bmsg.edit(rpswb[Math.floor(Math.random() * rpswb.length)])
      } else {  
        let wait = require("util").promisfy(setTimeout)
        var hmsg = await message.channel.send("**Please wait 10 seconds to proceed.**  \rYou have chosen to play \"Rock-Paper-Scisors\" with the bot. The proccess is automatic and generated by the bot. \r*DDos is provided by RoadFlare*")
        await wait(10000)
        hmsg.edit(rpswp[Math.floor(Math.random() * rpswp.length)])
      };
    break;
    //end of fun commands
    //admin commands
    case "addrole":
      var addroleerrembed = new Discord.MessageEmbed()
      .setTitle("Addrole")
      .setDescription("Usage for addrole:")
      .addField("`addrole <@user> <@role>`", "Permission Required: MANAGE_ROLES")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let arUser = message.mentions.members.first();
      if(!arUser) return message.channel.send(addroleerrembed);
      let arRole = message.mentions.roles.first();
      if(!arRole) return message.channel.send(addroleerrembed);

       var embed = new Discord.MessageEmbed()
      .setDescription("Role Added to User")
      .setColor(0xff0000)
      .addField("Role Added User", `${arUser} with ID ${arUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let arChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!arChannel) return message.channel.send("Could not find server logs channel.");

      arChannel.send(embed);

      arUser.roles.add(arRole.id);

      message.channel.send(`Role added for <@${arUser.id}>`);
    break;
    case "tempaddrole":
      var tempaddroleerrembed = new Discord.MessageEmbed()
      .setTitle("Tempaddrole")
      .setDescription("Usage for tempaddrole:")
      .addField("`tempaddrole <@someone> <@role> <time>`", "Permission Required: MANAGE_ROLES")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let tarUser = message.mentions.members.first();
      if(!tarUser) return message.channel.send(tempaddroleerrembed);
      let tarRole = message.mentions.roles.first();
      if(!tarRole) return message.channel.send(tempaddroleerrembed);

      let tartime = args[3];

      tarUser.roles.add(tarRole.id);

      var embed = new Discord.MessageEmbed()
      .setDescription("Role temporily Added to User")
      .setColor(0xff0000)
      .addField("Role Added User", `${tarUser} with ID ${tarUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .addField("Duration", tartime)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let tarChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!tarChannel) return message.channel.send("Could not find server logs channel.");

      tarChannel.send(embed);

      message.channel.send(`Role added for <@${tarUser.id}> for ${tartime}`)

      setTimeout(function() {
        tarUser.roles.remove(tarRole.id);
        message.channel.send(`Role removed for <@${tarUser.id}>`)
      }, ms(tartime));
    break;
    case "removerole":
      var removeroleerrembed = new Discord.MessageEmbed()
      .setTitle("Removerole")
      .setDescription("Usage for reomverole:")
      .addField("`removerole <@someone> <@role>`", "Permission Required: MANAGE_ROLES")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let rrUser = message.mentions.members.first();
      if(!rrUser) return message.channel.send(removeroleerrembed);
      let rrRole = message.mentions.roles.first();
      if(!rrRole) return message.channel.send(removeroleerrembed);

      var embed = new Discord.MessageEmbed()
      .setDescription("Role Removed from User")
      .setColor(0xff0000)
      .addField("Role Removed User", `${rrUser} with ID ${rrUser.id}`)
      .addField("Removed By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Removed In", message.channel)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let rrChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!rrChannel) return message.channel.send("Could not find server logs channel.");

      rrChannel.send(embed);

      rrUser.roles.remove(rrRole.id);

      message.channel.send(`Role removed for <@${rrUser.id}>`)
    break;
    case "kick":
      var kickerrembed = new Discord.MessageEmbed()
      .setTitle("Kick")
      .setDescription("Usage for kick:")
      .addField("`kick <@someone> <reason>`", "Permission Required: KICK_MEMBER")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send(kickerrembed);
     let kReason = args.slice(2).join(" ");
     if(!kReason) return message.channel.send("Please provide a reason!");
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don\'t have permission to do that!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can\'t be kicked!");
     
     var embed = new Discord.MessageEmbed()
     .setDescription("User Kicked")
     .setColor(0xff0000)
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel.toString())
     .addField("Time", message.createdAt)
     .addField("Reason", kReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

     let kick2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!kick2Channel) return message.channel.send("Could not find server logs channel.");

     kUser.kick(kReason);
     kick2Channel.send(embed);

     message.channel.send(`<@${kUser.id}> has been kicked. Reason: ${kReason}`)

     kUser.send(`You have been kicked from ${message.member.guild.name}. Reason: ${kReason}.`)
    break;
    case "tempban":
      var tempbanerrembed = new Discord.MessageEmbed()
      .setTitle("Tempban")
      .setDescription("Usage for tempban:")
      .addField("`tempban <@someone> <time> <reason>`", "Permission Required: BAN_MEMBER")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const tbUser = message.mentions.members.first();
     if(!tbUser) return message.channel.send(tempbanerrembed);
     let tbReason = args.slice(3).join(" ");
     if (!tbReason) return message.channel.send("Please provide a reason.")
     if(!message.member.hasPermission("BAN_MEMBERS"))  return message.channel.send("You don\'t have permission to do that!");
     if(tbUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned!");

     var tempbantime = args[2];

     var embed = new Discord.MessageEmbed()
     .setTitle("User Temp Banned")
     .setColor(0xff0000)
     .addField("Temp Banned User", `${tbUser} with ID ${tbUser.id}`)
     .addField("Temp Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Temp Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", tbReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

     let tempbanChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempbanChannel) return message.channel.send("Could not find server logs channel.");

     message.guild.members.ban(tbUser, { reason: `User banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${tbReason}` }, { time: tempbantime });
     tempbanChannel.send(embed);

     message.channel.send(`<@${tbUser.id}> has been temp banned for ${tempbantime}.`)

     setTimeout(function() {
        message.guild.members.unban(tbUser.id);
        message.channel.send(`<@${tbUser.id}> has been unbanned.`)
        tempbanChannel.send(`<@${tbUser.id}> has been unbanned`)
     }, ms(ms(tempbantime)));
    break;
    case "ban":
      var banerrembed = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setDescription("Usage for ban:")
      .addField("`ban <@someone> <reason>`", "Permission Required: BAN_MEMBERS")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send(banerrembed);
     let bReason = args.slice(2).join(" ")
     if(!message.member.hasPermission("BAN_MEMBERS"))  return message.channel.send("You don\'t have permission to do that!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can\'t be banned!");

     var embed = new Discord.MessageEmbed()
     .setTitle("User Banned")
     .setColor(0xff0000)
     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", bReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

     let banChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!banChannel) return message.channel.send("Could not find server logs channel.");

     message.guild.members.ban(bUser, {reason: `User banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${bReason}`});
     banChannel.send(embed);

     message.channel.send(`<@${bUser.id}> has been banned.`)

     bUser.send(`You have been banned from Official Acton Fan Server. Duration: *Infinity*; Reason: ${bReason}`)
    break;
    case "unban":
      var unbanerrembed = new Discord.MessageEmbed()
      .setTitle("Unban")
      .setDescription("Usage for unban:")
      .addField("`unban <USER ID> <reason>`", "Permission Required: BAN_MEMBERS")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      const ubID = args[1];
      if(!ubID) return message.channel.send(unbanerrembed);
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don\'t have permission to do that!")

      var embed = new Discord.MessageEmbed()
      .setTitle("User Unbanned")
      .setColor(0xff0000)
      .addField("Unbanned User", `<@${ubID}> with ID ${ubID}`)
      .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Unbanned In", message.channel)
      .addField("Time", message.createdAt)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let unban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!unban2Channel) return message.channel.send("Could not find server logs channel.");

      message.guild.members.unban(ubID)
      unban2Channel.send(embed);
    break;
    case "update":
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don\'t have permission to do that!");

     var embed = new Discord.MessageEmbed()
     .setTitle("Admin Temp Commands Bug Fix Update (yes, again, it wasn't completely patched)")
     .setDescription("Successfully updated to Version 0.51.2!")
     .addField("Prefix", "?a \(Uncustomable\)")
     .addField("Public Commands", "`help` \(Will lead you to other help commands\), `salmon`, `apple`, `pie`, `candy`, `spam`, `8ball`, `door`, `coinflip`, `kill`, `hack`, `shutdown`, `rps`,  `botinfo`, `userinfo`, `serverinfo`, `welcome`")
     .addField("Admin Commands", "`kick`, `ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`, `addrole`, `tempaddrole`, `removerole`, `tempremoverole`, `lockdown`, `unlock`", true)
     .addField("New Commands", "N/A", true)
     .addField("Removed Commands", "N/A", true)
     .addField("Updates", "Fixed `tempaddrole`, `tempmute` and `tempban` bug.")
     .addField("Other Information from the Developer", "N/A")
     .addField("Code is available at", "Base currently down")
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter("Aot Version 0.51.2, Made by cleverActon0126#0126")

     message.delete().catch(()=> {});
     message.channel.send(embed);
    break;
    case "mute":
      var muteerrembed = new Discord.MessageEmbed()
      .setTitle("Mute")
      .setDescription("Usage for mute:")
      .addField("`mute <@someone> <reason>`", "Permission Required: VIEW_AUDIT_LOG")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send(muteerrembed);
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(mUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can\'t be muted!");
     let mReason = args.slice(2).join(" ")
     if(!mReason) return message.channel.send("Please provide a reason")

     let muterole = mUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!muterole) return message.channel.send("Role doesn\'t exist");

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!muteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${mUser.id}>`)
     .addField("Duration", "Undefined")
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", mReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     muteChannel.send(embed)
    break;
    case "tempmute":
      var unbanerrembed = new Discord.MessageEmbed()
      .setTitle("Unban")
      .setDescription("Usage for unban:")
      .addField("`unban <USER ID> <reason>`", "Permission Required: VIEW_AUDIT_LOG")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const tmUser = message.mentions.members.first();
     if (!tmUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(tmUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can\'t be muted!");
     let tmReason = args.slice(3).join(" ")

     let tempmuterole = tmUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!tempmuterole) return message.channel.send("Role doesn\'t exist");

     let mutetime = args[2];

     if(!mutetime){
       return message.channel.send("You did not say how much time!");
     }

     tmUser.roles.add(tempmuterole.id);

     message.channel.send(`<@${tmUser.id}> has been muted for ${mutetime}.`);

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempmuteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${tmUser.id}>`)
     .addField("Duration", `${ms(ms(mutetime))}`)
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", `${tmReason}`)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     tempmuteChannel.send(embed)

     setTimeout(function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(`<@${tmUser.id}> has been unmuted!`)
     }, ms(mutetime));
    break;
    case "unmute":
      var unmuteerrembed = new Discord.MessageEmbed()
      .setTitle("Unmute")
      .setDescription("Usage for unmute:")
      .addField("`unmute <@someone>`", "Permission Required: VIEW_AUDIT_LOG")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send(unmuteerrembed);
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!unmuterole) return message.channel.send("Role doesn\'t exist");

     umUser.roles.remove(unmuterole.id);

     const unmute2Channel = umUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!unmute2Channel) return;

     unmute2Channel.send(`<@${umUser.id}> has now been unmuted.`)
    break;
    case "clear":
      var clearerrembed = new Discord.MessageEmbed()
      .setTitle("Clear")
      .setDescription("Usage for clear:")
      .addField("`clear <1-99>`", "Permission Required: VIEW_AUDIT_LOG")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(!args[1]) return message.channel.send(clearerrembed);
     let clearchannel = message.channel.id;
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:3000}));
     });
     let clearlog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
     if(!clearlog) return message.channel.send("Couldn't find server logs channel.")

     clearlog.send(`<@${message.member.id}> has deleted ${args[1]} in <#${clearchannel}>`)
    break;
    case "lockdown":
      var lcgeneral = message.guild.channels.cache.find(channel => channel.name == "general-chat");
      var lcrandomstuff = message.guild.channels.cache.find(channel => channel.name == "random-stuff");
      var lccounting = message.guild.channels.cache.find(channel => channel.name == "counting");
      var lcspam = message.guild.channels.cache.find(channel => channel.name == "spam");
      var lcbotcommands = message.guild.channels.cache.find(channel => channel.name == "bot-commands");
      var lcdankcommands = message.guild.channels.cache.find(channel => channel.name == "dank-commands");
      var lcsongcommands = message.guild.channels.cache.find(channel => channel.name == "song-commands");
      var lvgeneral1 = message.guild.channels.cache.find(channel => channel.name == "General VC" && channel.type === "voice");
      var lvgeneral2 = message.guild.channels.cache.find(channel => channel.name == "General VC 2" && channel.type === "voice");
      var lvsongvc = message.guild.channels.cache.find(channel => channel.name == "Music VC" && channel.type === "voice");
      var lvgamingvc = message.guild.channels.cache.find(channel => channel.name == "Gaming VC" && channel.type === "voice");
      var lvafkvc = message.guild.channels.cache.find(channel => channel.name == "AFK VC" && channel.type === "voice");
      
      message.delete().catch(()=> {});
      var lUser = message.member;
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`<@${lUser.id}>, hmm, I wonder where is your permission to do that?`);

      var ldr = args.slice(2).join(" ");
      if(!args[1]) return message.channel.send("There is no time provided.");
      if(!args[2]) return message.channel.send("There is no reason provided.");

      var lac = message.guild.channels.cache.find(channel => channel.name === "announcements");
      if(!lac) return message.channel.send("No announce channel!");

      lcgeneral.updateOverwrite(lcgeneral.guild.roles.everyone, { SEND_MESSAGE: false });
      lccounting.updateOverwrite(lccounting.guild.roles.everyone, { SEND_MESSAGES: false });
      lcrandomstuff.updateOverwrite(lcrandomstuff.guild.roles.everyone, { SEND_MESSAGES: false });
      lcspam.updateOverwrite(lcspam.guild.roles.everyone, { SEND_MESSAGES: false });
      lcbotcommands.updateOverwrite(lcbotcommands.guild.roles.everyone, { SEND_MESSAGES: false });
      lcdankcommands.updateOverwrite(lcdankcommands.guild.roles.everyone, { SEND_MESSAGES: false });
      lcsongcommands.updateOverwrite(lcsongcommands.guild.roles.everyone, { SEND_MESSAGES: false });
      lvgeneral1.updateOverwrite(lvgeneral1.guild.roles.everyone, { CONNECT: false });
      lvgeneral2.updateOverwrite(lvgeneral2.guild.roles.everyone, { CONNECT: false });
      lvsongvc.updateOverwrite(lvsongvc.guild.roles.everyone, { CONNECT: false });
      lvgamingvc.updateOverwrite(lvgamingvc.guild.roles.everyone, { CONNECT: false });
      lvafkvc.updateOverwrite(lvafkvc.guild.roles.everyone, { CONNECT: false });

      var embed = new Discord.MessageEmbed()
      .setTitle("🔒Server Lockdown🔒")
      .setColor(0xff0000)
      .addField("Server Lockdown", `The server has been locked by the moderators team. The estimated time will be ${args[1]}.  The reason of locking down is ${ldr}. All channels are now disabled. Please be patient and do not spam DM a moderator or admin. This bot WILL NOT automatic unlock the server.`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      lac.send(embed);
      lcgeneral.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lccounting.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lcrandomstuff.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lcspam.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lcbotcommands.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lcdankcommands.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
      lcsongcommands.send("🔴Server lockdown. Please check announcement channel for updates.🔴");
    break;
    case "unlock":
      var ulcgeneral = message.guild.channels.cache.find(channel => channel.name == "general-chat");
      var ulcrandomstuff = message.guild.channels.cache.find(channel => channel.name == "random-stuff");
      var ulccounting = message.guild.channels.cache.find(channel => channel.name == "counting");
      var ulcspam = message.guild.channels.cache.find(channel => channel.name == "spam");
      var ulcbotcommands = message.guild.channels.cache.find(channel => channel.name == "bot-commands");
      var ulcdankcommands = message.guild.channels.cache.find(channel => channel.name == "dank-commands");
      var ulcsongcommands = message.guild.channels.cache.find(channel => channel.name == "song-commands");
      var ulvgeneral1 = message.guild.channels.cache.find(channel => channel.name == "General VC" && channel.type === "voice");
      var ulvgeneral2 = message.guild.channels.cache.find(channel => channel.name == "General VC 2" && channel.type === "voice");
      var ulvsongvc = message.guild.channels.cache.find(channel => channel.name == "Music VC" && channel.type === "voice");
      var ulvgamingvc = message.guild.channels.cache.find(channel => channel.name == "Gaming VC" && channel.type === "voice");
      var ulvafkvc = message.guild.channels.cache.find(channel => channel.name == "AFK VC" && channel.type === "voice");
      message.delete().catch(()=> {});

      var ulUser = message.member;
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`<@${ulUser.id}>, hmm, I wonder where is your permission to do that?`);

      var uac = message.guild.channels.cache.find(channel => channel.name === "announcements");
      if(!uac) return message.channel.send("No announce channel!");

      ulcgeneral.updateOverwrite(ulcgeneral.guild.roles.everyone, { SEND_MESSAGE: true });
      ulccounting.updateOverwrite(ulccounting.guild.roles.everyone, { SEND_MESSAGES: true });
      ulcrandomstuff.updateOverwrite(ulcrandomstuff.guild.roles.everyone, { SEND_MESSAGES: true });
      ulcspam.updateOverwrite(ulcspam.guild.roles.everyone, { SEND_MESSAGES: true });
      ulcbotcommands.updateOverwrite(ulcbotcommands.guild.roles.everyone, { SEND_MESSAGES: true });
      ulcdankcommands.updateOverwrite(ulcdankcommands.guild.roles.everyone, { SEND_MESSAGES: true });
      ulcsongcommands.updateOverwrite(ulcsongcommands.guild.roles.everyone, { SEND_MESSAGES: true });
      ulvgeneral1.updateOverwrite(ulvgeneral1.guild.roles.everyone, { CONNECT: true });
      ulvgeneral2.updateOverwrite(ulvgeneral2.guild.roles.everyone, { CONNECT: true });
      ulvsongvc.updateOverwrite(ulvsongvc.guild.roles.everyone, { CONNECT: true });
      ulvgamingvc.updateOverwrite(ulvgamingvc.guild.roles.everyone, { CONNECT: true });
      ulvafkvc.updateOverwrite(ulvafkvc.guild.roles.everyone, { CONNECT: true });

      var embed = new Discord.MessageEmbed()
      .setTitle("🔓Server Unlock🔓")
      .setColor(0x008000)
      .addField("Server Unlock", "The server has been unlocked by a server moderator or an admin. All channels are now available.")
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      uac.send(embed);
      ulcgeneral.send("🟢Server unlocked.🟢");
      ulccounting.send("🟢Server unlocked.🟢");
      ulcrandomstuff.send("🟢Server unlocked.🟢");
      ulcspam.send("🟢Server unlocked.🟢");
      ulcbotcommands.send("🟢Server unlocked.🟢");
      ulcdankcommands.send("🟢Server unlocked.🟢");
      ulcsongcommands.send("🟢Server unlocked.🟢");
    break;
    //end of admin Commands
    //information
    case "botinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Bot Information")
     .setColor(0x00bfff)
     .addField("General Information", "Bot's general information", true)
     .addField("Bot Name", bot.user.username, true)
     .addField("Bot Created On:", bot.user.createdAt, true)
     .addField("Bot Creator", "<@428445352354643968>", true)
     .addField("Bot Developers", "<@696010548378337321>", true)
     .addField("Bot Contributers", "<@428445352354643968>: All Versions \r<@696010548378337321>: 0.51.2")
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
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
     .addField("Joined server at", snUser.joinedAt, true)
     .addField("Roles", snUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     if(!sUser) return message.channel.send(noembed)

     var embed = new Discord.MessageEmbed()
     .setTitle("User Info")
     .setColor(0x00bfff)
     .setThumbnail(sUser.user.displayAvatarURL())
     .addField("Username", sUser.user.tag)
     .addField("Account created at", sUser.user.createdAt, true)
     .addField("Joined server at", sUser.joinedAt, true)
     .addField("Roles", sUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     message.channel.send(embed)
    break;
    case "serverinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Server Info")
     .setDescription("Server\'s information.")
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
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     message.channel.send(embed)
     break;
    case "welcome":
      var embed = new Discord.MessageEmbed()
      .setTitle(`Welcome to ${message.channel.guild.name}!`)
      .setColor("RANDOM")
      .addField(`Welcome to ${message.channel.guild.name}!`, `Here, you can enjoy your time talking to people in <#709339392564527185>. Have fun!`)
      .addField(`Announcements`, `Announcements always goes in to this channel: <#740870989134561331>. It is also a announcement channel so if you don't want to click multiple times to be able to see the announcements, you can just follow the channel into your own server.`)
      .addField(`Rules`, `Please always remember to read the rule in any server you join. For this server, please visit <#651410686705926145> for the rules.`)
      .addField(`Server Information`, `Server informations are available at <#739800400361947176>. It has list of Staffs, Channel Categories, Bots, Roles, Moderations and other useful information about the server.`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
      message.channel.send(embed)
    break;
     //end of Information
    //help
    case "help":
      if(args[1] == "food") {
      var fembed = new Discord.MessageEmbed()
       .setTitle("🍴Food Menu🍴", "These are the foods for you to eat.")
       .addField("`apple`", "NORMAL apple", true)
       .addField("`candy`", "Sweet one", true)
       .addField("`pie`", "Pie", true)
       .addField("`salmon`", "Raw salmon or cooked salmon can be choose", true)
       .setColor(0x00ffff)
       .setTimestamp()
       .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
      message.channel.send(fembed);
      } else if(args[1] == "fun") {
       var fuembed = new Discord.MessageEmbed()
       .setTitle("😀Fun Menu😀", "Available games.")
       .addField("`8ball <your question>`", "Predict your future", true)
       .addField("`coinflip`", "Flip a coin!", true)
       .addField("`door`", "Portal door", true)
       .addField("`shutdown`", "Shutdown  people\'s device", true)
       .addField("`spam`", "Spam", true)
       .addField("`meme`", "Get memes!", true)
       .setColor(0x00ffff)
       .setTimestamp()
       .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
       message.channel.send(fuembed);
      } else if (args[1] == "info") {
       var iembed = new Discord.MessageEmbed()
       .setTitle("❓Info Menu❓", "Informations")
       .addField("`botinfo`", "This bot\'s info")
       .addField("`serverinfo`", "Server information.")
       .addField("`userinfo`", "User\'s information.")
       .addField("`welcome`", "Welcome message")
       .setTimestamp()
       .setColor(0x00ffff)
       .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
       message.channel.send(iembed);
      } else if (args[1] == "mod") {
        if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("You need permissions to use this command.")

        var membed = new Discord.MessageEmbed()
        .setTitle("⚒️Moderation Menu⚒️")
        .addFields(
          { name: " Actions", value: "All moderation actions to member" },
          { name: "`kick <@someone> <reason>`", value: "Kick member (KICK_MEMBERS)", inline: true },
          { name: "`ban <@someone> <reason>`", value: "Ban member (BAN_MEMBERS)", inline: true },
          { name: "`tempban <@someone> <reason>`", value: "Temporary ban member (BAN_MEMBERS)", inline: true },
          { name: "`mute <@someone> <reason>`", value: "Mute member (VIEW_AUDIT_LOG)", inline: true },
          { name: "`tempmute <@someone> <time> <reason>`", value: "Temporary mute member (VIEW_AUDIT_LOG)", inline: true },
          { name: "`unmute <@someone>`", value: "Unmute a muted member (VIEW_AUDIT_LOG)", inline: true },
          { name: "`addrole <@someone> <@role>`", value: "Add a role to a member (MANAGE_ROLES)", inline: true },
          { name: "`tempaddrole <@someone> <@role> <time>`", value: "Add a role to a member temporary (MANAGE_ROLES)", inline: true },
          { name: "`removerole <@someone> <@role>`", value: "Remove a role from a member (MANAGE_ROLES)", inline: true },
          { name: "`tempremoverole <@someone <@role> <time>`", value: "Remove a role from a person temporary (MANAGE_ROLES)", inline: true }
        )
        .addFields(
          { name: "Server Actions", value: "Do things to server, higher permissions required." },
          { name: "`lockdown <time> <reason>`", value: "Locks the server (MANAGE_SERVER)", inline: true },
          { name: "`unlock`", value: "Unlocks the server (MANAGE_SERVER)", inline: true },
          { name: "`clear <1-99>`", value: "Bulk delete messages (VIEW_AUDIT_LOG)", inline: true }
        )
        .setTimestamp()
        .setColor(0x00ffff)
        .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
        message.channel.send(membed)
      } else {
        var hembed = new Discord.MessageEmbed()
       .setTitle("❓Help Menu❓")
       .addField("🍴Food Menu🍴", "`help food`", true)
       .addField("😀Fun Menu😀", "`help fun`", true)
       .addField("❓Info Menu❓", "`help info`", true)
       .addField("⚒️Moderation Menu⚒️", "`help mod`", true)
       .setColor(0x00ffff)
       .setTimestamp()
       .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
       message.channel.send(hembed);
      };
    break;
  };
});

bot.login(config.token);