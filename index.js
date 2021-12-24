const Discord = require("discord.js");
const ms = require("ms");
const randomPuppy = require("random-puppy");
const fs = require("fs");

const config = require("./config.json");
const PREFIX = "?a";

const bot = new Discord.Client();

var hmf = [
  "Need help? ?ahelp will be able to help you",
  "Enjoy your time using Aot",
  "Trying to report somebody? DM @ModMail",
  "Made by cleverActon0126#0126",
  "Version 0.55.0"
];

bot.on("ready", function() {
  console.log("Connected as Aot#0350 and using version 0.55.0");
  bot.user.setActivity(`?ahelp on v0.55.0`, { type: 'PLAYING' });
  let hours = 0;
  setInterval(async () => {
    hours += 1;
    await bot.user.setActivity(`?ahelp for ${hours} hours on v0.55.0`, { type: 'PLAYING' });
  }, 3600000);
});

bot.on("guildMemberAdd", function(member) {
  if(member.id == "844370394781712384") return member.roles.add("725361624294096927");

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

  var inchannel = member.guild.channels.cache.find(channel => channel.name === "general-chat");

  inchannel.send(newmem[Math.floor(Math.random() * newmem.length)]);

  var embed = new Discord.MessageEmbed()
  .setTitle(`Welcome to ${member.guild.name}!`)
  .setColor("RANDOM")
  .addField(`Welcome to ${member.guild.name}!`, `Here, you can enjoy your time talking to people in <#709339392564527185>. Have fun!`)
  .addField(`Announcements`, `Announcements always goes in to this channel: <#740870989134561331>. It is also an announcement channel so if you don't want to click multiple times to be able to see the announcements, you can just follow the channel into your own server.`)
  .addField(`Rules`, `Please always remember to read the rule in any server you join. For this server, please visit <#651410686705926145> for the rules.`)
  .addField(`Server Information`, `Server informations are available at <#739800400361947176>. It has list of Staffs, Channel Categories, Bots, Roles, Moderations and other useful information about the server.`)
  .setTimestamp()
  .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
  member.send(embed).catch(() => member.send(embed));
});

var sl = fs.readFileSync('sl.txt').toString().split("\n");

