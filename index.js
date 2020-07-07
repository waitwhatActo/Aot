const Discord = require('discord.js');
const ms = require('ms');

const TOKEN = 'NjU1NzY5Njk1MzcwMjE1NDI1.XltsKw.9iHz5WJsqo2awd6NrfnBiAS7s3g';
const PREFIX = '?a';

var bot = new Discord.Client();

bot.on('ready', function() {
  console.log('Connected as Aot#0350');
  bot.user.setPresence({ activity: { name: '?ahelp' }, status: 'dnd' })
});

bot.on('guildMemberAdd', function(member) {
  const inChannel = member.guild.channels.cache.find(channel => channel.name === 'in-n-out')
  if(!inChannel) return;

  inChannel.send(`<@${member.id}>`)

  var inembed = new Discord.MessageEmbed()
  .setTitle('User Joined')
  .setColor(0x90EE90)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField('Who joined?', `<@${member.id}>`)
  .addField('You\'re the...', `Number ${inChannel.guild.memberCount} member!`)
  .addField('Welcome!', 'Please read the rules and enjoy the server!')
  .setTimestamp()
  .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
  inChannel.send(inembed)

  member.send('Have a great time in Official Acton\'s Empire!')

});

bot.on('guildMemberRemove', function(member) {
  const outChannel = member.guild.channels.cache.find(channel => channel.name === 'in-n-out')
  if(!outChannel) return;

  var outembed = new Discord.MessageEmbed()
  .setTitle('User Left')
  .setColor(0xff0000)
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .addField('Who left?', `<@${member.id}>`)
  .addField('Goodbye!', 'We will never forget you!')
  .setTimestamp()
  .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
  outChannel.send(outembed)

  member.send(`You just left Official Acton's Empire, but they would never forget you!`)
});

