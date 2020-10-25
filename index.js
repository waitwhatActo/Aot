const Discord = require("discord.js");
const ms = require("ms");
const randomPuppy = require("random-puppy");

const config = require('./config.json');

const bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Connected as Aot#0350 and using version 0.46.0");
  bot.user.setPresence({ activity: { name: "?ahelp" }, status: "online" })
});

bot.on("guildMemberAdd", function(member) {
  const inChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!inChannel) return;

  inChannel.send(`<@${member.id}>`)

  var inembed = new Discord.MessageEmbed()
  .setTitle("User Joined")
  .setColor(0x90EE90)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField("Who joined?", `<@${member.id}>`)
  .addField("Welcome!", `Hey, <@${member.user.id}> welcome to the server! You are the number ${inChannel.guild.memberCount} member! We hope you enjoy the server. Remember to read the rules, information will be provided in <#739800400361947176>. Enjoy!`)
  .setTimestamp()
  .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
  inChannel.send(inembed)

  member.send("Have a great time in Official Acton Fan Server!")
});

bot.on("guildMemberRemove", function(member) {
  const outChannel = member.guild.channels.cache.find(channel => channel.name === "in-n-out")
  if(!outChannel) return;

  var outembed = new Discord.MessageEmbed()
  .setTitle("User Left")
  .setColor(0xff0000)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField("Who left?", `<@${member.id}>`)
  .addField("Goodbye!", "We will never forget you!")
  .setTimestamp()
  .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
  outChannel.send(outembed)

  member.send(`You just left Official Acton Fan Server, but they would never forget you!`)
});

bot.on("error", function() {
  const ea = bot.guilds.channels.cache.find(channel => channel.id === "656409202448924700");
  ea.send("Bot is experiencing errors, please contact developer.")
  console.log(error);
});

bot.on("disconnect", function() {
  const da = bot.guilds.channels.cache.find(channel => channel.id === "656409202448924700");
  da.send("Bot is now disconnected, investigating problem.")
})

