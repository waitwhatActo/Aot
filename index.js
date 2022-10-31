const { IntentsBitField, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle, Collection } = require("discord.js");
const randomPuppy = require("random-puppy");
const fs = require("node:fs");
const io = require("@pm2/io");
const mongoose = require("mongoose");
const { Database, token, backupbot, update } = require("./config.json");
const bandb = require("./Schemas/BanSchema.js");
const warndb = require("./Schemas/WarnSchema.js");
const mutedb = require("./Schemas/MuteSchema.js");
const countdb = require("./Schemas/CountSchema.js");
const filterdb = require("./Schemas/FilterSchema.js");
const PREFIX = "?a";
const bot = new Client({ intents: new IntentsBitField(3276799) });

let hours = 0;
let feedcon = 0;
let backupbotevents = 0;

bot.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const ids = JSON.parse(fs.readFileSync("./ids.json", "utf-8"));

const hmf = [
	"Need help? ?ahelp will be able to help you",
	"Enjoy your time using Acto Utils",
	"Trying to report somebody? DM @ModMail",
	"Made by cleverActon0126#0126",
	"Version 0.62.0",
];
const spamchannels = [
	"1007820662288691331",
	"1007820807742951484",
	"1007820678130573394",
	"1007820700918239232",
	"1007820711416569980",
	"1007820719989739671",
	"1007820760984854538",
	"1007820772548554813",
	"1007820782451302501",
	"1007820793553621093",
];

module.exports = { hmf, bot, ids };

io.init({
	// @ts-ignore
	transactions: true,
	http: true,
});