bot.on('message', async function(message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(' ');

  switch (args[0].toLowerCase()) {
    //general commands
    case 'ping':
     message.channel.send('🏓Pinging').then(m => {
      var ping = m.createdTimestamp - message.createdTimestamp;
      var botping = bot.ws.ping;

      m.edit(`🏓Pong! Bot ping is ${ping}ms\r API Latency is ${botping}ms`)
     });
    break;
    case 'noticeme':
     message.reply('Got\'cha!');
    break;
    case 'hello':
     message.channel.send('Hi. Nice to meet you!');
    break;
    case 'aot':
     message.channel.send('What\'s the matter?');
    break;
    case 'bye':
     message.channel.send('OK. Cya!')
    break;
    //end of general commands
    //food Commands
    case 'salmon':
     message.channel.send('Do you want it `raw` or `cooked`?');
    break;
    case 'raw':
     message.channel.send('OK. Here you go. A raw salmon.');
    break;
    case 'cooked':
     message.channel.send('OK. Wait for a sec. (Try command `done`)');
    break;
    case 'done':
     message.channel.send('Done. Here you go.');
    break;
    case 'apple':
     message.channel.send('OK. Here\'s your golden apple. Here you go. 🍎');
    break;
    case 'pie':
     message.channel.send('OK. Here\'s your *pre-baked* pie. 🥧');
    break;
    case 'candy':
     message.channel.send('OK. Oops, it went out of stock, never come back!');
    break;
    //end of food Commands
    //fun commands
    case 'door':
     dUser = message.author;

     message.channel.send(`${dUser.tag} => :door:`)
    break;
    case '8ball':
     var eightball = [
      '🟢It is decidedly so.',
      '🟢Without a doubt.',
      '🟢Yes - definitely.',
      '🟢As I see it, yes.',
      '🟢Signs point to yes.',
      '🟡Reply hazy, try again.',
      '🟡Ask again later.',
      '🟡Better not tell you now.',
      '🟡Cannot predict now.',
      '🟡Concentrate and ask again.',
      '🔴Don\'t count on it.',
      '🔴My reply is no.',
      '🔴My sources say no.',
      '🔴Outlook not so good.',
      '🔴Very doubtful.'
     ];

     if (args[1])  message.channel.send(eightball[Math.floor(Math.random() * eightball.length)]);
     else  message.channel.send('Can\'t read that.');
    break;
    case 'coinflip':
     var coinflip = [
      'Your coin landed on **TAIL**.',
      'Your coin landed on **HEADS**.'
     ];

     message.channel.send(coinflip[Math.floor(Math.random() * coinflip.length)]);
    break;
    case 'ding':
     message.channel.send('DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG!');
    break;
    case 'beep':
     message.channel.send('Boop!')
    break;
    case 'kill':
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
      `<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
      `<@${iUser.id}> wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`
     ];

     message.channel.send(killer[Math.floor(Math.random() * killer.length)])
    break;
    case 'roast':
      const roUser = message.mentions.members.first();

      var roast = [
      `<@${message.author}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
      `<@${message.author}> YOU IDOT NEED TO DIE!`,
      `<@${message.author}> ARE YOU AN IDOT? PANALTY!`,
      `<@${message.author}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
      `<@${message.author}> WTF IS WRONG WITH YOU YOU MOTHER FUCKER!`,
      `<@${message.author}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      if(!roUser) message.channel.send(roast[Math.floor(Math.random() * roast.length)])

      var roaster = [
        `<@${roUser.id}> WTH IS WRONG WITH YOU YOU DUMBASS!`,
        `<@${roUser.id}> YOU IDOT NEED TO DIE!`,
        `<@${roUser.id}> ARE YOU AN IDOT? PANALTY!`,
        `<@${roUser.id}> ARE YOU SURE YOU WANNA SAY THAT??? I AM GOING TO KILL YOU!`,
        `<@${roUser.id}> WTF IS WRONG WITH YOU YOU MOTHER FUCKER!`,
        `<@${roUser.id}> DID YOU GOT THE CORONAVIRUS? WTF?`
      ];

      message.channel.send(roaster[Math.floor(Math.random() * roaster.length)])
    break;
    case 'shutdown':
      const sdmUser = message.member;
      const sdUser = message.mentions.members.first();const { promisify } = require('util');
      let sdwait = require('util').promisify(setTimeout);
      if(!sdUser) return message.channel.send('Who to hack?');

      await message.channel.send(`Prepare to shutdown <@${sdUser.id}>\'s device...`)
      await sdwait(2500)
      await message.channel.send('Starting process...')
      await sdwait(2500)
      await message.channel.send(`Locating ${sdUser.id}'s device.`)
      await sdwait(10000)
      await message.channel.send(`Found ${sdUser.id}'s location.`)
      await sdwait(3000)
      await message.channel.send('Hacking IP address...')
      await sdwait(13000)
      await message.channel.send('IP address found.')
      await sdwait(2500)
      await message.channel.send(`Starting to shutdown ${sdUser.id}'s device`)
      await sdwait(5000)
      await message.channel.send(`Failed to shutdown ${sdUser.id}'s device. Manual shutdown needed.`)
      var embed = new Discord.MessageEmbed()
      .setTitle('Remote Shutdown')
      .setDescription('Someone\'s trying to shudown someone\s device! Beware!')
      .setColor(0xc8e9ca)
      .addField('Who\'s remote shutting down people\' device?', `<@${sdmUser.id}>`)
      .addField('Who\'s being shutted down?', `<@${sdUser.id}>`)
      .addField(`${sdUser.id}'s IP`, '127.0.0.1')
      .addField('Windows 7/8/8.1/10', 'Windows is easy to remote shutdown. If you\'re using Windows, follow the steps below.')
      .addField('Step 1', 'Open Cmd in administrator.', true)
      .addField('Step 2', 'Type `shutdown /i` then hit enter.', true)
      .addField('Step 3', 'You will see a pop-up window, press add, then type the IP address writen above, hit add.', true)
      .addField('Step 4', 'Choose if you want to shutdown or restart his computer.', true)
      .addField('Step 5', 'Type in a message for him.', true)
      .addField('Step 6', 'Hit ok.', true)
      .addField('Step 7', 'See someone freaks out.', true)
      .addField('Linux and MacOS', `We haven't test out using Linux or MacOS, but you can use a virtual machine to shutdown <@${sdUser.id}>\'s device.`)
      .setTimestamp()
      .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
      message.channel.send(embed)
    break;
    case 'spam':
    const spUser = message.member

    const spamChannel = message.member.guild.channels.cache.find(channel => channel.name === 'spam')
    if(!spamChannel) return;

    message.channel.send(`Check out <#725534247737360474>! <@${spUser.id}>`)

    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    spamChannel.send('f')
    break;
    case 'hack':
      const hUser = message.mentions.members.first();
      if(!hUser) return message.channel.send('Who to hack?')
      let hwait = require('util').promisify(setTimeout);

      const msg = await message.channel.send(`Prepare to hack ${hUser.id}\'s device.`)
      await hwait(5000)
      await msg.edit('Configuring hack.')
      await hwait(1000)
      await msg.edit('Configuring hack..')
      await hwait(1000)
      await msg.edit('Configuring hack...')
      await hwait(1000)
      await msg.edit('Hacking IP.')
      await hwait(1000)
      await msg.edit('Hacking IP..')
      await hwait(1000)
      await msg.edit('Hacking IP...')
      await hwait(5000)
      await msg.edit('IP hacked.')
      await hwait(3000)
      await msg.edit('Accessing to files.')
      await hwait(1000)
      await msg.edit('Accessing to files..')
      await hwait(1000)
      await msg.edit('Accessing to files...')
      await hwait(5000)
      await msg.edit('Selling files to CCP.')
      await hwait(2000)
      await msg.edit('Deleting all filed on their device.')
      await hwait(1000)
      await msg.edit('This may take up to 30 seconds.')
      await hwait(1000)
      await msg.edit('This may take up to 30 seconds..')
      await hwait(1000)
      await msg.edit('This may take up to 30 seconds...')
      await hwait(23097)
      await msg.edit('Done.')
      await hwait(1000)
      await msg.edit('Restoring harmful files to their device.')
      await hwait(1000)
      await msg.edit('Restoring harmful files to their device..')
      await hwait(1000)
      await msg.edit('Restoring harmful files to their device...')
      await hwait(5000)
      await msg.edit('Activating malware.')
      await hwait(1000)
      await msg.edit('Activating malware..')
      await hwait(1000)
      await msg.edit('Activating malware...')
      await hwait(5000)
      await msg.edit('Malware activated.')
      await hwait(3000)
      await msg.edit('Process Successful.')
    break;
    //end of fun commands
    //utilities
    case 'report':
     const rUser = message.mentions.members.first();
     if(!rUser) return message.channel.send('Could not find user.')
     let rReason = args.slice(2).join(' ')

     var embed = new Discord.MessageEmbed()
     .setTitle('User reports User')
     .setColor(0xff0000)
     .addField('Reported User', `${rUser} with ID: ${rUser.id}`)
     .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
     .addField('Channel', message.channel)
     .addField('Time', message.createdAt)
     .addField('Reason', rReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

     let reportsChannel = message.guild.channels.cache.find(channel => channel.name === 'report-approval');
     if(!reportsChannel) return message.channel.send('Could not find report channel.');

     message.delete().catch(()=> {});
     reportsChannel.send(embed);
    break;
    case 'join':
    const jUser = message.member;
    let joinRole = message.guild.roles.cache.find(role => role.name === 'Aot Tester');
    if(!joinRole) return message.channel.send('Error ocurred. Please try again later.');

    message.delete().catch(()=> {});
    message.channel.send('You\'re now officially a Aot tester!').then(msg => msg.delete({timeout:5000}));
    jUser.roles.add(joinRole.id)
    break;
    case 'leave':
    const lUser = message.member;
    let leaveRole = message.guild.roles.cache.find(role => role.name === 'Aot Tester');
    if(!leaveRole) return message.channel.send('Error ocurred. Please try again later.');

    message.delete().catch(()=> {});
    message.channel.send('You left being a Aot tester.').then(msg => msg.delete({timeout:5000}));
    lUser.roles.remove(leaveRole.id)
    break;
    //end of utilities
    //admin commands
    case 'addrole':
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to do that.");
      let arUser = message.mentions.members.first();
      if(!arUser) return message.channel.send('User doesn\t exist!');
      let arRole = message.mentions.roles.first();
      if(!arRole) return message.channel.send('Role?');

      arUser.roles.add(arRole.id);

      message.channel.send(`Role added for <@${arUser.id}>`)
    break;
    case 'tempaddrole':
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to do that.");
      let tarUser = message.mentions.members.first();
      if(!tarUser) return message.channel.send('User doesn\t exist!');
      let tarRole = message.mentions.roles.first();
      if(!tarRole) return message.channel.send('Role?');

      let tartime = args[3]

      tarUser.roles.add(tarRole.id);

      message.channel.send(`Role added for <@${tarUser.id}> for ${tartime}`)

      setTimeout(function() {
        tarUser.roles.remove(tarRole.id);
        message.channel.send(`Role removed for <@${tarUser.id}>`)
      },ms(tartime))
    break;
    case 'removerole':
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to do that.");
      let rrUser = message.mentions.members.first();
      if(!rrUser) return message.channel.send('User doesn\t exist!');
      let rrRole = message.mentions.roles.first();
      if(!rrRole) return message.channel.send('Role?');

      rrUser.roles.remove(rrRole.id);

      message.channel.send(`Role removed for <@${rrUser.id}>`)
    break;
    case 'tempremoverole':
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don\'t have permission to do that.");
      let trrUser = message.mentions.members.first();
      if(!trrUser) return message.channel.send('User doesn\t exist!');
      let trrRole = message.mentions.roles.first();
      if(!trrRole) return message.channel.send('Role?');

      let trrtime = args[3]

      trrUser.roles.remove(trrRole.id);

      message.channel.send(`Role removed for <@${trrUser.id}> for ${trrtime}`)

      setTimeout(function() {
        trrUser.roles.add(trrRole.id);
        message.channel.send(`Role added for <@${trrUser.id}>`)
      },ms(trrtime))
    break;
    case 'kick':
     const kUser = message.mentions.members.first();
     if(!kUser) return message.channel.send('User doesn\'t exist!');
     let kReason = args.slice(2).join(' ')
     if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You don\'t have permission to do that!');
     if(kUser.hasPermission('KICK_MEMBERS')) return message.channel.send('That person can\'t be kicked!');

     var embed = new Discord.MessageEmbed()
     .setDescription('User Kicked')
     .setColor(0xff0000)
     .addField('Kicked User', `${kUser} with ID ${kUser.id}`)
     .addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
     .addField('Kicked In', message.channel)
     .addField('Time', message.createdAt)
     .addField('Reason', kReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

     let kickChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!kickChannel) return message.channel.send('Could not find server logs channel.');

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(embed);

     message.channel.send(`<@${kUser.id}> has been kicked.`)

     kUser.send(`You have been kicked from Acton's Official Empire. Reason: ${kReason}.`)
    break;
    case "tempban":
     const tbUser = message.mentions.members.first()
     if(!tbUser) return message.channel.send('User doesn\'t exist!')
     let tbReason = args.slice(3).join(' ')
     if(!message.member.hasPermission('BAN_MEMBERS'))  return message.channel.send('You don\'t have permission to do that!');
     if(tbUser.hasPermission('BAN_MEMBERS')) return message.channel.send('That person cannot be banned!');

     var tempbantime = args[2];

     var embed = new Discord.MessageEmbed()
     .setTitle('User Temp Banned')
     .setColor(0xff0000)
     .addField('Temp Banned User', `${tbUser} with ID ${tbUser.id}`)
     .addField('Temp Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
     .addField('Temp Banned In', message.channel)
     .addField('Time', message.createdAt)
     .addField('Reason', tbReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

     let tempbanChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!tempbanChannel) return message.channel.send('Could not find server logs channel.');

     message.guild.member(tbUser).ban(tbReason);
     tempbanChannel.send(embed);

     message.channel.send(`<@${tbUser.id}> has been temp banned for ${tempbantime}.`)

     setTimeout(function() {
       message.guild.members.unban(tbUser.id);
     }, ms(tempbantime))
    break;
    case 'ban':
     const bUser = message.mentions.members.first();
     if(!bUser) return message.channel.send('User doesn\'t exist!');
     let bReason = args.slice(2).join(' ')
     if(!message.member.hasPermission('BAN_MEMBERS'))  return message.channel.send('You don\'t have permission to do that!');
     if(bUser.hasPermission('BAN_MEMBERS')) return message.channel.send('That person can\'t be banned!');

     var embed = new Discord.MessageEmbed()
     .setTitle('User Banned')
     .setColor(0xff0000)
     .addField('Banned User', `${bUser} with ID ${bUser.id}`)
     .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
     .addField('Banned In', message.channel)
     .addField('Time', message.createdAt)
     .addField('Reason', bReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

     let banChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!banChannel) return message.channel.send('Could not find server logs channel.');

     message.guild.member(bUser).ban(bReason);
     banChannel.send(embed);

     message.channel.send(`<@${bUser.id}> has been banned.`)

     bUser.send(`You have been banned from Acton's Official Empire. Duration: *Infinity*; Reason: ${bReason}`)
    break;
    case 'unban':
      const ubID = args[1];
      if(!ubID) return message.channel.send('Who to unban?');
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have permission to do that!')

      var embed = new Discord.MessageEmbed()
      .setTitle('User Unbanned')
      .setColor(0xff0000)
      .addField('Unbanned User', `<@${ubID}> with ID ${ubID}`)
      .addField('Unbanned By', `<@${message.author.id}> with ID ${message.author.id}`)
      .addField('Unbanned In', message.channel)
      .addField('Time', message.createdAt)
      .setTimestamp()
      .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

      let unbanChannel = message.guild.channels.cache.find(channel => channel.name === 'logs');
      if(!unbanChannel) return message.channel.send('Could not find server logs channel.');

      message.guild.members.unban(ubID)
      unbanChannel.send(embed);
    break;
    case 'update':
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have permission to do that!');

     var embed = new Discord.MessageEmbed()
     .setTitle('Update Successful!')
     .setDescription('Successfully updated to Version 0.37.0!')
     .addField('Prefix', '?a \(Uncustomable\)')
     .addField('Public Commands', '`help` \(Will lead you to other help commands\), `hello`, `aot`, `bye`, `noticeme`, `support`, `salmon`, `apple`, `pie`, `candy`, `spam`, `8ball`, `ding`, `ping`, `beep`, `door`, `coinflip`, `kill`, `roast`, `hack`, `shutdown`, `report`, `join`, `leave`, `botinfo`, `userinfo`, `serverinfo`')
     .addField('Admin Commands', '`kick`, `ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`, `addrole`, `tempaddrole`, `removerole`, `tempremoverole`', true)
     .addField('New Commands', 'N/A', true)
     .addField('Removed Commands', 'N/A', true)
     .addField('Updates', 'Welp, arguments commands now work properly. (Side story: Commands which have \'reasons\' actually gone through a lot of problem before.)')
     .setColor(0x00ff00)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')

     message.delete().catch(()=> {});
     message.channel.send(embed);
    break;
    case 'mute':
     const mUser = message.mentions.members.first();
     if (!mUser) return message.channel.send('User doesn\'t exist!');
     if(!message.member.hasPermission('VIEW_AUDIT_LOG'))  return message.channel.send('You don\'t have permission to do that!');
     if(mUser.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send('That person can\'t be muted!');
     let mReason = args.slice(2).join(' ')

     let muterole = mUser.guild.roles.cache.find(role => role.name === 'Muted');
     if (!muterole) return message.channel.send('Role doesn\'t exist');

     mUser.roles.add(muterole.id);

     const muteChannel = mUser.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!muteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle('Person Muted')
     .setColor(0xff0000)
     .addField('Muted Person', `<@${mUser.id}>`)
     .addField('Duration', 'Infinity')
     .addField('Responsible Admin', `<@${message.member.id}>`)
     .addField('Reason', mReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     muteChannel.send(embed)
    break;
    case 'tempmute':
     const tmUser = message.mentions.members.first();
     if (!tmUser) return message.channel.send('User doesn\'t exist!');
     if(!message.member.hasPermission('VIEW_AUDIT_LOG'))  return message.channel.send('You don\'t have permission to do that!');
     if(tmUser.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send('That person can\'t be muted!');
     let tmReason = args.slice(3).join(' ')

     let tempmuterole = tmUser.guild.roles.cache.find(role => role.name === 'Muted');
     if (!tempmuterole) return message.channel.send('Role doesn\'t exist');

     let mutetime = args[2];

     if(!mutetime){
       return message.channel.send('You did not say how much time!');
     }

     tmUser.roles.add(tempmuterole.id);

     const tempmuteChannel = tmUser.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!tempmuteChannel) return;

     var embed = new Discord.MessageEmbed()
     .setTitle('Person Muted')
     .setColor(0xff0000)
     .addField('Muted Person', `<@${tmUser.id}>`)
     .addField('Duration', `${ms(ms(mutetime))}`)
     .addField('Responsible Admin', `<@${message.member.id}>`)
     .addField('Reason', tmReason)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     tempmuteChannel.send(embed)

     setTimeout(function() {
       tmUser.roles.remove(tempmuterole.id);
       tempmuteChannel.send(`<@${tmUser.id}> has been unmuted!`)
     }, ms(mutetime));
    break;
    case 'unmute':
     const umUser = message.mentions.members.first();
     if (!umUser) return message.channel.send('User doesn\'t exist!');
     if(!message.member.hasPermission('VIEW_AUDIT_LOG'))  return message.channel.send('You don\'t have permission to do that!');

     let unmuterole = umUser.guild.roles.cache.find(role => role.name === 'Muted');
     if (!unmuterole) return message.channel.send('Role doesn\'t exist');

     umUser.roles.remove(unmuterole.id);

     const unmuteChannel = umUser.guild.channels.cache.find(channel => channel.name === 'logs');
     if(!unmuteChannel) return;

     unmuteChannel.send(`<@${umUser.id}> has now been unmuted.`);
    break;
    case 'clear':
     if(!message.member.hasPermission('VIEW_AUDIT_LOG'))  return message.channel.send('You don\'t have permission to do that!');
     if(!args[1]) return message.channel.send('How many?');
     message.channel.bulkDelete(args[1]).then(() => {
       message.channel.send(`Deleted ${args[1]} messages.`).then(msg => msg.delete({timeout:3000}));
     });
    break;
    case 'quit':
      qUser = message.member;
      let viprole = mUser.guild.roles.cache.find(role => role.name === 'V.I.P');
      if (!viprole) return message.channel.send('Role doesn\'t exist');

      if(args[1] === 'o') {
        let officerrole = qUser.guild.roles.cache.find(role => role.name === 'Officer');
        if (!offficerrole) return message.channel.send('Role doesn\'t exist');

        qUser.roles.cache.remove(officerrole.id)
        qUser.roles.cache.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send('Thank you for serving us. Bye!').then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === 'a') {
        let adminrole = qUser.guild.roles.cache.find(role => role.name === 'Admin');
        if (!adminrole) return message.channel.send('Role doesn\'t exist');

        qUser.roles.cache.remove(adminrole.id)
        qUser.roles.cache.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send('Thank you for serving us. Bye!').then(msg => msg.delete({timeout:5000}));
      } else if(args[1] === 'ha') {
        let headadminrole = qUser.guild.roles.cache.find(role => role.name === 'Head Admin');
        if (!headadminrole) return message.channel.send('Role doesn\'t exist');

        qUser.roles.cache.remove(headadminrole.id)
        qUser.roles.cache.add(viprole.id)

        message.delete().catch(()=> {});
        message.channel.send('Thank you for serving us. Bye!').then(msg => msg.delete({timeout:5000}));
      } else {
        message.channel.send('You don\'t have permission to ')
      }
    break;
    //end of admin Commands
    //information
    case 'botinfo':
     var embed = new Discord.MessageEmbed()
     .setTitle('Bot Information')
     .setColor(0x00bfff)
     .addField('Bot Name', bot.user.username)
     .addField('Bot Created On:', bot.user.createdAt)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed);
    break;
    case 'userinfo':
     const sUser = message.mentions.members.first();
     const snUser = message.member;

     var noembed = new Discord.MessageEmbed()
     .setTitle('User Info')
     .setColor(0x00bfff)
     .setThumbnail(snUser.user.displayAvatarURL())
     .addField('Username', snUser.user.tag)
     .addField('Account created at', snUser.user.createdAt, true)
     .addField('Joined server at', snUser.joinedAt, true)
     .addField('Roles', snUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     if(!sUser) return message.channel.send(noembed)

     var embed = new Discord.MessageEmbed()
     .setTitle('User Info')
     .setColor(0x00bfff)
     .setThumbnail(sUser.user.displayAvatarURL())
     .addField('Username', sUser.user.tag)
     .addField('Account created at', sUser.user.createdAt, true)
     .addField('Joined server at', sUser.joinedAt, true)
     .addField('Roles', sUser.roles.cache.map(r => r.toString()))
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed)
    break;
    case 'serverinfo':
     var embed = new Discord.MessageEmbed()
     .setTitle('Server Info')
     .setDescription('Server\'s information.')
     .setColor(0x00bfff)
     .addField('Server General', 'Server General Information')
     .addField('Server Name', message.guild.name, true)
     .addField('Owner', message.guild.owner, true)
     .addField('Created at', message.guild.createdAt, true)
     .addField('People in server', message.guild.memberCount, true)
     .addField('Server Boost', 'Server Boost Information')
     .addField('Server Boost Level', message.guild.premiumTier, true)
     .addField('Server Boosts Count', message.guild.premiumSubscriptionCount, true)
     .addField('Voice Channels', 'Voice Channels Information')
     .addField('AFK Channel', message.guild.afkChannel, true)
     .addField('Voice Channel AFK Timeout', message.guild.afkTimeout, true)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed)
     break;
    //end of Information
    //help menus
    case 'help':
     var hembed = new Discord.MessageEmbed()
     .setTitle('❓Help Menu❓')
     .addField('🔣General Menu🔣', '`helpgeneral`', true)
     .addField('🍴Food Menu🍴', '`helpfood`', true)
     .addField('😀Fun Menu😀', '`helpfun`', true)
     .addField('❓Info Menu❓', '`helpinfo`', true)
     .addField('🏳️‍🌈Utilities Menu🏳️‍🌈', '`helputilities`', true)
     .addField('⚒️Moderation Menu⚒️', '`helpmod`', true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(hembed);
    break;
    case 'helpgeneral':
     var embed = new Discord.MessageEmbed()
     .setTitle('🔣General Menu🔣', 'These are the general commands.')
     .addField('`aot`', 'Waking Aot up', true)
     .addField('`bye`', 'Waving hands to Aot', true)
     .addField('`hello`', 'A greeting command', true)
     .addField('`noticeme`', 'Let Aot to notice you', true)
     .addField('`ping`', 'Bot ping', true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed);
    break;
    case 'helpfood':
     var embed = new Discord.MessageEmbed()
     .setTitle('🍴Food Menu🍴', 'These are the foods for you to eat.')
     .addField('`apple`', 'NORMAL apple', true)
     .addField('`candy`', 'Sweet one', true)
     .addField('`pie`', 'Pie', true)
     .addField('`salmon`', 'Raw salmon or cooked salmon can be choose', true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed);
    break;
    case 'helpfun':
     var embed = new Discord.MessageEmbed()
     .setTitle('😀Fun Menu😀', 'Available games.')
     .addField('`8ball`', 'Predict your future', true)
     .addField('`beep`', 'Beep, beep, boop, boop', true)
     .addField('`coinflip`', 'Flip a coin!', true)
     .addField('`ding`', 'Ding, Dong', true)
     .addField('`door`', 'Portal door', true)
     .addField('`roast`', 'Be mad a people', true)
     .addField('`shutdown`', 'Shutdown  people\'s device', true)
     .addField('`spam`', 'Spam', true)
     .setColor(0x00ffff)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed);
    break;
    case 'helpinfo':
     var embed = new Discord.MessageEmbed()
     .setTitle('❓Info Menu❓', 'Informations')
     .addField('`botinfo`', 'This bot\'s info')
     .addField('`serverinfo`', 'Server information.')
     .addField('`userinfo`', 'User\'s information.')
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed);
    break;
    case 'helpmod':
     var embed = new Discord.MessageEmbed()
     .setTitle('⚒️Moderation Menu⚒️')
     .addField('`kick`', 'Kick people (KICK_MEMBERS)', true)
     .addField('`ban`', 'Ban people (BAN_MEMBERS)', true)
     .addField('`tempban`', 'Temporary ban people(BAN_MEMBERS)', true)
     .addField('`mute`', 'Mute people (VIEW_AUDIT_LOG)', true)
     .addField('`tempmute`', 'Temporary mute people (VIEW_AUDIT_LOG)', true)
     .addField('`unmute`', 'Unmute a muted person (VIEW_AUDIT_LOG)', true)
     .addField('`addrole`', 'Add a role to a person (MANAGE_ROLES)', true)
     .addField('`tempaddrole`', 'Add a role to a person Temporary (MANAGE_ROLES)', true)
     .addField('`removerole`', 'Remove a role from a person (MANAGE_ROLES)', true)
     .addField('`tempremoverole`', 'Remove a role from a person Temporary (MANAGE_ROLES)', true)
     .addField('`clear`', 'Bulk delete messages (VIEW_AUDIT_LOG)')
     .setTimestamp()
     .setColor(0x00ffff)
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed)
    break;
    case 'helputilities':
     var embed = new Discord.MessageEmbed()
     .setTitle('‍🏳️‍🌈Utilities Menu🏳️‍🌈')
     .setColor(0x00ffff)
     .addField('`report`', 'To report people\'s behavior in the server', true)
     .addField('`join`', 'Be a Aot tester', true)
     .addField('`leave`', 'Quit being a Aot tester', true)
     .setTimestamp()
     .setFooter('Aot Version 0.37.0, Made by cleverActon0126#3517')
     message.channel.send(embed)
    break;
    //end of help menus
    default:
     message.channel.send('Invalid command!');
  }
});

bot.login(TOKEN);