bot.on("message", async function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith("?a")) return;

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
        else if(collected.first().content == "cooked") message.channel.send("We just ran out of salmon. GO buy one and we will cook it for ya.")
        else if(collected.first().content == "cancel") message.channel.send("Operation cancelled")
        else if(collected.first().content == "raw") message.channel.send("Here\'s your invisible raw salmon.")
        else message.channel.send("That's not one of the option. If you wish to get that kind of salmon, please go to the other shop. We do NOT welcome you here.")
     });
    break;
    case "apple":
     message.channel.send("OK. Here\'s your golden apple. Here you go. Use your imagination to see the apple.");
     message.channel.send("🍎")
    break;
    case "pie":
     message.channel.send("OK. Here\'s your *pre-baked* pie. 🥧");
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
      var eballq = args.slice(1).join(" ");
      if(!eballq) return message.channel.send("Hmm, you didn't ask a question.")
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
 
     message.channel.send(`You question: ${eballq} \rThe fortune teller: ${eightball[Math.floor(Math.random() * eightball.length)]}`)
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
    case "ding":
     message.channel.send("IDK why I made this but: Dong.");
    break;
    case "beep":
     message.channel.send("IDK why I made this but: Boop.")
    break;
    case "kill":
     const iUser = message.mentions.members.first();

     var kill = [
      `${message.author} has been roasted to a a toast like a bread.`,
      `${message.author} accidentally stuck his head in the washing machine and got his head washed off.`,
      `${message.author}\'s beard got pulled off and he lost too much blood. He died. RIP.`,
      `${message.author} jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `${message.author} jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `${message.author} is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
      `${message.author} is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `${message.author} got a gun and didn"t know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `${message.author} was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `${message.author} wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     if(!iUser) message.channel.send(kill[Math.floor(Math.random() * kill.length)])

     var killer = [
      `<@${iUser.id}> has been roasted to a a toast like a bread.`,
      `<@${iUser.id}> accidentally stuck his head in the washing machine and got his head washed off.`,
      `<@${iUser.id}>\'s beard got pulled off and he lost too much blood. He died. RIP.`,
      `<@${iUser.id}> jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
      `<@${iUser.id}> jumped into a swimming pool, but he suddenly fotgot how to swim.`,
      `<@${iUser.id}> is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
      `<@${iUser.id}> is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
      `<@${iUser.id}> got a gun and didn"t know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
      `<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `<@${iUser.id}> wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     message.channel.send(killer[Math.floor(Math.random() * killer.length)])
    break;
    case "roast":
      const roUser = message.mentions.members.first();

      var roast = [
      `<@${message.author.id}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
      `<@${message.author.id}> YOU IDIOT NEED TO DIE!`,
      `<@${message.author.id}> ARE YOU AN IDIOT? PANALTY!`,
      `<@${message.author.id}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
      `<@${message.author.id}> WTF IS WRONG WITH YOU YOU MOTHER F***ER!`,
      `<@${message.author.id}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      if(!roUser) message.channel.send(roast[Math.floor(Math.random() * roast.length)])

      var roaster = [
        `<@${roUser.id}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
        `<@${roUser.id}> YOU IDIOT NEED TO DIE!`,
        `<@${roUser.id}> ARE YOU AN IDIOT? PANALTY!`,
        `<@${roUser.id}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
        `<@${roUser.id}> WTF IS WRONG WITH YOU YOU MOTHER F***ER!`,
        `<@${roUser.id}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      message.channel.send(roaster[Math.floor(Math.random() * roaster.length)])
    break;
    case "shutdown":
      const sdmUser = message.member;
      const sdUser = message.mentions.members.first();const { promisify } = require("util");
      var wait = require("util").promisify(setTimeout);
      if(!sdUser) return message.channel.send("Who to hack?");

        var msg = await message.channel.send(`Prepare to shutdown ${sdUser.id}\'s device.`)
      await wait(2500)
      await msg.edit("Starting process...")
      await wait(2500)
      await msg.edit(`Locating ${sdUser.id}"s device.`)
      await wait(10000)
      await msg.edit(`Found ${sdUser.id}"s location.`)
      await wait(3000)
      await msg.edit("Hacking IP address...")
      await wait(13000)
      await msg.edit("IP address found.")
      await wait(2500)
      await msg.edit(`Starting to shutdown ${sdUser.id}"s device`)
      await wait(5000)
      await msg.edit(`Failed to shutdown ${sdUser.id}"s device. Manual shutdown needed.`)
      var embed = new Discord.MessageEmbed()
      .setTitle("Remote Shutdown")
      .setDescription("Someone\'s trying to shudown someone\s device! Beware!")
      .setColor(0xc8e9ca)
      .addField("Who\'s remote shutting down people\' device?", `<@${sdmUser.id}>`)
      .addField("Who\'s being shutted down?", `<@${sdUser.id}>`)
      .addField(`${sdUser.id}"s IP`, "127.0.0.1")
      .addField("Windows 7/8/8.1/10", "Windows is easy to remote shutdown. If you\'re using Windows, follow the steps below.")
      .addField("Step 1", "Open Cmd in administrator.", true)
      .addField("Step 2", "Type `shutdown /i` then hit enter.", true)
      .addField("Step 3", "You will see a pop-up window, press add, then type the IP address writen above, hit add.", true)
      .addField("Step 4", "Choose if you want to shutdown or restart his computer.", true)
      .addField("Step 5", "Type in a message for him.", true)
      .addField("Step 6", "Hit ok.", true)
      .addField("Step 7", "Watch someone freak out.", true)
      .addField("Linux and MacOS", `We haven"t test out using Linux or MacOS, but you can use a virtual machine to shutdown <@${sdUser.id}>\'s device.`)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
      message.channel.send(embed)
    break;
    case "spam":
    const spUser = message.member;

    const spamChannel = message.member.guild.channels.cache.find(channel => channel.name === "spam")
    if(!spamChannel) return;

    message.channel.send(`To not go againest the rules, I did spam, but in the spam channel and spammed 1 whole message. You should be proud of me.`)

    spamChannel.send("spam spam")
    break;
    case "hack":
      const hsUser = message.member;
      const hUser = message.mentions.members.first();
      if(!hUser) return message.channel.send("Who to hack?")
      var wait = require("util").promisify(setTimeout);

      var msg = await message.channel.send(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\`\`\``)
      await wait(2500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\`\`\``)
      await wait(5000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\`\`\``)
      await wait(3000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\`\`\``)
      await wait(1500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\`\`\``)
      await wait(500)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(2000)
      await msg.edit(`\`\`\`Enourmoushard Closure [Version 0.46.0] \r(c) 2019 Enourmoushard Corporation. All rights reserved.\r \rC:\\Windows\\system32>cd C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks \rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>hacking.js\rPrepare to hack ${hUser.id}\'s device.\rBypassing Discord Login. (2FA don't exist.)\rAccuiring email and password.\rEmail found.\rCreating Tinder account using stolen informations.\rLogging into stolen Tinder account.\rFaking love.\rScamming money.\rCreating PayPal using stolen info.\rAccount created, scammed money transfered.\rUsing Paypal to access credit card info.\rCredit card number: #### #### #### ####, SVC:###\rFinishing up.\rAdding malware to their credit card and computer.\rActivating malware.\rProcess ended.\rThe very dangerous and real hacking process has been finished by a bot to prevent you from going to jail you NUM.\rC:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>cls\`\`\``)
      await wait(500)
      await msg.edit(`\`\`\`C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>\`\`\``)
      await wait(1000)
      await msg.edit(`\`\`\`C:\\Users\\${hsUser.user.username}\\Desktop\\Discord Hacks>exit\`\`\``)
      await wait(500)
      await msg.edit("\`\`\`You have exited the application, nothing to display here.\`\`\`")
    break;
    case "joke":
      var jokes = [
        "I invented a new word! Plagiarsm!",
        "Did you hear about the mathemactician who's afraid of negative numbers? \r He'll stop at nothing to avoid them.",
        "Why do we tell actors to \"break a leg?\" \r Because every play has a cast.",
        "Helvetica and Times New Roman walk into a bar. \r \"Get out of here!\"shouts the bartender. \"We don't server your type!\"",
        "Yesterday I saw a guy spill all his Scrabble letters on the road. \r I asked him, \"What's the word on the street?\"",
        "Knock knock! \r Who's there? \r Control freak. \r Con... \r Okay now you say, \"Control freak who?\"",
        "Hear about the new restaurant called Karma? \r There’s no menu: You get what you deserve.",
        "A woman in labor suddenly shouted, \"Shouldn't! Wouldn't! Couldn't! Didn't! Can't!\" \r \"Don't worry,\" said the doc.\"Those are just contractions.\"",
        "A bear walks into a bar and says, \"Give me a whiskey and... cola.\" \r \"Why the big pause?\" asks the bartender. The bear shrugged. \"I'm not sure; I was born with them.\"",
        "Did you hear about the actor who fell through the floorboards? \r He was just going through a stage.",
        "Did you hear about the claustrophobic astronaut? \r He just needed a little space.",
        "Why don't you scientists trust atoms? \r Because they make up everything",
        "Why did the chicken go to the séance? \r To get to the other side.",
        "Where are the things manufactured? \r The satisfactory.",
        "How do you drown a hipster? \r Throw him in the mainstream.",
        "What sits at the bottom of the sear and twitches? \r A nervous wreck.",
        "What does a nosy pepper do? \r Gets jalapeño business!",
        "How does Moses make tea? \r He brews.",
        "Why can't you explain puns to kleptomanicas? \r They always take things literally.",
        "How do you keep a bagel from getting away? \r Put lox on it.",
        "A men tells his doctor, \"Doc, help me. I'm addicted to Twitter!\" \r The doctor replies, \"Sorry, I don't follow you...\"",
        "What king of excercise do lazy people do? \r Diddly-squats.",
        "Why don't calculus majors throw house parties? \r Because you should never drink derive.",
        "What do you call a parade of rabbits hopping backwars? \r A receding hare-line.",
        "What does Charles Dickens keep in his spice rack? \r The best of the thymes, the worst of the thymes.",
        "What's the difference between a cat and a comma? \r A cat has claws at the end of paws; A comma is a pause at the end of a clause.",
        "Why should the number 288 never be mentioned? \r It's two gross.",
        "What did the Tin Man say when he got run over by a steamroller? \"Curses! Foil again!\"",
        "What did the bald man excalim when he received a comb for present? \r Thanks- I'll never part with it.",
        "What did the buddhist say to the hot dog vendor? \r Make me one everything.",
        "What did the left eye say to the right eye? \r Between you and me, something smells.",
        "What do you call a fake noodle? \r An impasta!",
        "How do you make a tissue dance? \r Put a little boogie in it.",
        "What did the 0 say to the 8? \r Nice belt!",
        "What do you call a pony with a cough? \r A little horse.",
        "What did the one hat say to the other? \r You wait here. I'll go on a head.",
        "What do you call a magic dog? \r A labracadabrador.",
        "What did the shark say when he ate the clownfish? \r This tastes a little funny.",
        "What's organge and sounds like a carrot? \r A parrot.",
        "Why can't you hear a pterodactyl go to the bathroom? \r Because the \"P\" is silent.",
        "What do you call a women with one leg? \r Eileen.",
        "What did the pirate say when he turned 80? \r Aye matey.",
        "Why did the frog take the bus to waork today? \r His car got toad away.",
        "What did the buffalo say when his son left for college? \r Bison.",
        "What is an astronaut's favourite part on a computer? \r The space bar.",
        "Why did the yogurt go the art exhibition? \r Because it was cultured.",
        "What do you call an apology written in dots and dashes?",
        "Why did the hipster burn his mouth? \r He drank the coffee before it was cool. ",
        "Once my dog ate the Scrabble tiles. \r He kept leaving little messages around the house.",
        "I told my wife she was drawing her eyebrows too high. \r She looked at me surprised.",
        "Did you hear about the two people who stole a calender? They each got six months.",
        "What’s Forest Gump’s password? \r 1Forest1.",
        "How do poets say hello? \r Hey, haven't we metaphor?",
        "Where does Batman go to the bathroom? \r The batroom",
        "Why did the Oreo go to the dentist? \r Because he lost his filling.",
        "What do you get from a pampered cow? \r Spoiled milk",
        "Why is it annoying to eat next to basketball players? \r They dribble all the time.",
        "What breed of dog can jump higher than buildings? \r Any dog, because buildings can’t jump",
        "How many times can you subtract 10 from 100? \r Once. The next time you would be subtracting from 90.",
        "Why did the M&M go to school? \r It wanted to be a Smartie",
        "Why do bees have sticky hair? \r Because they use honneycombs.",
        "How does a rabbi make his coffee? \r Hebrews it",
        "I got my daughter a fridge for her birthday. \r  I can't wait to see her face light up when she opens it.",
        "I poured root beer in a square glass. \r Now I just have beer.",
        "How many divorced man does it take to change the lightbulbs? \r Who cares? The neverget the house anyways.",
        "What do the films The Sixth Sense and Titanic have in common? \r Icy dead people.",
        "How many photographers does it take to change a lightbulb? \r Just one more, just one more...",
        "What did the blanket say to the bed? \r \"I've got you covered.\"",
        "What did the hamburger name his daughter? \r \"Patty.\"",
        "What do you call a computer that sings? \r \"A-dell\"",
        "Why did the picture go to jail? \r He got framed.",
        "What did the baby corn say to the mama corn? \r \"Where is popcorn?\"",
        "How does Moses make his tea? \r \"Hebrews it.\"",
        "What's the difference between a hippo and a zippo? \r One is really heavy, and the other is a little lighter.",
        "What's ET short for? \r \"He's only got little legs.\"",
        "What's loud and sounds like an apple? \r \"An apple.\"",
        "What do you call a black man flying a plane? \r \"A pilot, you racist.\"",
        "What's the difference between in-laws and outlaws? \r Outlaws are wanted.",
        "Why did the banker quit his job? \r \"He lost interest!\""
      ];

      message.channel.send(`<@${message.member.id}> here's your joke: \r` + jokes[Math.floor(Math.random() * jokes.length)])
    break;
    case "meme":
      const memeSource = [
        "dankmeme", 
        "meme", 
        "memes"
      ];
      const memeRandomizer = memeSource[Math.floor(Math.random() * memeSource.length)];
      const memeImage = await randomPuppy(memeRandomizer);
      
      var embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(memeImage)
      .setTitle("Here's your meme mom.")
      .setURL(`https://reddit.com/r/${memeRandomizer}`)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      message.channel.send(embed)
    break;
    case "rps":
      const rpspUser = message.mentions.members.first();
      const rpsUser = message.member.id;

      var rpswp = [
        `<@${rpsUser}> You have chosen *ROCK*!\r ${rpspUser} You have chosen *SCISSORS*! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen *SCISSORS*!\r ${rpspUser} You have chosen *ROCK*! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen *PAPER*!\r ${rpspUser} You have chosen *SCISSORS*! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen *SCISSORS*!\r ${rpspUser} You have chosen *PAPER*! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen *ROCK*!\r ${rpspUser} You have chosen *PAPER*! \r ${rpspUser} **YOU WON!**`,
        `<@${rpsUser}> You have chosen *PAPER*!\r ${rpspUser} You have chosen *ROCK*! \r <@${rpsUser}> **YOU WON!**`
      ];

      var rpswb = [
        `<@${rpsUser}> You have chosen *ROCK*!\r  The bot have have chosen *SCISSORS*! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen *SCISSORS*!\r The bot have chosen *ROCK*! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen *PAPER*!\r The bot have chosen *SCISSORS*! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen *SCISSORS*!\r The bot have chosen *PAPER*! \r <@${rpsUser}> **YOU WON!**`,
        `<@${rpsUser}> You have chosen *ROCK*!\r The bot have chosen *PAPER*! \r **THE BOT WON!**`,
        `<@${rpsUser}> You have chosen *PAPER*!\r The bot have chosen *ROCK*! \r <@${rpsUser}> **YOU WON!**`
      ];

      if(!args[1]) {
        let bwait = require("util").promisify(setTimeout)
        var bmsg = await message.channel.send("**Please wait 10 seconds to proceed.**  \rYou have chosen to play \"Rock-Paper-Scisors\" with the bot. The proccess is automatic and generated by the bot. \r*DDos is provided by RoadFlare*")
        await bwait(10000)
        bmsg.edit(rpswb[Math.floor(Math.random() * rpswb.length)])
      } else {  
        let wait = require("uitl").promisfy(setTimeout)
        var hmsg = await message.channel.send("**Please wait 10 seconds to proceed.**  \rYou have chosen to play \"Rock-Paper-Scisors\" with the bot. The proccess is automatic and generated by the bot. \r*DDos is provided by RoadFlare*")
        await wait(10000)
        hmsg.edit(rpswp[Math.floor(Math.random() * rpswp.length)])
      };
    break;
    //end of fun commands
    //utilities
    case "report":
     const rUser = message.mentions.members.first();
     if(!rUser) return message.channel.send("Could not find user.")
     let rReason = args.slice(2).join(" ")
     if(!rReason) return message.channel.send("Why do you want to report that person if you don't have a reason?");

     var embed = new Discord.MessageEmbed()
     .setTitle("User reports User")
     .setColor(0xff0000)
     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", rReason)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

     let reportsChannel = message.guild.channels.cache.find(channel => channel.name === "report-approval");
     if(!reportsChannel) return message.channel.send("Could not find report channel.");

     message.delete().catch(()=> {});
     reportsChannel.send(embed);
     message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false});
     message.channel.send("The channel has been locked due to a incident. It will be unlocked once a staff came and investigate what happened.")
    break;
    case "bugreport":
      const brUser = message.author;
      let brReason = args.slice(2).join(" ")
      if(!brReason) return message.channel.send("If you can't report a bug then don't abuse this command!");

      var embed = new Discord.MessageEmbed()
      .setTitle("Bug Reported")
      .addField("Bug reported by", `<@${brUser.id}>`)
      .addField("The bug is", brReason)
      .setColor(0xff0000)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let bugreportChannel = message.guild.channels.cache.find(channel => channel.name === "report-approval");
      if(!bugreportChannel) return message.channel.send("Could not find report channel.");

      message.delete().catch(()=> {});
      reportsChannel.send(embed);
      message.channel.send("The developers has received your bug report. Thank you!");
    break;
    case "time":
      var today = new Date();
      var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      message.channel.send(`Today is ${date}, the time now in UTC is ${time}.`)
    break;
    case "ping":
      message.channel.send("🏓Pinging...").then(m => {
       var ping = m.createdTimestamp - message.createdTimestamp;
       var botping = bot.ws.ping;
 
       var embed = new Discord.MessageEmbed()
       .setTitle("Bot Ping")
       .setDescription("Ping is the bot's latency, or response speed. It may vary if people are spamming commands or bot is in a high traffic.")
       .addField("🤖⏲", ping)
       .addField("🏦⏲", botping)
      });
     break;
    case "remind":
      const rargs = args.slice(2).join(" ");
      if (!rargs) return message.channel.send("You didn't tell me what to remind you")
      var rTime = args[1];
      if (!rTime) return message.channel.send("Invalid time.")

      message.channel.send(`Ok. I will ping and remind you in ${rTime}.`);

      var embed = new Discord.MessageEmbed()
      .setTitle("Reminder")
      .setAuthor(message.member.tag, message.member.displayAvatarURL())
      .addField("I want to remind you:", rargs)

      setTimeout(function() {
        message.channel.send(`Hey, <@${message.member.id}>.`)
        message.channel.send(embed)
      }, rTime)
    break;
    //end of utilities
    //admin commands
    case "op":
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Abuse.");
      let opUser = message.mentions.members.first();
      if(!opUser) return message.channel.send("Who to op?");
      let oprole = message.guild.roles.cache.find(role => role.name === "OP");
      if(!oprole) return message.channel.send("How do I OP people if there is no such role?");
      let opFindRole1 = message.guild.roles.cache.find(role => role.name === "Head Admin")
      let opFindRole2 = message.guild.roles.cache.find(role => role.name === "Admin")
      let opFindRole3 = message.guild.roles.cache.find(role => role.name === "Officer")

      if (opUser.roles.cache.has(opFindRole1)) return message.channel.send("They are already op-ped. What do you want?")
      else if (opUser.roles.cache.has(opFindRole2)) return message.channel.send("They are already op-ped. What do you want?")
      else if (opUser.roles.cache.has(opFindRole3)) return message.channel.send("They are already op-ped. What do you want?")
      else opUser.roles.add(oprole)
      message.channel.send("User op-ped. You're demoted.");

      let oplog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
      let oplog2 = message.guild.channels.cache.find(channel => channel.name === "logs")
      oplog.send(`<@${opUser.id}> has been op-ped`)
      oplog2.send(`<@${opUser.id}> has been op-ped`)
    break;
    case "deop":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Don't you think you're little over the limit?");
      let deopUser = message.mentions.members.first();
      let deoprole = message.guild.roles.cache.find(role => role.name === "OP");
      if(!deopUser) return message.channel.send("I don't think anyone is gonna be de-oped at this rate.");
      else if(!deopUser.roles.has(deoprole.id)) return message.channel.send("Can you take this seriously?")
      else (deopUser.roles.remove(deoprole)) 
      message.channel.send("De-oped user. You're promoted.")

      let deoplog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
      let deoplog2 = message.guild.channels.cache.find(channel => channel.name === "logs")
      deoplog.send(`<@${deopUser.id}> has been deop-ped`)
      deoplog2.send(`<@${deopUser.id}> has been deop-ped`)
    break;
    case "tempop":
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Abuse.");
      let topUser = message.mentions.members.first();
      if(!topUser) return message.channel.send("Who to op?");
      let toprole = message.guild.roles.cache.find(role => role.name === "OP");
      if(!toprole) return message.channel.send("How do I OP people if there is no such role?");
      let topFindRole1 = message.guild.roles.cache.find(role => role.name === "Head Admin")
      let topFindRole2 = message.guild.roles.cache.find(role => role.name === "Admin")
      let topFindRole3 = message.guild.roles.cache.find(role => role.name === "Officer")

      let toptime = args[2]

      if (topUser.roles.cache.has(topFindRole1)) return message.channel.send("They are already op-ped. What do you want?")
      else if (topUser.roles.cache.has(topFindRole2)) return message.channel.send("They are already op-ped. What do you want?")
      else if (topUser.roles.cache.has(topFindRole3)) return message.channel.send("They are already op-ped. What do you want?")
      else topUser.roles.add(toprole)
      message.channel.send("User op-ped. You're demoted.");

      let toplog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
      let toplog2 = message.guild.channels.cache.find(channel => channel.name === "logs")
      toplog.send(`<@${topUser.id}> has been op-ped`)
      toplog2.send(`<@${topUser.id}> has been op-ped`)

      setTimeout(function() {
        topUser.roles.remove(toprole.id);
        message.channel.send(`De-oped <@${topUser.id}>`)
        toplog.send(`<@${topUser.id}> has been deop-ped`)
        toplog2.send(`<@${topUser.id}> has been deop-ped`)
      },ms(toptime))
    break;
    case "addrole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let arUser = message.mentions.members.first();
      if(!arUser) return message.channel.send("User doesn\'t exist!");
      let arRole = message.mentions.roles.first();
      if(!arRole) return message.channel.send("Role?");

       var embed = new Discord.MessageEmbed()
      .setDescription("Role Added to User")
      .setColor(0xff0000)
      .addField("Role Added User", `${arUser} with ID ${arUser.id}`)
      .addField("Added By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Added In", message.channel)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let arChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!arChannel) return message.channel.send("Could not find server logs channel.");

      arChannel.send(embed);

      arUser.roles.add(arRole.id);

      message.channel.send(`Role added for <@${arUser.id}>`)
    break;
    case "tempaddrole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let tarUser = message.mentions.members.first();
      if(!tarUser) return message.channel.send("User doesn\'t exist!");
      let tarRole = message.mentions.roles.first();
      if(!tarRole) return message.channel.send("Role?");

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
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let tarChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!tarChannel) return message.channel.send("Could not find server logs channel.");

      tarChannel.send(embed);

      message.channel.send(`Role added for <@${tarUser.id}> for ${tartime}`)

      setTimeout(function() {
        tarUser.roles.remove(tarRole.id);
        message.channel.send(`Role removed for <@${tarUser.id}>`)
      },ms(tartime))
    break;
    case "removerole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let rrUser = message.mentions.members.first();
      if(!rrUser) return message.channel.send("User doesn\'t exist!");
      let rrRole = message.mentions.roles.first();
      if(!rrRole) return message.channel.send("Role?");

      var embed = new Discord.MessageEmbed()
      .setDescription("Role Removed from User")
      .setColor(0xff0000)
      .addField("Role Removed User", `${rrUser} with ID ${rrUser.id}`)
      .addField("Removed By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Removed In", message.channel)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let rrChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!rrChannel) return message.channel.send("Could not find server logs channel.");

      rrChannel.send(embed);

      rrUser.roles.remove(rrRole.id);

      message.channel.send(`Role removed for <@${rrUser.id}>`)
    break;
    case "tempremoverole":
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to do that.");
      let trrUser = message.mentions.members.first();
      if(!trrUser) return message.channel.send("User doesn\'t exist!");
      let trrRole = message.mentions.roles.first();
      if(!trrRole) return message.channel.send("Role?");

      let trrtime = args[3];

      trrUser.roles.remove(trrRole.id);

      var embed = new Discord.MessageEmbed()
      .setDescription("Role temporily Removed from User")
      .setColor(0xff0000)
      .addField("Role Removed User", `${trrUser} with ID ${trrUser.id}`)
      .addField("Removed By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Removed In", message.channel)
      .addField("Duration", trrtime)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let trrChannel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!trrChannel) return message.channel.send("Could not find server logs channel.");

      trrChannel.send(embed);

      message.channel.send(`Role removed for <@${trrUser.id}> for ${trrtime}`)

      setTimeout(function() {
        trrUser.roles.add(trrRole.id);
        message.channel.send(`Role added for <@${trrUser.id}>`)
      },ms(trrtime))
    break;
    case "kick":
     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send("User doesn\'t exist!");
     let kReason = args.slice(2).join(" ")
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don\'t have permission to do that!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can\'t be kicked!");

     var embed = new Discord.MessageEmbed()
     .setDescription("User Kicked")
     .setColor(0xff0000)
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

     let kickChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!kickChannel) return message.channel.send("Could not find server logs channel.");
     let kick2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!kick2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.
     kickChannel.send(embed);
     kick2Channel.send(embed);

     message.channel.send(`<@${kUser.id}> has been kicked.`)

     kUser.send(`You have been kicked from Acton"s Official Empire. Reason: ${kReason}.`)
    break;
    case "tempban":
     const tbUser = message.mentions.members.first()
     if(!tbUser) return message.channel.send("User doesn\'t exist!")
     let tbReason = args.slice(3).join(" ")
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

     let tempbanChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!tempbanChannel) return message.channel.send("Could not find server logs channel.");
     let tempban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempban2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.members.ban(bUser, { reason: `User banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${bReason}` }, { time: tempbantime });
     tempbanChannel.send(embed);
     tempban2Channel.send(embed);

     message.channel.send(`<@${tbUser.id}> has been temp banned for ${tempbantime}.`)
    break;
    case "ban":
     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send("User doesn\'t exist!");
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

     let banChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
     if(!banChannel) return message.channel.send("Could not find server logs channel.");
     let ban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!ban2Channel) return message.channel.send("Could not find server logs channel.");

     message.guild.members.ban(bUser, {reason: `User banned by Aot, Ban mod: ${message.author.tag}, Ban Reason: ${bReason}`});
     banChannel.send(embed);
     ban2Channel.send(embed);

     message.channel.send(`<@${bUser.id}> has been banned.`)

     bUser.send(`You have been banned from Acton"s Official Empire. Duration: *Infinity*; Reason: ${bReason}`)
    break;
    case "unban":
      const ubID = args[1];
      if(!ubID) return message.channel.send("Who to unban?");
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don\'t have permission to do that!")

      var embed = new Discord.MessageEmbed()
      .setTitle("User Unbanned")
      .setColor(0xff0000)
      .addField("Unbanned User", `<@${ubID}> with ID ${ubID}`)
      .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Unbanned In", message.channel)
      .addField("Time", message.createdAt)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      let unbanChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
      if(!unbanChannel) return message.channel.send("Could not find server logs channel.");
      let unban2Channel = message.guild.channels.cache.find(channel => channel.name === "server-logs");
      if(!unban2Channel) return message.channel.send("Could not find server logs channel.");

      message.guild.members.unban(ubID)
      unbanChannel.send(embed);
      unban2Channel.send(embed);
    break;
    case "update":
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don\'t have permission to do that!");

     var embed = new Discord.MessageEmbed()
     .setTitle("Code and Bug Fix Update")
     .setDescription("Successfully updated to Version 0.46.0!")
     .addField("Prefix", "?a \(Uncustomable\)")
     .addField("Public Commands", "`help` \(Will lead you to other help commands\), `salmon`, `apple`, `pie`, `candy`, `spam`, `8ball`, `ding`, `ping`, `beep`, `door`, `coinflip`, `kill`, `roast`, `hack`, `shutdown`, `joke`, `rps`, `report`, `bugreport`, `time`, `botinfo`, `userinfo`, `serverinfo`, `contactinfo`")
     .addField("Admin Commands", "`kick`, `ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`, `addrole`, `tempaddrole`, `removerole`, `tempremoverole`, `lockdown`, `unlock`", true)
     .addField("New Commands", "`contactinfo``", true)
     .addField("Removed Commands", "`aot`, `hello`, `bye`, `noticeme`", true)
     .addField("Updates", "Code and Bug Fix Update: The amount of things fixed in this update is enormous, it will be listed below: \r 1. Fixed `kick`, `ban` and `tempban` command for admins. \r 2. Removed `helpgeneral` \r 3. Removed `hello`, `aot`, `noticeme`, `bye` \r 4. Defined `ping` as `helputilities` \r 5. Added `contactinfo`")
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

     message.delete().catch(()=> {});
     message.channel.send(embed);
    break;
    case "mute":
     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(mUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can\'t be muted!");
     let mReason = args.slice(2).join(" ")

     let muterole = mUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!muterole) return message.channel.send("Role doesn\'t exist");

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!muteChannel) return;
     const mute2Channel = mUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!mute2Channel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${mUser.id}>`)
     .addField("Duration", "Infinity")
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", mReason)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     muteChannel.send(embed)
     mute2Channel.send(embed)
    break;
    case "tempmute":
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

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!tempmuteChannel) return;
     const tempmute2Channel = tmUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!tempmute2Channel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle("Person Muted")
     .setColor(0xff0000)
     .addField("Muted Person", `<@${tmUser.id}>`)
     .addField("Duration", `${ms(ms(mutetime))}`)
     .addField("Responsible Admin", `<@${message.member.id}>`)
     .addField("Reason", `${tmReason}`)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     tempmuteChannel.send(embed)
     tempmute2Channel.send(embed)

     setTimeout(function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(`<@${tmUser.id}> has been unmuted!`)
       tempmute2Channel.send(`<@${tmUser.id}> has been unmuted!`)
     }, ms(mutetime));
    break;
    case "unmute":
     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send("User doesn\'t exist!");
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === "Muted");
     if (!unmuterole) return message.channel.send("Role doesn\'t exist");

     umUser.roles.remove(unmuterole.id);

     const unmuteChannel = umUser.guild.channels.cache.find(channel => channel.name === "logs");
     if(!unmuteChannel) return;
     const unmute2Channel = umUser.guild.channels.cache.find(channel => channel.name === "server-logs");
     if(!unmute2Channel) return;

     unmuteChannel.send(`<@${umUser.id}> has now been unmuted.`);
     unmute2Channel.send(`<@${umUser.id}> has now been unmuted.`)
    break;
    case "clear":
     if(!message.member.hasPermission("VIEW_AUDIT_LOG"))  return message.channel.send("You don\'t have permission to do that!");
     if(!args[1]) return message.channel.send("How many?");
     let clearchannel = message.channel.id;
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:3000}));
     });
     let clearlog = message.guild.channels.cache.find(channel => channel.name === "server-logs")
     if(!clearlog) return message.channel.send("Couldn't find server logs channel.")
     let clear2log = message.guild.channels.cache.find(channel => channel.name === "logs")
     if(!clear2log) return message.channel.send("Couldn't find server logs channel.")

     clearlog.send(`<@${message.member.id}> has deleted ${args[1]} in <#${clearchannel}>`)
     clear2log.send(`<@${message.member.id}> has deleted ${args[1]} in <#${clearchannel}>`)
    break;
    case "quit":
      qUser = message.member;
      let viprole = qUser.guild.roles.cache.find(role => role.name === "VIP");
      if (!viprole) return message.channel.send("Role doesn\'t exist");

      if(args[1] === "o") {
        let officerrole = qUser.guild.roles.cache.find(role => role.name === "Officer");
        if (!officerrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(officerrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === "a") {
        let adminrole = qUser.guild.roles.cache.find(role => role.name === "Admin");
        if (!adminrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(adminrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === "ha") {
        let headadminrole = qUser.guild.roles.cache.find(role => role.name === "Head Admin");
        if (!headadminrole) return message.channel.send("Role doesn\'t exist");

        qUser.roles.remove(headadminrole.id)
        qUser.roles.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send("Thank you for serving us. Bye!").then(msg => msg.delete({timeout:5000}));
      } else {
        message.channel.send("You don\'t have permission to quit your job since you don't even have a job.")
      }
    break;
    case "lockdown":
      message.delete().catch(()=> {});
      var lUser = message.member;
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`<@${lUser.id}>, hmm, I wonder where is your permission to do that?`);

      var ldr = args.slice(2).join(" ");
      if(!args[1]) return message.channel.send("There is no time provided.");
      if(!args[2]) return message.channel.send("There is no reason provided.");

      var lac = message.guild.channels.cache.find(channel => channel.name === "announcements");
      if(!lac) return message.channel.send("No announce channel!");

      var lc1 = message.guild.channels.cache.find(channel => channel.name === "general");
      var lc2 = message.guild.channels.cache.find(channel => channel.name === "counting");
      var lc3 = message.guild.channels.cache.find(channel => channel.name === "spam");
      var lc4 = message.guild.channels.cache.find(channel => channel.name === "bot-commands");
      var lc5 = message.guild.channels.cache.find(channel => channel.name === "dank-memer-special");
      var lc6 = message.guild.channels.cache.find(channel => channel.name === "rythm-songs");
      var lc7 = message.guild.channels.cache.find(channel => channel.name === "Event" && channel.type === "category");
      var lc8 = message.guild.channels.cache.find(channel => channel.name === "VC 1" && channel.type === "voice");
      var lc9 = message.guild.channels.cache.find(channel => channel.name === "Rythm VC 1 (96kbps)" && channel.type === "voice");
      if(!lc1) return message.channel.send("Not enough channel. :P");
      if(!lc2) return message.channel.send("Not enough channel. :P");
      if(!lc3) return message.channel.send("Not enough channel. :P");
      if(!lc4) return message.channel.send("Not enough channel. :P");
      if(!lc5) return message.channel.send("Not enough channel. :P");
      if(!lc6) return message.channel.send("Not enough channel. :P");
      if(!lc7) return message.channel.send("Not enough channel. :P");
      if(!lc8) return message.channel.send("Not enough channel. :P");
      if(!lc9) return message.channel.send("Not enough channel. :P");
      
      lc1.updateOverwrite(lc1.guild.roles.everyone, { SEND_MESSAGES: false });
      lc2.updateOverwrite(lc2.guild.roles.everyone, { SEND_MESSAGES: false });
      lc3.updateOverwrite(lc3.guild.roles.everyone, { SEND_MESSAGES: false });
      lc4.updateOverwrite(lc4.guild.roles.everyone, { SEND_MESSAGES: false });
      lc5.updateOverwrite(lc5.guild.roles.everyone, { SEND_MESSAGES: false });
      lc6.updateOverwrite(lc6.guild.roles.everyone, { SEND_MESSAGES: false });
      lc7.updateOverwrite(lc7.guild.roles.everyone, { SEND_MESSAGES: false });
      lc8.updateOverwrite(lc8.guild.roles.everyone, { CONNECT: false });
      lc9.updateOverwrite(lc9.guild.roles.everyone, { CONNECT: false });

      var embed = new Discord.MessageEmbed()
      .setTitle("🔒Server Lockdown🔒")
      .setColor(0xff0000)
      .addField("Server Lockdown", `The server has been locked by a server moderator or an admin. The estimated time will be ${args[1]}.  The reason of locking down is ${ldr}. All channels are now disabled. Please be patient and do not spam DM a moderator or admin. This bot WILL NOT do automatic unlock.`)
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      lac.send(embed)
      lc1.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
      lc2.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
      lc3.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
      lc4.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
      lc5.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
      lc6.send("🔴Server lockdown. Please check announcement channel for updates.🔴")
    break;
    case "unlock":
      message.delete().catch(()=> {});

      var ulUser = message.member;
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`<@${ulUser.id}>, hmm, I wonder where is your permission to do that?`);

      var uac = message.guild.channels.cache.find(channel => channel.name === "announcements");
      if(!uac) return message.channel.send("No announce channel!");

      var uc1 = message.guild.channels.cache.find(channel => channel.name === "general");
      var uc2 = message.guild.channels.cache.find(channel => channel.name === "counting");
      var uc3 = message.guild.channels.cache.find(channel => channel.name === "spam");
      var uc4 = message.guild.channels.cache.find(channel => channel.name === "bot-commands");
      var uc5 = message.guild.channels.cache.find(channel => channel.name === "dank-memer-special");
      var uc6 = message.guild.channels.cache.find(channel => channel.name === "rythm-songs");
      var uc7 = message.guild.channels.cache.find(channel => channel.name === "Event" && channel.type === "category");
      var uc8 = message.guild.channels.cache.find(channel => channel.name === "VC 1" && channel.type === "voice");
      var uc9 = message.guild.channels.cache.find(channel => channel.name === "Rythm VC 1 (96kbps)" && channel.type === "voice");
      if(!uc1) return message.channel.send("Not enough channel. :P");
      if(!uc2) return message.channel.send("Not enough channel. :P");
      if(!uc3) return message.channel.send("Not enough channel. :P");
      if(!uc4) return message.channel.send("Not enough channel. :P");
      if(!uc5) return message.channel.send("Not enough channel. :P");
      if(!uc6) return message.channel.send("Not enough channel. :P");
      if(!uc7) return message.channel.send("Not enough channel. :P");
      if(!uc8) return message.channel.send("Not enough channel. :P");
      if(!uc9) return message.channel.send("Not enough channel. :P");
      
      uc1.updateOverwrite(uc1.guild.roles.everyone, { SEND_MESSAGES: true });
      uc2.updateOverwrite(uc2.guild.roles.everyone, { SEND_MESSAGES: true });
      uc3.updateOverwrite(uc3.guild.roles.everyone, { SEND_MESSAGES: true });
      uc4.updateOverwrite(uc4.guild.roles.everyone, { SEND_MESSAGES: true });
      uc5.updateOverwrite(uc5.guild.roles.everyone, { SEND_MESSAGES: true });
      uc6.updateOverwrite(uc6.guild.roles.everyone, { SEND_MESSAGES: true });
      uc7.updateOverwrite(uc7.guild.roles.everyone, { SEND_MESSAGES: true });
      uc8.updateOverwrite(uc8.guild.roles.everyone, { CONNECT: true });
      uc9.updateOverwrite(uc9.guild.roles.everyone, { CONNECT: true });

      var embed = new Discord.MessageEmbed()
      .setTitle("🔓Server Unlock🔓")
      .setColor(0x008000)
      .addField("Server Unlock", "The server has been unlocked by a server moderator or an admin. All channels are now available.")
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")

      uac.send(embed)
      uc1.send("🟢Server unlocked.🟢")
      uc2.send("🟢Server unlocked.🟢")
      uc3.send("🟢Server unlocked.🟢")
      uc4.send("🟢Server unlocked.🟢")
      uc5.send("🟢Server unlocked.🟢")
      uc6.send("🟢Server unlocked.🟢")
      uc2.bulkDelete(2)
    break;
    case "quickunlock":
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You don't have permission to that.")
      const qulac = message.guild.channels.cache.find(channel => channel.name === "announcements");

      var embed = new Discord.MessageEmbed()
      .setTitle("🔓Server Unlock🔓")
      .setColor(0x008000)
      .addField("Server Unlock", "The server will be unlocked in a short period. Please be patient and don't DM any staff members or related person. DMing the people mentioned above may result a mute, kick or ban.")
      .setTimestamp()
      .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
      qulac.send(embed)
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
     .addField("Bot Creator", "cleverActon0126#3517", true)
     .addField("Bot Developers", "Fire4Life, xxgamerxx200014", true)
     .addField("Bot Contributers", "Acton: All Versions \rFire4Life: N/A \rxxgamerxx200014: N/A")
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
     break;
    case "contactinfo":
      var embed = new Discord.MessageEmbed()
      .setTitle("Contact Information")
      .setDescription("This embed shows the information to contact the developers")
      .addField("Creator:", "Acton", true)
      .addField("Creator Contact Information:", "`cleverActon0126#3517`", true)
      .addField("Creator can be Contacted via other ways", "`False`", true)
      .addField("Developer(s)", "Fire4Life, xxgamerxx200014", true)
      .addField("Developer(s) Contact Information", "Fire4Life: None \rxxgamerxx200014: None", true)
      .addField("Developer(s) can be Contacted via other ways", "Fire4Life: `false` \rxxgamerxx200014:`false`",true)
    break;
    //end of Information
    //help menus
    case "help":
     var hembed = new Discord.MessageEmbed()
     .setTitle("❓Help Menu❓")
     .addField("🍴Food Menu🍴", "`helpfood`", true)
     .addField("😀Fun Menu😀", "`helpfun`", true)
     .addField("❓Info Menu❓", "`helpinfo`", true)
     .addField("🏳️‍🌈Utilities Menu🏳️‍🌈", "`helputilities`", true)
     .addField("⚒️Moderation Menu⚒️", "`helpmod`", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(hembed);
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
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpfun":
     var embed = new Discord.MessageEmbed()
     .setTitle("😀Fun Menu😀", "Available games.")
     .addField("`8ball <your question>`", "Predict your future", true)
     .addField("`beep`", "Beep, beep, boop, boop", true)
     .addField("`coinflip`", "Flip a coin!", true)
     .addField("`ding`", "Ding, Dong", true)
     .addField("`door`", "Portal door", true)
     .addField("`joke`", "Some jokes for you", true)
     .addField("`roast`", "Be mad a people", true)
     .addField("`shutdown`", "Shutdown  people\'s device", true)
     .addField("`spam`", "Spam", true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpinfo":
     var embed = new Discord.MessageEmbed()
     .setTitle("❓Info Menu❓", "Informations")
     .addField("`botinfo`", "This bot\'s info")
     .addField("`serverinfo`", "Server information.")
     .addField("`userinfo`", "User\'s information.")
     .addField("`contactinfo`", "Information to contact developers.")
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed);
    break;
    case "helpmod":
    if(!message.member.hasPermission("VIEW_AUDIT_LOG"))return message.channel.send("Nope.")

     var embed = new Discord.MessageEmbed()
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
       { name: "`quickunlock`", value: "Announce the server will be unlocked in a short period.", inline: true},
       { name: "`clear <1-99>`", value: "Bulk delete messages (VIEW_AUDIT_LOG)", inline: true }
     )
     .addFields(
       { name: "MOST DANGEROUS ACTIONS", value: "DO NOT USE IF YOU DON'T HAVE PERMISSION FROM THE OWNER." },
       { name: "`op <@someone>`", value: "OP someone (MANAGE_SERVER)", inline: true },
       { name: "`deop <@someone>`", value: "Deop someone (MANAGE_roles)", inline: true },
       { name: "`tempop <@someone>`", value: "Temp op someone (MANAGE_SERVER)", inline: true }
     )
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    case "helputilities":
     var embed = new Discord.MessageEmbed()
     .setTitle("‍🏳️‍🌈Utilities Menu🏳️‍🌈")
     .setColor(0x00ffff)
     .addField("`report <@someone> <reason>`", "To report people\'s behavior in the server", true)
     .addField("`bugreport <bug>`", "Report a bug that Aot made", true)
     .addField("`time`", "Time now", true)
     .addField("`ping`", "Bot ping and other ping information.", true)
     .setTimestamp()
     .setFooter("Aot Version 0.46.0, Made by cleverActon0126#3517")
     message.channel.send(embed)
    break;
    //end of help menus 
  }
});

bot.login(config.token);