const feeder = async () => {
	if (backupbot == 1 && backupbotevents == 0) return;
	if (feedcon == 0) return;
	const acto = await bot.users.fetch("428445352354643968");
	const actomsg = await acto.send("Pinging");
	const actoembed = new EmbedBuilder()
		.setDescription("**Acto Utils is online!**")
		.addFields([
			{ name: "Acto Utils has been online for", value: `${hours} hour` },
			{ name: "The current time is", value: `<t:${Math.round(actomsg.createdTimestamp / 1000)}:F>` },
			{ name: "API Latency", value: `${bot.ws.ping}ms` },
			{ name: "Roundtrip Latency", value: `${(new Date().getTime() * 1000) - actomsg.createdTimestamp}` },
			{ name: "​", value: "Check the logs for errors if necessary." },
		])
		.setFooter({ text: "Made for Acto (428445352354643968).", iconURL: acto.avatarURL({ size: 4096, extension: "png" }) })
		.setTimestamp()
		.setAuthor({ name: "Scheduled Acto Utils Feed", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
	actomsg.edit({ embeds: [actoembed] });
	const del = await bot.users.fetch("710272856772050994");
	const delmsg = await del.send("Pinging");
	const delembed = new EmbedBuilder()
		.setDescription("**Acto Utils is online!**")
		.addFields([
			{ name: "Acto Utils has been online for", value: `${hours} hour` },
			{ name: "The current time is", value: `<t:${Math.round(delmsg.createdTimestamp / 1000)}:F>` },
			{ name: "API Latency", value: `${bot.ws.ping}ms` },
			{ name: "Roundtrip Latency", value: `${(new Date().getTime() * 1000) - actomsg.createdTimestamp}` },
			{ name: "​", value: "Check the logs for errors if necessary." },
		])
		.setFooter({ text: "Made for Delilah (933317965024210995). Acto says \"ily\" to you", iconURL: del.avatarURL({ size: 4096, extension: "png" }) })
		.setTimestamp()
		.setAuthor({ name: "Scheduled Acto Utils Feed", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
	delmsg.edit({ embeds: [delembed] });
	setInterval(async () => {
		const actomsgint = await acto.send("Pinging");
		const actoembedint = new EmbedBuilder()
			.setDescription("**Acto Utils is online!**")
			.addFields([
				{ name: "Acto Utils has been online for", value: `${hours} hour` },
				{ name: "The current time is", value: `<t:${Math.round(actomsgint.createdTimestamp / 1000)}:F>` },
				{ name: "API Latency", value: `${bot.ws.ping}ms` },
				{ name: "Roundtrip Latency", value: `${(new Date().getTime() * 1000) - actomsgint.createdTimestamp}` },
				{ name: "​", value: "Check the logs for errors if necessary." },
			])
			.setFooter({ text: "Made for Acto (428445352354643968).", iconURL: acto.avatarURL({ size: 4096, extension: "png" }) })
			.setTimestamp()
			.setAuthor({ name: "Scheduled Acto Utils Feed", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		actomsg.edit({ embeds: [actoembedint] });
		const delmsgint = await del.send("Pinging");
		const delembedint = new EmbedBuilder()
			.setDescription("**Acto Utils is online!**")
			.addFields([
				{ name: "Acto Utils has been online for", value: `${hours} hour` },
				{ name: "The current time is", value: `<t:${Math.round(delmsgint.createdTimestamp / 1000)}:F>` },
				{ name: "API Latency", value: `${bot.ws.ping}ms` },
				{ name: "Roundtrip Latency", value: `${(new Date().getTime() * 1000) - actomsgint.createdTimestamp}` },
				{ name: "​", value: "Check the logs for errors if necessary." },
			])
			.setFooter({ text: "Made for Delilah (933317965024210995). Acto says \"ily\" to you", iconURL: del.avatarURL({ size: 4096, extension: "png" }) })
			.setTimestamp()
			.setAuthor({ name: "Scheduled Acto Utils Feed", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		delmsg.edit({ embeds: [delembedint] });
	}, 1800000);

};

bot.once("ready", async () => {
	if (!Database) {
		console.log("Database does not present. Exiting...");
		process.exit();
	}
	mongoose.connect(Database, {})
		.then(() => {
			console.log("Database is now connected");
		}).catch((err) => {
			console.log(err);
			console.log("Failed to connect to database. Exiting...");
			process.exit();
		});
	console.log("Connected as Acto Utils#0350 and using version 0.62.0");
	if (backupbot == 0) {
		bot.user.setPresence({ activities: [{ name: `?ahelp on 0.62.0 for ${hours} hour(s)` }], status: "online" });
	}
	else if (backupbot == 1) {
		bot.user.setStatus("invisible");
		setInterval(async () => {
			const botcheckserver = await bot.guilds.fetch(ids.guild);
			const botcheckid = await botcheckserver.members.fetch("655769695370215425");
			if (!botcheckid) {
				console.log("Failed to check Acto Utils's status. Reconfirm ID and/or code.");
				process.exit;
			}
			if (botcheckid.presence.status == "offline" && backupbotevents == 0) {
				backupbotevents = 1;
				bot.user.setPresence({ activities: [{ name: `?ahelp on 0.62.0 for ${hours}` }], status: "online" });
			}
			else if (botcheckid.presence.status == "online" && backupbotevents == 1) {
				bot.user.setActivity("invisible");
				backupbotevents = 0;
			}
		}, 60000);
	}
	else {
		console.log("Backupbot value is incorrect or not present, fix issue before rebooting bot.");
		process.exit();
	}
	setInterval(async () => {
		if (backupbot == 0) {
			hours += 1;
			bot.user.setPresence({ activities: [{ name: `on v0.62.0 for ${hours} hours` }], status: "online" });
		}
	}, 3600000);
	setInterval(async () => {
		if (backupbot == 1 && backupbotevents == 0) return;
		const cd = Date.now();
		const unban = await bandb.find({ unbantime: `${Math.floor(cd / 1000)}` });
		const unmute = await mutedb.find({ unmutetime: `${Math.floor(cd / 1000)}` });
		for (let i = 0; unban.length > i;) {
			const server = await bot.guilds.fetch(ids.guild);
			if (!server) { return console.log("Failed to unban."); }
			server.bans.remove(unban[0].userId);
			let unbanuser = undefined;
			let banadmin = undefined;
			try {
				unbanuser = await bot.users.fetch(`${unban[0].userId}`);
			}
			catch {
				unbanuser = undefined;
			}
			try {
				banadmin = await bot.users.fetch(`${unban[0].adminId}`);
			}
			catch {
				banadmin = undefined;
			}
			const unbanembed = new EmbedBuilder()
				.setDescription("**User Unbanned**")
				.setColor(0x00ff00)
				.addFields(
					{ name: "Unbanned User", value: `<@${unban[0].userId} (**${unban[0].userId})` },
					{ name: "Unbanned User Banned By", value: `<@${unban[0].adminId} (**${unban[0].adminId}**)` },
					{ name: "Unbanned At", value: `<t:${Math.round(parseInt(unban[0].bantime) / 1000)}:F>` },
					{ name: "Unbanned User Banned For", value: unban[0].reason },
				)
				.setTimestamp();
			if (banadmin) {
				unbanembed.setFooter({ text: `Member was banned by ${banadmin.tag}, automatically unbanned by Acto Utils`, iconURL: banadmin.avatarURL({ size: 4096, extension: "png" }) });
			}
			else {
				unbanembed.setFooter({ text: `Member was banned by ${unban[0].adminusername}(Past username), automatically unbanned by Acto Utils`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}
			if (!unbanuser) {
				unbanembed.setAuthor({ name: `${unban[0].username}` });
			}
			else {
				unbanembed.setAuthor({ name: unbanuser.tag, iconURL: unbanuser.avatarURL({ size: 4096, extension: "png" }) });
			}
			const channel = await server.channels.fetch(ids.channels.logging.general);
			// @ts-ignore
			channel.send({ embeds: [unbanembed] });
			unban.shift();
		}
		for (let i = 0; unmute.length > i;) {
			const member = await (await bot.guilds.fetch(ids.guild)).members.fetch(unmute[0].userId);
			if (!member) { return console.log("Failed to unmute."); }
			await member.roles.remove("726205475397566505");
			member.timeout(null);
			const unmuteembed = new EmbedBuilder()
				.setDescription("**Member Unmuted**")
				.addFields(
					{ name: "Unmuted Member", value: `<@${unmute[0].userId}> (${unmute[0].userId})` },
					{ name: "Unmuted Member Muted By", value: `<@${unmute[0].adminId} (${unmute[0].adminId})` },
					{ name: "Unmuted At", value: `<t:${Math.round(parseInt(unmute[0].time) / 1000)}:F>` },
					{ name: "Unmuted Member Muted For", value: `${unmute[0].reason}` },
				)
				.setTimestamp()
				.setColor(0x00ff00);
			let unmuteuser = undefined;
			let muteadmin = undefined;
			try {
				unmuteuser = await bot.users.fetch(`${unmute[0].userId}`);
			}
			catch {
				unmuteuser = undefined;
			}
			try {
				muteadmin = await bot.users.fetch(`${unmute[0].adminId}`);
			}
			catch {
				muteadmin = undefined;
			}
			if (muteadmin) {
				unmuteembed.setFooter({ text: `Member was muted by ${muteadmin.tag}, automatically unmuted by Acto Utils`, iconURL: muteadmin.avatarURL({ size: 4096, extension: "png" }) });
			}
			else {
				unmuteembed.setFooter({ text: `Member was muted by ${unmute[0].adminusername}(Past username), automatically unmuted by Acto Utils`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}
			if (!unmuteuser) {
				unmuteembed.setAuthor({ name: `${unmute[0].username}` });
			}
			else {
				unmuteembed.setAuthor({ name: unmuteuser.tag, iconURL: unmuteuser.avatarURL({ size: 4096, extension: "png" }) });
			}
			const channel = await (await bot.guilds.fetch(ids.guild)).channels.fetch(ids.logging.general);
			// @ts-ignore
			channel.send({ embeds: [unmuteembed] });
			unmute.shift();
		}
	}, 1000);

	const uembed = new EmbedBuilder()
		.setAuthor({ name: "Acto Utils Update", iconURL: bot.user.avatarURL({ extension: "png", size: 4096 }) })
		.setTitle("Chat Filter Improvement, Slash Admin Commands Migration & General Bot Polishing")
		.setDescription("Successfully updated to Version 0.62.0!")
		.addFields([
			{ name: "**Dependencies Update**", value: "- Discord.js -> `14.5.0`\r - mongoose -> `6.6.5`\r - @discordjs/builders -> Removed\r - @discordjs/rest -> `1.2.0`\r - @discordjs/voice -> `0.11.0`\r - got -> `12.5.1`\r - NEW unidici -> `5.11.0`" },
			{ name: "**Features Update**", value: "- Updated to Discord.js v14 \r- New & Improved Chat Filter: Gives mods more options to take care of suspected trolls, spams or etc; Also stores to database and will appear in `/warn query` \r- Slash Admin Commands (SAC): All admin commands are now migrated to slash commands instead of using the old `?a` prefix. There may be a few exceptions in the future. \r- New embeds layout: Embeds now include your username and profile picture. Pretty cool, isn't it? \r- Replying instead of sending: The bot now *replies* to your message instead of straight up sending it in the chat. \r- Updated Scam Links List, Malicious URLS List" },
			{ name: "**Patched Features**", value: "- Discord.js v14 necessary features syntax update \r- Scheduled Feed Countdown \r- Offline backup mechanism \r- Embeds Coloring \r- Some typos causing the command to not work" },
			{ name: "**Commands Updates**", value: "__Updates__\r- All embeds reworked \r- All admin commands moved to slash commands. This includes `/ban` (previously `?aban`, `?atempban`, `?aunban`), `/clear`, `/cooldown` (previously `?aslowmode`), `/grant`, `/kick`, `/lockdown` (previously `?alockdown` & `?aunlock`), `/mute` (previously `?amute`, `?aunmute`, `?atempmute`), `/restart`, `/role` (previously `?aaddrole`, `?atempaddrole`, `?aremoverole`, `?atempremoverole`). Exception is `?atellraw` \r- All typos are now fixed \r- `?ashutdown`: Shortened content & command and improved looks. \r- `?abotinfo`: Reworked embed & content \r- `?auserinfo`, `/userinfo`, User Information (User Application): Reworked embed & content \r- `?aserverinfo`: Reworked embed & content \r- `?awelcome`: Reworked embed & content \r- `?ahelp` (and all subcommands): Reworked embed & Updated content \r- `/ping`: Fixed an issue with the command and reworked embed \r `/warn query`: Fixed an issue with the command and reworked embed \r__Additions__ \r - None \r __Deletions__ \r - None" },
			{ name: "Other Info", value: "Bot host is currently being moved (and shipped), steady bot uptime will be back in a few days to weeks." },
			{ name: "Source Code", value: "[https://github.com/cleverActon0126/Aot](https://github.com/cleverActon0126/Aot)" },
			{ name: "Next Update", value: "0.62.1 - Chat filter improvements" },
		])
		.setColor(0x00ff00)
		.setTimestamp()
		.setFooter({ text: "Acto Utils Version 0.62.0, Made by cleverActon0126#0126", iconURL: bot.user.avatarURL({ extension: "png", size: 4096 }) });

	if (update == 1) {
		if (backupbot == 1 && backupbotevents == 0) return;
		const readyupdate = await bot.channels.fetch(ids.channels.botupdates);
		// @ts-ignore
		readyupdate.send({ embeds: [uembed] });
	}

	const date = new Date();
	const minutes = date.getMinutes();
	const lowestCalc = (Math.ceil(minutes / 30) * 30) - minutes;
	const seconds = 60 - date.getSeconds();

	(await bot.users.fetch("428445352354643968")).send(`Acto Utils is currently online, on version 0.62.0, at <t:${Math.round(date.getTime() / 1000)}:F>`);
	setTimeout(() => {
		feedcon += 1;
		feeder();
	}, (lowestCalc - 1) * 60000 + seconds * 1000);

	const counter = await countdb.create({
		userId: "709851167781552160",
		numbercounted: "2026",
	});
	await counter.save();
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}
// @ts-ignore
bot.on("guildMemberAdd", async function(member) {
	if (backupbot == 1 && backupbotevents == 0) return;
	if (member.guild == ids.guild) return;
	if (member.id == "844370394781712384") return member.roles.add("725361624294096927");

	const newmem = [
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
		`Where's <@${member.id}>? In the server!`,
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
		`Roses are red, violets are blue, <@${member.id}> joined this server with you`,
	];
	// @ts-ignore
	await (await member.guild.channels.fetch(ids.channels.muteables[0])).send(newmem[Math.floor(Math.random() * newmem.length)]);

	const embed = new EmbedBuilder()
		.setDescription(`**Welcome to ${member.guild.name}!**`)
		.setColor("Random")
		.addFields([
			{ name: `Welcome, ${member.nickname}!`, value: `Have a great time in ${member.guild.name}!` },
			{ name: "*Psst, here are some tips!*", value: "Read the rules (<#651410686705926145>) before you continue your exploration as they are crucial. You can check <#922778404988805190> for server related announcements and <#740870989134561331> for Youtube or content creating related announcements. There's more for you to discover!" },
		])
		.setTimestamp()
		.setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL({ size: 4096, extension: "png" }) })
		.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
	member.send({ embeds: [embed] }).catch(() => member.send({ embeds: [embed] }));
});

bot.on("interactionCreate", async function(interaction) {
	if (backupbot == 1 && backupbotevents == 0) {
		// @ts-ignore
		interaction.reply({ content: "Hey there! This bot is a backup bot and is currently not in service as the main bot is still available. Please use the main bot instead." });
	}
	if (!(interaction.isCommand() || interaction.isButton() || interaction.isContextMenuCommand() || interaction.isSelectMenu() || interaction.isMessageContextMenuCommand())) return;
	if (!interaction.inGuild()) return;
	// @ts-ignore
	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

bot.on("messageUpdate", async function(oldmessage, newmessage) {
	if (backupbot == 1 && backupbotevents == 0) return;
	if (!oldmessage.guildId == ids.guild) return;
	if (oldmessage.author.bot) return;

	const count = 1950;
	const original = oldmessage.content.slice(0, count) + (oldmessage.content.length > count ? " ..." : "");
	const edited = newmessage.content.slice(0, count) + (newmessage.content.length > count ? " ..." : "");

	const logembed = new EmbedBuilder()
		.setColor("Aqua")
		.setDescription(`A [message](${newmessage.url}) has been edited by ${newmessage.author} in ${newmessage.channel}.`)
		.addFields([
			{ name: "Before", value: `\`\`\`${original}\`\`\`` },
			{ name: "After", value: `\`\`\`${edited}\`\`\`` },
		]);
	if (newmessage.attachments.size > 0) {
		logembed.addFields([{ name: "Attachments:", value: `${newmessage.attachments.map((a) => a.url)}` }]);
	}
	const channels = await bot.guilds.fetch(ids.guild);
	// @ts-ignore
	(await channels.channels.fetch(ids.channels.logging.general)).send({ embeds: [logembed] });
	// @ts-ignore
	(await bot.channels.fetch("860825678407663657")).send({ embeds: [logembed] });
});
// @ts-ignore
bot.on("messageCreate", async function(message) {
	if (!message.inGuild()) return;
	if (message.author.equals(bot.user)) return;

	let cftypei = "";
	let cftype = "";
	let cfstring1 = "";
	let cfstring1l = "";
	async function chatfilter() {
		message.delete();
		const cfmuterole = await message.guild.roles.fetch(ids.roles.muted);
		message.member.roles.add(cfmuterole);
		const cfmsgmember = message.member;
		message.channel.send(`<@${cfmsgmember.id}> (**${cfmsgmember.user.username})`);

		switch (cftypei) {
		case "sl": {
			cfstring1 = "Scam URL";
			cfstring1l = "scam link";
			cftype = "scamlink";
			break;
		}
		case "m": {
			cfstring1 = "Scam";
			cfstring1l = "malicious content";
			cftype = "malicious";
			break;
		}
		case "nu": {
			cfstring1 = "Malciious URL";
			cfstring1l = "malicious URL";
			cftype = "malurl";
			break;
		}
		case "e": {
			cfstring1 = "Mass Mention";
			cfstring1l = "mass mention";
			cftype = "massmention";
			break;
		}

		}

		const cfbuttons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("ban")
					.setLabel("Permanently Ban Member")
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("mute")
					.setLabel("Permanently Mute Member")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("warnmute")
					.setLabel("Warn & Temporarily Mute Member")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("warn")
					.setLabel("Warn Member")
					.setStyle(ButtonStyle.Secondary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId("falsealarm")
					.setLabel("False Alarm")
					.setStyle(ButtonStyle.Success),
			);

		const warnhistory = await warndb.find({}).sort({ warnid: 1 });
		let warnhistorystring = "";
		let warnhistorylength = 0;
		for (; warnhistory.length > 0;) {
			if (warnhistory[0].userId == message.member.user.id) {
				if (warnhistorylength >= 3) {
					if (warnhistorylength == 3) {
						warnhistorystring += "... \n";
					}
					warnhistorylength += 1;
					return;
				}
				warnhistorystring += `\`000${warnhistory[0].warnId}\` **${warnhistory[0].reason}** • <t:${Math.round(parseInt(warnhistory[0].time) / 1000)}:F> \n`;
				warnhistorylength += 1;
			}
		}

		const cfembed = new EmbedBuilder()
			.setDescription(`⚠️**Attempted ${cfstring1}**⚠️`)
			.setAuthor({ name: message.member.user.tag, iconURL: message.member.user.avatarURL({ size: 4096, extension: "png" }) })
			.setFooter({ text: "Select an action within 48 hours.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
			.setColor(0xfec13d)
			.setTimestamp()
			.addFields([
				{ name: "Filtered Message Sent By", value: message.member.user.username },
				{ name: "Filtered Message Sent At", value: `<t:${Math.round(message.createdTimestamp / 1000)}:F>` },
				{ name: "Filtered Message Sent In", value: `<#${message.channelId}>` },
				{ name: "Filtered Message Content", value: `${message.content}` },
				{ name: "Sender Past Infractions", value: `${warnhistorystring} **Total Warns**: ${warnhistorylength}` },
				{ name: "Sender Server Join Date", value: `<t:${Math.round(message.member.joinedTimestamp / 1000)}:F>` },
			]);

		const slchannel = await bot.channels.fetch(ids.channels.logging.filter);
		// @ts-ignore
		const slmessage = await slchannel.send({ content: "@everyone \r	", embeds: [cfembed], components: [cfbuttons] });
		const slcollect = await slmessage.createMessageComponentCollector({ componentType: ComponentType.Button, max: 1, maxComponents: 1, maxUsers: 1, time: 4147200000 });
		const slcaseid = await filterdb.find({}).sort({ caseId: 1 });
		for (; slcaseid.length > 1;) {
			slcaseid.shift();
		}
		let slcaseid2 = parseInt(slcaseid[0].caseId);
		const slcaseid3 = slcaseid2 += 1;

		const slwarnid = await warndb.find({}).sort({ warnid: 1 });
		for (; slwarnid.length > 1;) {
			slwarnid.shift();
		}
		let slwarnid2 = parseInt(slwarnid[0].warnId);
		const slwarnid3 = slwarnid2 += 1;

		slcollect.on("collect", async i => {
			switch (i.customId) {
			case "ban": {
				const brecorddb = await filterdb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					time: `${message.createdTimestamp}`,
					channelId: `${message.channelId}`,
					content: `${message.content}`,
					type: `${cftype}`,
					action: "ban",
					caseId: `${slcaseid3}`,
				});
				const bbandb = await bandb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					reason: `Attempted to send ${cfstring1l}.`,
					adminusername: `${i.member.user.tag}`,
					adminId: `${i.member.user.id}`,
					permanent: true,
					bantime: `${message.createdTimestamp}`,
				});
				await cfembed.setColor(0xff0000).setFooter({ text: "Member Banned.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) }).addFields({ name: "Moderation Action", value: `<@${message.member.user.id}> **(${message.member.user.id})** permanently banned.` });

				try {
					await brecorddb.save();
					await bbandb.save();
				}
				catch {
					console.log();
					// @ts-ignore
					slchannel.send({ content: "An error has occurred. This could be due to unable to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The ban has been aborted." });
					return;
				}

				try {
					await message.member.ban({ reason: `${cfstring1}` });
				}
				catch {
					console.log();
					// @ts-ignore
					slchannel.send({ content: "An error has occurred. This could be due to unable to ban member. You can try again, but if the problem persists, please contact the bot owner. The ban has been aborted." });
					return;
				}

				await slmessage.edit({ embeds: [cfembed], components: [] });
				await message.channel.send(`<@${cfmsgmember.id}> was banned for **attempted to send ${cfstring1l}**.`);
				break;
			}
			case "mute": {
				const slrecorddb = await filterdb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					time: `${message.createdTimestamp}`,
					channelId: `${message.channelId}`,
					content: `${message.content}`,
					type: `${cftype}`,
					action: "mute",
					caseId: `${slcaseid3}`,
				});
				const slmutedb = await mutedb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					reason: `Attempted to send ${cfstring1l}.`,
					adminusername: `${i.member.user.tag}`,
					adminId: `${i.member.user.id}`,
					permanent: true,
					time: `${message.createdTimestamp}`,
				});
				await cfembed.setColor(0xff000).setFooter({ text: "Member Permanently Muted.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) }).addFields({ name: "Moderation Action", value: `<@${message.member.user.id}> **(${message.member.user.id})** permanently muted.` });

				try {
					await slrecorddb.save();
					await slmutedb.save();
				}
				catch {
					console.log();
					// @ts-ignore
					slchannel.send({ content: "An error has occurred. This could be due to unable to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The mute has been aborted." });
					return;
				}

				if (!message.member.roles.cache.has(ids.roles.muted)) {
					try {
						await message.member.roles.add((await message.guild.roles.fetch(ids.roles.muted)), `${cfstring1}`);
					}
					catch {
						console.log();
						// @ts-ignore
						slchannel.send({ content: "An error has occurred. This could be due to unable to mute member. You can try again, but if the problem persists, please contact the bot owner. The mute has been aborted." });
						return;
					}
				}

				await slmessage.edit({ embeds: [cfembed], components: [] });
				await message.channel.send(`<@${cfmsgmember.id}> has been permanently muted for **attempted to send ${cfstring1l}**.`);
				break;
			}
			case "warnmute": {
				const slrecorddb = await filterdb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					time: `${message.createdTimestamp}`,
					channelId: `${message.channelId}`,
					content: `${message.content}`,
					type: `${cftype}`,
					action: "warnmute",
					caseId: `${slcaseid3}`,
				});
				const slwarndb = await warndb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					warnId: `${slwarnid3}`,
					reason: `Attempted to send ${cfstring1l}.`,
					adminusername: `${i.member.user.tag}`,
					adminId: `${i.member.user.id}`,
					channel: `${message.channelId}`,
					time: `${message.createdTimestamp}`,
				});
				const slmutedb = await mutedb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					reason: `Attempted to send ${cfstring1l}.`,
					adminusername: `${i.member.user.tag}`,
					adminId: `${i.member.user.id}`,
					permanent: true,
					time: `${message.createdTimestamp}`,
				});
				await cfembed.setColor(0xff0000).setFooter({ text: "Member Warned & Permanently Muted.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) }).addFields({ name: "Moderation Action", value: `<@${message.member.user.id}> **(${message.member.user.id})** warned & permanently muted.` });

				try {
					await slwarndb.save();
					await slrecorddb.save();
					await slmutedb.save();
				}
				catch {
					console.log();
					// @ts-ignore
					slchannel.send({ content: "An error has occurred. This could be due to unable to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The warn & mute has been aborted." });
					return;
				}

				if (!message.member.roles.cache.has(ids.roles.muted)) {
					try {
						await message.member.roles.add((await message.guild.roles.fetch(ids.roles.muted)), "Scam Link");
					}
					catch {
						console.log();
						// @ts-ignore
						slchannel.send({ content: "An error has occurred. This could be due to unable to mute member. You can try again, but if the problem persists, please contact the bot owner. The mute has been aborted." });
						return;
					}
				}

				await slmessage.edit({ embeds: [cfembed], components: [] });
				await message.channel.send(`<@${cfmsgmember.id}> was warned and permanently muted for **attempted to send ${cfstring1l} message**.`);
				break;
			}
			case "falsealarm": {
				try {
					await message.member.roles.remove((await message.guild.roles.fetch(ids.roles.muted)));
				}
				catch {
					console.log();
				}
				await cfembed.setColor(0x00ff00).setFooter({ text: "False Alarm.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
				break;
			}
			case "warn": {
				const slrecorddb = await filterdb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					time: `${message.createdTimestamp}`,
					channelId: `${message.channelId}`,
					content: `${message.content}`,
					type: `${cftype}`,
					action: "warnmute",
					caseId: `${slcaseid3}`,
				});
				const slwarndb = await warndb.create({
					username: `${message.member.user.tag}`,
					userId: `${message.member.user.id}`,
					warnId: `${slwarnid3}`,
					reason: `Attempted to send ${cfstring1l}.`,
					adminusername: `${i.member.user.tag}`,
					adminId: `${i.member.user.id}`,
					channel: `${message.channelId}`,
					time: `${message.createdTimestamp}`,
				});
				await cfembed.setColor(0xfec13d).setFooter({ text: "Member Warned.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) }).addFields({ name: "Moderation Action", value: `<@${message.member.user.id}> **(${message.member.user.id})** warned.` });

				try {
					await slwarndb.save();
					await slrecorddb.save();
				}
				catch {
					console.log();
					// @ts-ignore
					slchannel.send({ content: "An error has occurred. This could be due to unable to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The warn has been aborted." });
					return;
				}

				await slmessage.edit({ embeds: [cfembed], components: [] });
				await message.channel.send(`<@${cfmsgmember.id}> warned for **attempted to send ${cfstring1l}**.`);
			}
			}

			try {
				slcollect.dispose();
			}
			catch {
				console.log();
			}
		});
	}

	if (message.guildId == ids.guild) {
		if (message.channel.id == ids.channels.muteables[2]) {
			const args = message.content.split(" ");
			const counting = await countdb.find({}).sort({ created_at: -1 });
			if (counting[counting.length].userId == message.member.id) {
				message.delete();
				return;
			}
			else if (message.author.bot == true) {
				message.delete();
				return;
			}

			let parsednumber = parseInt(counting[counting.length].numbercounted);

			if (message.content.startsWith(`${parsednumber += 1}`)) {
				const countingdb = await countdb.create({
					userId: message.member.id,
					numbercounted: args[0],
				});
				await countingdb.save();
				return;
			}
			else {
				message.delete();
				return;
			}
		}
		if (backupbot == 1 && backupbotevents == 0) return;
		const sl = fs.readFileSync("./lists/sl.txt").toString().split("\n");
		const nu = fs.readFileSync("./lists/nu.txt").toString().split("\n");
		const m = fs.readFileSync("./lists/m.txt").toString().split("\n");
		const e = fs.readFileSync("./lists/e.txt").toString().split("\n");
		const args = message.content.substring(PREFIX.length).split(" ");

		for (let argscount = 0; argscount < args.length; argscount++) {
			if (sl.includes(args[argscount])) {
				cftypei = "sl";
				chatfilter();
				return;
			}
			else if (nu.includes(args[argscount])) {
				cftypei = "nu";
				chatfilter();
				return;
			}
			else if (m.includes(args[argscount])) {
				cftypei = "m";
				chatfilter();
				return;
			}
			else if (e.includes(args[argscount])) {
				if (spamchannels.includes(message.channelId)) return;
				if (message.author.bot) return;
				cftypei = "e";
				chatfilter();
				return;
			}
		}
	}

	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return;
	const args = message.content.substring(PREFIX.length).split(" ");

	switch (args[0].toLowerCase()) {
	// Food Commands
	case "salmon": {
		message.reply("Would you like your salmon `raw` or `cooked`? You could also `cancel` if you don't want your salmon. (Please answer in 15 seconds)");
		const filter = sm => sm.member == message.member;
		const collector = message.channel.createMessageCollector({ filter, time: 15000 });

		collector.on("collect", sm => {
			if (sm.content == "cooked") {
				message.reply("We just ran out of salmon. Go buy one and we will cook it for ya.");
			}
			else if (sm.content == "cancel") {
				message.reply("Salmons are tasty imo, just eat some.");
			}
			else if (sm.content == "raw") {
				message.reply("Here's your invisible raw salmon.");
			}

		});

		collector.on("end", function() {
			return;
		});
		break;
	}
	case "apple": {
		message.reply("OK. Here's your golden apple.. Use your imagination to see the apple.");
		message.channel.send("🍎");
		break;
	}
	case "pie": {
		message.reply("OK. Here's your *pre-baked* pie.");
		message.channel.send("🥧");
		break;
	}
	case "candy": {
		message.reply("OK. Oops, it went out of stock, never come back! (No refund)");
		break;
	}
	// Fun commands
	case "door": {
		message.reply("🚪");
		break;
	}
	case "8ball": {
		message.channel.sendTyping();
		const eballerrembed = new EmbedBuilder()
			.setDescription("**8ball Command Usage**")
			.addFields([{ name: "`8ball [Your question]`", value: "It's just that simple." }])
			.setColor(0xff0000)
			.setTimestamp()
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

		const eballq = args.slice(1).join(" ");
		if (!eballq) return message.reply({ embeds: [eballerrembed] });

		const eightball = [
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
			"🔴Hell nah.",
			"🔴Very doubtful.",
		];

		message.reply(`Your question: ${eballq} \rThe fortune teller: ${eightball[Math.floor(Math.random() * eightball.length)]}`);
		break;
	}
	case "coinflip": {
		const coinflip = [
			"Your coin landed on **TAIL**.",
			"Your coin landed on **HEADS**.",
		];

		const cfwait = require("util").promisify(setTimeout);

		const cfmsg = await message.reply("Flipping the coin...");
		await message.channel.sendTyping();
		await cfwait(5000);
		await cfmsg.edit(coinflip[Math.floor(Math.random() * coinflip.length)]);
		break;
	}
	case "kill": {
		const iUser = message.mentions.members.first();
		if (!iUser) return message.reply("Please ping someone to kill or you are gonna kill yourself.");

		const kill = [
			`<@${iUser.id}> has been toasted like some bread.`,
			`<@${iUser.id}> accidentally stuck his head in the washing machine and got his head washed off.`,
			`<@${iUser.id}>'s beard got pulled off and he lost too much blood and died. RIP.`,
			`<@${iUser.id}> jumped into a swimming pool, but he forgot the water was cleared out last week because christmas is coming.`,
			`<@${iUser.id}> jumped into a swimming pool, but he suddenly forgot how to swim.`,
			`<@${iUser.id}> is spreading butter on to his bread, but he accidentally used the knife too hard and killed himself.`,
			`<@${iUser.id}> is trying to make a bomb and blow Tonald Drump into pieces, but he accidentally pressed the blow up button and blew himself up.`,
			`<@${iUser.id}> got a gun and didn't know how to hold it. He thought the end of the gun was where to point to himself. Then he tries it at the wall. Not to mention what happened.`,
			`<@${iUser.id}> was robbing a bank alone. He shot the security and the bullet hit the wall. Then the bullet reflected and shot back into himself.`,
			`<@${iUser.id}> wanted a dive in the ocean. Instead of swimming, his leg was CLEAN cut by the blade of a boat.`,
		];

		message.reply(kill[Math.floor(Math.random() * kill.length)]);
		break;
	}
	case "shutdown": {
		const shutdownerrembed = new EmbedBuilder()
			.setDescription("**Shutdown Command Usage**")
			.addFields([{ name: "`shutdown <@someone>`", value: "It's just that simple." }])
			.setColor(0xff0000)
			.setTimestamp()
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

		const sdmUser = message.member;
		const sdUser = message.mentions.members.first();
		const wait = require("util").promisify(setTimeout);
		if (!sdUser) return message.reply({ embeds: [shutdownerrembed] });

		const msg = await message.channel.send(`Prepare to shutdown ${sdUser.id}'s device.`);
		await wait(2500);
		await msg.edit("Starting process...");
		await wait(2500);
		await msg.edit("Obtaining IP address...");
		await wait(Math.floor(Math.random() * 25000) + 5000);
		await msg.edit("IP address found.");
		await wait(5000);
		await msg.edit(`Failed to shutdown ${sdUser.id}'s device. Manual shutdown needed.`);
		await wait(5000);
		await msg.delete();

		const embed = new EmbedBuilder()
			.setTitle("**Remote Shutdown**")
			.setColor("Random")
			.addFields([
				{ name: "Assassin", value: `<@${sdmUser.id}>` },
				{ name: "Target", value: `<@${sdUser.id}>` },
				{ name: "Target IP", value: "127.0.0.1" },
				{ name: "Procedures", value: "___Windows Only___" },
				{ name: "___Follow Carefully____", value: "Open Command Prompt or `cmd` with Administrator Permissions, type `shutdown /i` and hit enter. Press add on the pop-up and type in the Target IP, then press OK. Then choose for a shutdown or a restart and type a message. Press OK and enjoy the show of someone freaking out." },
			])
			.setTimestamp()
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		message.reply({ embeds: [embed] });
		break;
	}
	case "meme": {
		message.channel.sendTyping();
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
			"AdviceAnimals",
		];
		const memeRandomizer = memeSource[Math.floor(Math.random() * memeSource.length)];
		const memeImage = await randomPuppy(memeRandomizer);

		const memeembed = new EmbedBuilder()
			.setColor("Random")
			.setImage(memeImage)
			.setTitle("Here's your meme, mom.")
			.setURL(`https://reddit.com/r/${memeRandomizer}`)
			.setTimestamp()
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
		message.reply({ embeds: [memeembed] });
		break;
	}
	case "rps": {
		const rpspUser = message.mentions.members.first();
		const rpsUser = message.member.id;

		const rpswp = [
			`<@${rpsUser}> You have chosen :rock:!\r ${rpspUser} You have chosen :scissors:! \r <@${rpsUser}> **YOU WON!**`,
			`<@${rpsUser}> You have chosen :scissors:!\r ${rpspUser} You have chosen :rock:! \r ${rpspUser} **YOU WON!**`,
			`<@${rpsUser}> You have chosen :roll_of_paper:!\r ${rpspUser} You have chosen :scissors:! \r ${rpspUser} **YOU WON!**`,
			`<@${rpsUser}> You have chosen :scissors:!\r ${rpspUser} You have chosen :roll_of_paper:! \r <@${rpsUser}> **YOU WON!**`,
			`<@${rpsUser}> You have chosen :rock:!\r ${rpspUser} You have chosen :roll_of_paper:! \r ${rpspUser} **YOU WON!**`,
			`<@${rpsUser}> You have chosen :roll_of_paper:!\r ${rpspUser} You have chosen :rock:! \r <@${rpsUser}> **YOU WON!**`,
		];

		const rpswb = [
			`<@${rpsUser}> You have chosen :rock:!\r  The bot have have chosen :scissors:! \r <@${rpsUser}> **YOU WON!**`,
			`<@${rpsUser}> You have chosen :scissors:!\r The bot have chosen :rock:! \r **THE BOT WON!**`,
			`<@${rpsUser}> You have chosen :roll_of_paper:!\r The bot have chosen :scissors:! \r **THE BOT WON!**`,
			`<@${rpsUser}> You have chosen :scissors:!\r The bot have chosen :roll_of_paper:! \r <@${rpsUser}> **YOU WON!**`,
			`<@${rpsUser}> You have chosen :rock:!\r The bot have chosen :roll_of_paper:! \r **THE BOT WON!**`,
			`<@${rpsUser}> You have chosen :roll_of_paper:!\r The bot have chosen :rock:! \r <@${rpsUser}> **YOU WON!**`,
		];

		if (!args[1]) {
			const bwait = require("util").promisify(setTimeout);
			const bmsg = await message.reply("**Please wait 5 seconds to proceed.**  \rYou have chosen to play 'Rock-Paper-Scissors' with the bot. The process is automatic and generated by the bot. \r*DDos is provided by RoadFlare*");
			await bwait(5000);
			bmsg.edit(rpswb[Math.floor(Math.random() * rpswb.length)]);
		}
		else {
			const rpswait = require("util").promisify(setTimeout);
			const rpshmsg = await message.reply("**Please wait 10 seconds to proceed.**  \rYou have chosen to play 'Rock-Paper-Scissors' with the bot. The process is automatic and generated by the bot. \r*DDos is provided by RoadFlare*");
			await rpswait(10000);
			rpshmsg.edit(rpswp[Math.floor(Math.random() * rpswp.length)]);
		}
		break;
	}
	// Info
	case "botinfo": {
		const biembed = new EmbedBuilder()
			.setDescription("**Bot Info**")
			.setColor("Random")
			.addFields([
				{ name: "Bot Username", value: bot.user.tag },
				{ name: "Bot Creation Date", value: `<t:${Math.round(bot.user.createdTimestamp / 1000)}:F>` },
				{ name: "Bot Owner/Creator", value: "<@428445352354643968>" },
				{ name: "Bot Online Since", value: `<t:${Math.round(bot.readyTimestamp / 1000)}:F> (${Math.round(bot.uptime / 10000)} minute(s))` },
				{ name: "Bot joined guilds", value: bot.guilds.cache.map(guild => guild.name).toString() },
			])
			.setAuthor({ name: bot.user.tag, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
			.setTimestamp()
			.setThumbnail(bot.user.avatarURL({ size: 4096, extension: "png" }))
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		message.channel.send({ embeds: [biembed] });
		break;
	}
	case "serverinfo": {
		const siembed = new EmbedBuilder()
			.setDescription("**Server Info**")
			.setColor("Random")
			.addFields([
				{ name: "**Server General**", value: "​" },
				{ name: "Server Name", value: `${message.guild.name} (${message.guild.nameAcronym})`, inline: true },
				{ name: "Server ID", value: message.guild.id, inline: true },
				{ name: "Server Description", value: `${message.guild.description}` },
				{ name: "Server Owner", value: `<@${message.guild.ownerId}>`, inline: true },
				{ name: "Server Creation Date", value: `<t:${Math.round(message.guild.createdTimestamp / 1000)}:F>`, inline: true },
				{ name: "Server Member Count", value: `${message.guild.memberCount}`, inline: true },
				{ name: "Server Language", value: `${message.guild.preferredLocale}`, inline: true },
				{ name: "Server Nitro Boost Tier", value: `${message.guild.premiumTier}`, inline: true },
				{ name: "Server Rules Channel", value: `${message.guild.rulesChannel}`, inline: true },
				{ name: "**Server Values**", value: "​" },
				{ name: "Server Features", value: `${message.guild.features}` },
				{ name: "Server Explicit Content Filter", value: `${message.guild.explicitContentFilter}`, inline: true },
				{ name: "Server is Large", value: `${message.guild.large}`, inline: true },
				{ name: "Server Maximum Members", value: `${message.guild.maximumMembers}`, inline: true },
				{ name: "Server Multi-Factor Authentication Level", value: `${message.guild.mfaLevel}`, inline: true },
				{ name: "Server NSFW Level", value: `${message.guild.nsfwLevel}`, inline: true },
				{ name: "Server Partnered", value: `${message.guild.partnered}`, inline: true },
				{ name: "Server Verification Level", value: `${message.guild.verificationLevel}`, inline: true },
				{ name: "Server Verified", value: `${message.guild.verified}`, inline: true },
				{ name: "**Server Voice**", value: "​" },
				{ name: "Server AFK Channel", value: `${message.guild.afkChannel}`, inline: true },
				{ name: "Server AFK Timeout", value: `${message.guild.afkTimeout} seconds`, inline: true },
				{ name: "Server Maximum Bitrate", value: `${message.guild.maximumBitrate}`, inline: true },
				{ name: "Server Maximum Member in Video VC", value: `${message.guild.maxVideoChannelUsers}` },
			])
			.setThumbnail(message.guild.iconURL({ size: 4096, extension: "png" }))
			.setTimestamp()
			.setThumbnail(message.guild.iconURL({ size: 4096, extension: "png" }))
			.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ size: 4096, extension: "png" }) })
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		message.channel.send({ embeds: [siembed] });
		break;
	}
	case "welcome": {
		const wembed = new EmbedBuilder()
			.setDescription(`**Welcome to ${message.member.guild.name}!**`)
			.setColor("Random")
			.addFields([
				{ name: `Welcome, ${message.member.nickname}!`, value: `Have a great time in ${message.member.guild.name}!` },
				{ name: "*Psst, here are some tips!*", value: "Read the rules (<#651410686705926145>) before you continue your exploration as they are crucial. You can check <#922778404988805190> for server related announcements and <#740870989134561331> for Youtube or content creating related announcements. There's more for you to discover!" },
			])
			.setTimestamp()
			.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) })
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
		try {
			message.reply({ embeds: [wembed] });
		}
		catch {
			console.log();
			message.channel.send({ embeds: [wembed] });
		}
		break;
	}
	case "help": {
		if (args[1] == "food") {
			const fembed = new EmbedBuilder()
				.setDescription("**🍴Acto Utils Restaurant Menu🍴**")
				.addFields(
					{ name: "`?aapple`", value: "Get a free NORMAL apple", inline: true },
					{ name: "`?acandy`", value: "Get a free sweet candy", inline: true },
					{ name: "`?apie`", value: "Get a free pie", inline: true },
					{ name: "`?asalmon`", value: "Get salmon, raw or cooked.", inline: true },
				)
				.setColor("Random")
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) });
			message.channel.send({ embeds: [fembed] });
		}
		else if (args[1] == "fun") {
			const fuembed = new EmbedBuilder()
				.setDescription("**🏰Acto Utils Theme Park🏰**")
				.addFields(
					{ name: "`?a8ball [question]`", value: "Fortune telling ball", inline: true },
					{ name: "`?acoinflip`", value: "Flip a coin!", inline: true },
					{ name: "`?adoor`", value: "Why do I still have this command", inline: true },
					{ name: "`?ashutdown [someone]`", value: "Things about to get messy when you turn off someone's phone or computer.", inline: true },
					{ name: "`?ameme`", value: "Works half of the time", inline: true },
					{ name: "`?arps`", value: "Play rock paper scissors against a bot", inline: true },
					{ name: "`?akill [someone]`", value: "Basically a roast but renamed.", inline: true },
				)
				.setColor("Random")
				.setTimestamp()
				.setFooter({ text: "Parameters: [mandatory], <optional>; " + hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) });
			message.channel.send({ embeds: [fuembed] });
		}
		else if (args[1] == "info") {
			const iembed = new EmbedBuilder()
				.setDescription("**ℹ️Acto Utils Help Deskℹ️**")
				.addFields(
					{ name: "`?abotinfo`", value: "Acto Utils' Information" },
					{ name: "`?aserverinfo`", value: "Server Information" },
					{ name: "`/userinfo <someone>`", value: "User information" },
					{ name: "User Information (User Applications)", value: "User Information" },
					{ name: "`?awelcome`", value: "Welcome message if you've lost it." },
					{ name: "`/ping`", value: "The latency of the bot and the Discord API" },
				)
				.setTimestamp()
				.setColor("Random")
				.setFooter({ text: "Parameters: [mandatory], <optional>; " + hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) });
			message.channel.send({ embeds: [iembed] });
		}
		else if (args[1] == "mod") {
			if (!(message.member.roles.cache.has(ids.roles.leadmod) || message.member.roles.cache.has(ids.roles.mod) || message.member.roles.cache.has(ids.roles.trialmod) || message.member.roles.cache.has(ids.roles.acto))) return message.channel.send("You need permissions to use this command.");

			const moembed = new EmbedBuilder()
				.setDescription("**⚒️Moderation Menu⚒️**")
				.addFields(
					{ name: "`/kick [someone] <reason>`", value: "Kick member ", inline: true },
					{ name: "`/ban permanent [someone] [keep-messages?] <reason>`", value: "Permanently Ban member", inline: true },
					{ name: "`/ban temporary [someone] [duration] [keep-messages?] <reason>`", value: "Temporarily ban member", inline: true },
					{ name: "`/ban unban [userID]`", value: "Unban a member", inline: true },
					{ name: "`/mute permanent [someone] <reason>`", value: "Permanently Mute member", inline: true },
					{ name: "`/mute temporary [someone] [duration] <reason>`", value: "Temporarily mute member", inline: true },
					{ name: "`/mute unmute [someone]`", value: "Unmute a muted member", inline: true },
					{ name: "`/role give [someone] [role]`", value: "Add a role to a member", inline: true },
					{ name: "`/role remove [someone] [role]`", value: "Remove a role from a member", inline: true },
					{ name: "`/grant [someone]`", value: "Gives a member permissions", inline: true },
					{ name: "`/lockdown lock [range] [announce] <announcemsg> <autounlock-duration>`", value: "Locks the server", inline: true },
					{ name: "`/lockdown unlock [range] [announce]`", value: "Unlocks the server", inline: true },
					{ name: "`/clear [number (1-99)] <someone>`", value: "Bulk delete messages", inline: true },
					{ name: "`/cooldown [duration]`", value: "Sets a slowmode for the channel", inline: true },
					{ name: "`/warn warn [someone] <reason>`", value: "Warn a member", inline: true },
					{ name: "`/warn delete [warnid]`", value: "Delete a warning", inline: true },
					{ name: "`/restart <delay-duration>`", value: "Restart the bot", inline: true },
				)
				.setTimestamp()
				.setColor("Random")
				.setFooter({ text: "Parameters: [mandatory], <optional>; " + hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) });
			message.channel.send({ embeds: [moembed] });
		}
		else {
			const hembed = new EmbedBuilder()
				.setDescription("**❓Help Menu❓**")
				.addFields(
					{ name: "🍴Acto Utils Restaurant Menu🍴", value: "`?ahelp food`", inline: true },
					{ name: "🏰Acto Utils Theme Park🏰", value: "`?ahelp fun`", inline: true },
					{ name: "ℹ️Acto Utils Help Deskℹ️", value: "`?ahelp info`", inline: true },
					{ name: "⚒️Moderation Menu⚒️", value: "`?help mod`", inline: true },
				)
				.setColor("Random")
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 4096, extension: "png" }) });
			message.channel.send({ embeds: [hembed] });
		}
		break;
	}
	case "testcommand": {
		// @ts-ignore
		if (!message.member.id == "428445352354643968") return;
		message.reply("Working");
		break;
	}
	case "deeznuts": {
		message.delete();
		message.reply("deez nuts 🥜");
	}
	}
});

bot.login(token);