bot.on("message", async function(message) {
  for(var slc = 0; slc < sl.length; slc++) {
    if(message.content.includes(sl[slc])){
      message.delete();
      console.log("Test success");
    }
  }

  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(PREFIX)) return;

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
        else if(collected.first().content == "cancel") message.channel.send("Salmons are tasty imo, just eat some.")
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
      if(!hUser) return message.channel.send(hackerrembed);
      var wait = require("util").promisify(setTimeout);

      var msg = await message.channel.send(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c)   Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\`\`\``)
      await wait(500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.55.0] \r(c) 2021 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAcquiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>cls\`\`\``)
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
      message.delete();

      var addroleerrembed = new Discord.MessageEmbed()
      .setTitle("Addrole")
      .setDescription("Usage for addrole:")
      .addField("`addrole <@user> <@role>`", "Role(s) required: `@Lead Moderator`& `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don\'t have permission to do that.");
      let arUser = message.mentions.members.first();
      if(!arUser) return message.channel.send(addroleerrembed);
      let arRole = message.mentions.roles.first();
      if(!arRole) return message.channel.send(addroleerrembed);

       var embed = new Discord.MessageEmbed()
      .setDescription("Role Added to User")
      .setColor(0xff0000)
      .addField("User with New Role", `${arUser} with ID ${arUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .addField("Added At", message.createdAt)
      .addField("Role Added", `${arRole}`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let arChannel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
      if(!arChannel) return message.channel.send("Could not find server logs channel.");

      arChannel.send(embed);

      arUser.roles.add(arRole.id);

      message.channel.send(`Succeessfully added role for <@${arUser.id}> (**${arUser.user.username}/${arUser.displayName}**)!`);
    break;
    case "removerole":
      message.delete();

      var removeroleerrembed = new Discord.MessageEmbed()
      .setTitle("Removerole")
      .setDescription("Usage for reomverole:")
      .addField("`removerole <@someone> <@role>`", "Role(s) required: `@Lead Moderator`& `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don\'t have permission to do that.");
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
      .addField("Removed At", message.createdAt)
      .addField("Role Removed", `${rrRole}`)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let rrChannel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
      if(!rrChannel) return message.channel.send("Could not find server logs channel.");

      rrChannel.send(embed);

      rrUser.roles.remove(rrRole.id);

      message.channel.send(`Succeessfully removed role for <@${rrUser.id}> (**${rrUser.user.username}/${rrUser.displayName}**)!`)
    break;
    case "kick":
      message.delete();

      var kickerrembed = new Discord.MessageEmbed()
      .setTitle("Kick")
      .setDescription("Usage for kick:")
      .addField("`kick <@someone> <reason>`", "Role(s) required: `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send(kickerrembed);
     let kReason = args.slice(2).join(" ");
     if(!kReason) kReason = "not specified";
     if(!(message.member.roles.cache.has("629687079567360030") || message.member.roles.cache.has("629687079567360030") || message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don\'t have permission to do that!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That member can\'t be kicked!");
     
     var embed = new Discord.MessageEmbed()
     .setDescription("User Kicked")
     .setColor(0xff0000)
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> (**${kUser.user.username}**) with ID ${message.author.id}`)
     .addField("Kicked In", message.channel.toString())
     .addField("Time", message.createdAt)
     .addField("Reason", kReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

     let kick2Channel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!kick2Channel) return message.channel.send("Could not find server logs channel.");

     kUser.send(`You have been kicked from ${message.member.guild.name} for: ${kReason}.`).catch()

     kUser.kick(kReason);
     kick2Channel.send(embed);

     message.channel.send(`**${kUser.user.username}** (${kUser.id}) has been kicked for **${kReason}**.`)
    break;
    case "tempban":
      message.delete();

      var tempbanerrembed = new Discord.MessageEmbed()
      .setTitle("Tempban")
      .setDescription("Usage for tempban:")
      .addField("`tempban <@someone> <time> <reason>`", "Role(s) required: `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const tbUser = message.mentions.members.first();
     if(!tbUser) return message.channel.send(tempbanerrembed);
     let tbReason = args.slice(3).join(" ");
     if (!tbReason) tbReason = "not specified";
     if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("609236733464150037")))  return message.channel.send("You don\'t have permission to do that!");
     if(tbUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That member cannot be banned!");

     var tempbantime = args[2];

     var embed = new Discord.MessageEmbed()
     .setTitle("User Temporarily Banned")
     .setColor(0xff0000)
     .addField("Temporarily Banned User", `${tbUser} (**${tbUser.user.username}**) with ID ${tbUser.id}`)
     .addField("Temporarily Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Temporarily Banned In", message.channel)
     .addField("Temporarily Banned At", message.createdAt)
     .addField("Temporarily Banned For", `${ms(ms(tempbantime))}/${ms(tempbantime)}`)
     .addField("Temporarily Banned Reason", tbReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     var embed2 = new Discord.MessageEmbed()
     .setTitle("User Unbanned")
     .setColor(0x00ff00)
     .addField("User Unbanned", `${tbUser} (**${tbUser.user.username}**) with ID ${tbUser.id}`)
     .addField("Was Temporarily Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Was Temporarily Banned in", message.channel)
     .addField("Was Temporarily Banned at", message.createdAt)
     .addField("Reason of Temporary Ban", tbReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     let tempbanChannel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!tempbanChannel) return message.channel.send("Could not find server logs channel.");

     tbUser.send(`You have been temporarily banned from ${message.member.guild.name} for **${tbReason}**`)
     message.guild.members.ban(tbUser, { reason: `User temporarily banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${tbReason}` }, { time: ms(ms(tempbantime)) });
     tempbanChannel.send(embed);

     message.channel.send(`<@${tbUser.id}> has been temporarily banned for **${ms(ms(tempbantime))}** for **${tbReason}**.`)

     setTimeout(function() {
        message.guild.members.unban(tbUser.id);
        tempbanChannel.send(embed2);
     }, ms(tempbantime));
    break;
    case "ban":
      message.delete();

      var banerrembed = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setDescription("Usage for ban:")
      .addField("`ban <@someone> <reason>`", "Role(s) required: `@Moderator`, `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send(banerrembed);
     let bReason = args.slice(2).join(" ")
     if(!bReason) bReason = "not specified";
     if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("609236733464150037")))  return message.channel.send("You don\'t have permission to do that!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That member can\'t be banned!");

     var embed = new Discord.MessageEmbed()
     .setTitle("User Banned")
     .setColor(0xff0000)
     .addField("Banned User", `${bUser} (**${bUser.user.username}**) with ID ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Banned At", message.createdAt)
     .addField("Banned For", bReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

     let banChannel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!banChannel) return message.channel.send("Could not find server logs channel.");

     bUser.send(`You have been permanently banned from ${message.member.guild.name} for: ${bReason}`);
     message.guild.members.ban(bUser, {reason: `User banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${bReason}`});
     banChannel.send(embed);

     message.channel.send(`**${bUser.user.username}** has been banned for **${bReason}**.`)
    break;
    case "unban":
      message.delete();

      var unbanerrembed = new Discord.MessageEmbed()
      .setTitle("Unban")
      .setDescription("Usage for unban:")
      .addField("`unban <USER ID> <reason>`", "Role(s) required: `@Moderator`and `@Lead Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      const ubID = args[1];
      if(!ubID) return message.channel.send(unbanerrembed);
      if(!(message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don\'t have permission to do that!")

      var embed = new Discord.MessageEmbed()
      .setTitle("User Unbanned")
      .setColor(0xff0000)
      .addField("Unbanned User", `<@${ubID}> with ID ${ubID}`)
      .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Unbanned In", message.channel)
      .addField("Unbanned At", message.createdAt)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)])

      let unban2Channel = message.guild.channels.cache.find(channel => channel.name === "aot-logs");
      if(!unban2Channel) return message.channel.send("Could not find server logs channel.");

      message.guild.members.unban(ubID)
      unban2Channel.send(embed);

      message.channel.send(`<@${ubID}> was unbanned.`)
    break;
    case "update":
      if(!(message.member.roles.cache.has("609236733464150037") || message.member.roles.cache.has("736586013387784303"))) return message.channel.send("You don\'t have permission to do that!");

     var embed = new Discord.MessageEmbed()
     .setTitle("Activity Change")
     .setDescription("Successfully updated to Version 0.55.0!")
     .addField("Prefix", "?a \(Uncustomable\)")
     .addField("Public Commands", "`help` \(Will lead you to other help commands\), `salmon`, `apple`, `pie`, `candy`, `spam`, `8ball`, `door`, `coinflip`, `kill`, `hack`, `shutdown`, `rps`,  `botinfo`, `userinfo`, `serverinfo`, `welcome`")
     .addField("Admin Commands", "`kick`, `ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`, `addrole`, `removerole`, `lockdown`, `tellraw`, `slowmode`", true)
     .addField("New Commands", "`tellraw`, `slowmode`", true)
     .addField("Removed Commands", "`spam`", true)
     .addField("Updates", "Added 2 admin commands and removed the `spam` command.")
     .addField("Other Information from the Developer", "The bot will be soon updated to Discord.Js v13.X")
     .addField("Code is available at", "Base currently down")
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter("Aot Version 0.55.0, Made by cleverActon0126#0126")

     message.delete();
     message.channel.send(embed);
    break;
    case "mute":
      message.delete();

      var muteerrembed = new Discord.MessageEmbed()
      .setTitle("Mute")
      .setDescription("Usage for mute:")
      .addField("`mute <@someone> <reason>`", "Role(s) required: `@Trial Moderator` OR `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send(muteerrembed);
     if(!(message.member.roles.cache.has("629687079567360030") || message.member.roles.cache.has("609236733464150037") || message.member.roles.cache.has("645832781469057024")))  return message.channel.send("You don\'t have permission to do that!");
     if(mUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That member can\'t be muted!");
     let mReason = args.slice(2).join(" ")
     if(!mReason) mReason = "not specified";

     let muterole = mUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!muterole) return message.channel.send("Role doesn\'t exist");

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!muteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Member Muted")
     .setColor(0xff0000)
     .addField("Muted Member", `<@${mUser.id}>`)
     .addField("Duration", "Undefined")
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", mReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     muteChannel.send(embed);

     message.channel.send(`<@${mUser.id}> (**${mUser.user.username}**) has been muted.`);
    break;
    case "tempmute":
      message.delete();

      var unbanerrembed = new Discord.MessageEmbed()
      .setTitle("Unban")
      .setDescription("Usage for unban:")
      .addField("`unban <USER ID> <reason>`", "Role(s) required: `@Trial Moderator` OR `@Moderator` OR @Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const tmUser = message.mentions.members.first();
     if (!tmUser) return message.channel.send("User doesn\'t exist!");
     if(!(message.member.roles.cache.has("629687079567360030") || message.member.roles.cache.has("609236733464150037") || message.member.roles.cache.has("645832781469057024")))  return message.channel.send("You don\'t have permission to do that!");
     if(tmUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That member can\'t be muted!");
     let tmReason = args.slice(3).join(" ")
     if (!tmReason) tmReason = "not specified";

     let tempmuterole = tmUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!tempmuterole) return message.channel.send("Role doesn\'t exist");

     let mutetime = args[2];
     if(!mutetime){
       return message.channel.send("Please specify how long the member should be muted for.");
     }

     tmUser.roles.add(tempmuterole.id);

     message.channel.send(`<@${tmUser.id}> (**${tmUser.user.username}**) has been muted for **${mutetime}** for **${tmReason}**.`);

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!tempmuteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Member Temporarily Muted")
     .setColor(0xff0000)
     .addField("Temporarily Muted Member", `<@${tmUser.id}> (**${tmUser.user.username}**) with ID ${tmUser.id}`)
     .addField("Temporarily Muted For", `${ms(ms(mutetime))}/${ms(mutetime)}`)
     .addField("Temporarily Muted By", `<@${message.member.id}> with ID ${message.member.id}`)
     .addField("Temporarily Muted In", message.channel)
     .addField("Temporarily Muted Reason", tmReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     tempmuteChannel.send(embed)

     var embed2 = new Discord.MessageEmbed()
     .setTitle("Member Unmuted")
     .setColor(0xff0000)
     .addField("Was Temporarily Muted Member", `<@${tmUser.id}> (**${tmUser.user.username}**) with ID ${tmUser.id}`)
     .addField("Was Temporarily Muted For", `${ms(ms(mutetime))}/${ms(mutetime)}`)
     .addField("Was Temporarily Muted By", `<@${message.member.id}> with ID ${message.member.id}`)
     .addField("Was Temporarily Muted In", message.channel)
     .addField("Was Temporarily Muted Reason", tmReason)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)])
     tempmuteChannel.send(embed)

     setTimeout(function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(embed2)
     }, ms(mutetime));
    break;
    case "unmute":
      message.delete();

      var unmuteerrembed = new Discord.MessageEmbed()
      .setTitle("Unmute")
      .setDescription("Usage for unmute:")
      .addField("`unmute <@someone>`", "Role(s) required: `@Moderator` OR `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send(unmuteerrembed);
     if(!message.member.roles.cache.has("645832781469057024") || !message.member.roles.cache.has("609236733464150037"))  return message.channel.send("You don\'t have permission to do that!");

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!unmuterole) return message.channel.send("Role doesn\'t exist");

     umUser.roles.remove(unmuterole.id);

     var embed = new Discord.MessageEmbed()
     .setTitle("Member Unmuted")
     .addField("Unmuted Member", `<@${umUser.id}> (**${umUser.user.username}**) with ID ${tmUser.id}`)
     .addField("Unmuted By", message.author)
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     const unmute2Channel = umUser.guild.channels.cache.find(channel => channel.name === "aot-logs");
     if(!unmute2Channel) return;

     unmute2Channel.send(embed)
     message.channel.send(`<@${umUser.id}> (**${umUser.user.username}**) has been unmuted.`)
    break;
    case "clear":
      message.delete();

      var clearerrembed = new Discord.MessageEmbed()
      .setTitle("Clear")
      .setDescription("Usage for clear:")
      .addField("`clear <1-99>`", "Role(s) required: `@Moderator`, `@Acton`")
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

     if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("609236733464150037")))  return message.channel.send("You don\'t have permission to do that!");
     if(!args[1]) return message.channel.send(clearerrembed);
     let clearchannel = message.channel.id;
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:3000}));
     });
     let clearlog = message.guild.channels.cache.find(channel => channel.name === "aot-logs")
     if(!clearlog) return message.channel.send("Couldn't find server logs channel.")

     clearlog.send(`<@${message.member.id}> has purged **${args[1]}** messages in <#${clearchannel}>`)
    break;
    case "lockdown":
        message.delete();
        if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don't have permission to do that!");
        if(!args[1]) return message.channel.send("`?alockdown LOCK|UNLOCK SERVER|CHANNEL` Please include if I should lock or unlock the server."); 
        if(!args[2]) return message.channel.send("`?alockdown LOCK|UNLOCK SERVER|CHANNEL` Please include if I should lock or unlock the server.");
        let ldvalue = args[1].toLowerCase();
        let ldchannel = args[2].toLowerCase();
        if (!["lock", "unlock"].includes(ldvalue)) return message.channel.send("`?alockdown LOCK|UNLOCK SERVER|CHANNEL` Please include if I should lock or unlock the server.");
        if (!["server", "channel"].includes(ldchannel)) return message.channel.send("`?alockdown LOCK|UNLOCK SERVER|CHANNEL` Please include if I should lock or unlock the server or this specific channel")

        if(ldvalue == "lock") {
          if(ldchannel == "channel") {
            let ldc = message.channel

            ldc.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")

            message.channel.send("🔒This channel has been locked by a moderator.")

            var ldcembed = new Discord.MessageEmbed()
            .setTitle("Server Unlock")
            .addField("Lockdown Ended by", message.author)
            .addField("Lockdown Ended at", message.createdAt)
            .addField("Lockdown Ended in", message.channel)
            .addField("Unlock Type", "Server/**Channel**")
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

            var ldclog = message.guild.channels.cache.find(channel => channel.name == "aot-logs");
            if(!ldclog) return;

            ldclog.send(ldcembed);
          } else if (ldchannel == "server") {
            var lds1 = message.guild.channels.cache.find(channel => channel.name == "general-chat" && channel.type=="text")
            var lds2 = message.guild.channels.cache.find(channel => channel.name == "random-stuff" && channel.type=="text")
            var lds3 = message.guild.channels.cache.find(channel => channel.name == "counting" && channel.type=="text")
            var lds4 = message.guild.channels.cache.find(channel => channel.name == "politics" && channel.type=="text")
            var lds5 = message.guild.channels.cache.find(channel => channel.name == "anime" && channel.type=="text")
            var lds6 = message.guild.channels.cache.find(channel => channel.name == "arts" && channel.type=="text")
            var lds7 = message.guild.channels.cache.find(channel => channel.name == "gaming" && channel.type=="text")
            var lds8 = message.guild.channels.cache.find(channel => channel.name == "movie-tvshows" && channel.type=="text")
            var lds9 = message.guild.channels.cache.find(channel => channel.name == "music" && channel.type=="text")
            var lds10 = message.guild.channels.cache.find(channel => channel.name == "photography" && channel.type=="text")
            var lds11 = message.guild.channels.cache.find(channel => channel.name == "technology" && channel.type=="text")
            var lds12 = message.guild.channels.cache.find(channel => channel.name == "bot-commands" && channel.type=="text")

            if(!lds1) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 1.")
              return;
            } else if (!lds2) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 2.")
              return;
            } else if (!lds3) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 3.")
              return;
            } else if (!lds4) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 4.")
              return;
            } else if (!lds5) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 5.")
              return;
            } else if (!lds6) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 6.")
              return;
            } else if (!lds7) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 7.")
              return;
            } else if (!lds8) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 8.")
              return;
            } else if (!lds9) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 9.")
              return;
            } else if (!lds10) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 10.")
              return;
            } else if (!lds11) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 11.")
              return;
            } else if (!lds12) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 12.")
              return;
            };

            lds1.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds2.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds3.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds4.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds5.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds6.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds7.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds8.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds9.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds10.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds11.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")
            lds12.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                deny: ["SEND_MESSAGES"],
              },
            ], "Server Lockdown")

            message.channel.send("🔒Successfully locked all channels.")

            var ldsembed = new Discord.MessageEmbed()
            .setTitle("Server Lockdown")
            .addField("Lockdown Started by", message.author)
            .addField("Lockdown Started at", message.createdAt)
            .addField("Lockdown Started in", message.channel)
            .addField("Lockdown Type", "**Server**/Channel")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

            var ldslog = message.guild.channels.cache.find(channel => channel.name == "aot-logs");
            if(!ldslog) return;

            ldslog.send(ldsembed);
          } else {
            return message.channel.send("An error occured, please check the logs.")
          }
        } else if (ldvalue == "unlock") {
          if(ldchannel == "channel") {
            let uldc = message.channel

            uldc.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")

            message.channel.send("🔓This channel has been unlocked by a moderator.")

            var uldcembed = new Discord.MessageEmbed()
            .setTitle("Server Unlock")
            .addField("Lockdown Ended by", message.author)
            .addField("Lockdown Ended at", message.createdAt)
            .addField("Lockdown Ended in", message.channel)
            .addField("Unlock Type", "Server/**Channel**")
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

            var uldclog = message.guild.channels.cache.find(channel => channel.name == "aot-logs");
            if(!uldclog) return;

            uldclog.send(uldcembed);
          } else if (ldchannel == "server") {
            var ulds1 = message.guild.channels.cache.find(channel => channel.name == "general-chat" && channel.type=="text")
            var ulds2 = message.guild.channels.cache.find(channel => channel.name == "random-stuff" && channel.type=="text")
            var ulds3 = message.guild.channels.cache.find(channel => channel.name == "counting" && channel.type=="text")
            var ulds4 = message.guild.channels.cache.find(channel => channel.name == "politics" && channel.type=="text")
            var ulds5 = message.guild.channels.cache.find(channel => channel.name == "anime" && channel.type=="text")
            var ulds6 = message.guild.channels.cache.find(channel => channel.name == "arts" && channel.type=="text")
            var ulds7 = message.guild.channels.cache.find(channel => channel.name == "gaming" && channel.type=="text")
            var ulds8 = message.guild.channels.cache.find(channel => channel.name == "movie-tvshows" && channel.type=="text")
            var ulds9 = message.guild.channels.cache.find(channel => channel.name == "music" && channel.type=="text")
            var ulds10 = message.guild.channels.cache.find(channel => channel.name == "photography" && channel.type=="text")
            var ulds11 = message.guild.channels.cache.find(channel => channel.name == "technology" && channel.type=="text")
            var ulds12 = message.guild.channels.cache.find(channel => channel.name == "bot-commands" && channel.type=="text")

            if(!ulds1) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 1.")
              return;
            } else if (!ulds2) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 2.")
              return;
            } else if (!ulds3) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 3.")
              return;
            } else if (!ulds4) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 4.")
              return;
            } else if (!ulds5) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 5.")
              return;
            } else if (!ulds6) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 6.")
              return;
            } else if (!ulds7) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 7.")
              return;
            } else if (!ulds8) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 8.")
              return;
            } else if (!ulds9) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 9.")
              return;
            } else if (!ulds10) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 10.")
              return;
            } else if (!ulds11) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 11.")
              return;
            } else if (!ulds12) {
              message.channel.send("Missing channel(s), please check the logs.")
              console.log("Missing channel 12.")
              return;
            };

            ulds1.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds2.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds3.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds4.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds5.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds6.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds7.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds8.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds9.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds10.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds11.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")
            ulds12.overwritePermissions([
              {
                id: message.channel.guild.roles.everyone,
                allow: ["SEND_MESSAGES"],
              },
            ], "Server Unlock")

            message.channel.send("🔓Successfully unlocked all channels.")

            var uldsembed = new Discord.MessageEmbed()
            .setTitle("Server Unlock")
            .addField("Lockdown Ended by", message.author)
            .addField("Lockdown Ended at", message.createdAt)
            .addField("Lockdown Ended in", message.channel)
            .addField("Unlock Type", "**Server**/Channel")
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

            var uldslog = message.guild.channels.cache.find(channel => channel.name == "aot-logs");
            if(!uldslog) return;

            uldslog.send(uldsembed);
          } else {
            return message.channel.send("An error occured, please check the logs.")
          }
        } else {
          return message.channel.send("An error occured, please check the logs.")
        };
    break;
    case "tellraw":
      message.delete();
      if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("609236733464150037")))  return message.channel.send("You don\'t have permission to do that!");
      var twchannel = args[1].slice(2, twchannel.length - 1);
      if(!twchannel) return message.channel.send("Please tell me which channel to send to.")
      var twcontent = args.slice(2).join(" ");
      if(!twcontent) return message.channel.send("Please tell me what to say!");
      var twchannelr = message.guild.channels.cache.find(channel => channel.id == twchannel);
      if(!twchannelr) return message.channel.send("An error occured.")

      twchannelr.send(twcontent)
    break;
    case "slowmode":
      if(!(message.member.roles.cache.has("645832781469057024") || message.member.roles.cache.has("608937618259836930") || message.member.roles.cache.has("609236733464150037"))) return message.channel.send("You don't have permission to do that!");
      var smtime = args[1];

      message.channel.setRateLimitPerUser(smtime);
      message.channel.send(`Successfully appllied slowmode of **${smtime}** seconds.`)
    break;
    //end of admin Commands
    //information
    case "ping":
      var ping = Date.now() - message.createdTimestamp;
      var APIl = Math.round(bot.ws.ping);

      var embed = new Discord.MessageEmbed()
      .setTitle("Bot Ping")
      .addField("Ping", ping)
      .addField("API Latency", APIl)
      .setTimestamp()
      .setFooter(hmf[Math.floor(Math.random() * hmf.length)]);

      message.channel.send(embed);
    break;
    case "botinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("Bot Information")
     .setColor(0x00bfff)
     .addField("General Information", "Bot's general information", true)
     .addField("Bot Name", bot.user.username, true)
     .addField("Bot Created On:", bot.user.createdAt, true)
     .addField("Bot Creator", "<@428445352354643968>", true)
     .addField("Bot Developers", "N/A", true)
     .addField("Bot Contributers", "<@428445352354643968>: All Versions \r<@696010548378337321>: N/A")
     .setThumbnail(bot.user.displayAvatarURL())
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
     .addField("Server Nickname", snUser.displayName)
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
     .addField("Server Nickname", sUser.displayName)
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
     .addField("Users in server", message.guild.memberCount, true)
     .addField("Server Boost", "Server Boost Information")
     .addField("Server Boost Level", message.guild.premiumTier, true)
     .addField("Server Boosts Count", message.guild.premiumSubscriptionCount, true)
     .addField("Voice Channels", "Voice Channels Information")
     .addField("AFK Channel", message.guild.afkChannel, true)
     .addField("Voice Channel AFK Timeout", message.guild.afkTimeout, true)
     .setThumbnail(message.guild.iconURL())
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
       .addField("`salmon`", "Raw salmon or cooked salmon?", true)
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
          { name: "`kick <@someone> <reason>`", value: "Kick member ", inline: true },
          { name: "`ban <@someone> <reason>`", value: "Ban member", inline: true },
          { name: "`tempban <@someone> <reason>`", value: "Temporary ban member", inline: true },
          { name: "`mute <@someone> <reason>`", value: "Mute member", inline: true },
          { name: "`tempmute <@someone> <time> <reason>`", value: "Temporary mute member", inline: true },
          { name: "`unmute <@someone>`", value: "Unmute a muted member", inline: true },
          { name: "`addrole <@someone> <@role>`", value: "Add a role to a member", inline: true },
          { name: "`tempaddrole <@someone> <@role> <time>`", value: "Add a role to a member temporary", inline: true },
          { name: "`removerole <@someone> <@role>`", value: "Remove a role from a member", inline: true },
          { name: "`tempremoverole <@someone <@role> <time>`", value: "Remove a role from a member temporary", inline: true }
        )
        .addFields(
          { name: "Server Actions", value: "Do things to server, higher permissions required." },
          { name: "`lockdown <time> <reason>`", value: "Locks the server", inline: true },
          { name: "`unlock`", value: "Unlocks the server", inline: true },
          { name: "`clear <1-99>`", value: "Bulk delete messages", inline: true },
          { name: "`slowmode <time (no units)>`", value: "Sets a slowmode for the channel", inline: true}
        )
        .addField("`tellraw <#channel> <message>`", "Makes Aot say whatever you want it to say in any channel.")
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