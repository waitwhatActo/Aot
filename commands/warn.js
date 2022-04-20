const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
const warn = require("../Schemas/WarnSchema.js");
const path = require("path");

module.exports = {
	type: "slash",
	name: "warn",
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Ability to warn member, delete and check warns.")
		.addSubcommand(subcommand =>
			subcommand.setName("warn")
				.setDescription("Warn a member.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to warn")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason for warn")
						.setRequired(false)))
		.addSubcommand(subcommand =>
			subcommand.setName("query")
				.setDescription("Check warnings of a user")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Target member of warning check (optional)")))
		.addSubcommand(subcommand =>
			subcommand.setName("delete")
				.setDescription("Delete a warning")
				.addNumberOption(option =>
					option.setName("warnid")
						.setDescription("The warnID of the warning to be deleted")
						.setRequired(true))),
	async execute(interaction) {
		switch (interaction.options._subcommand) {
		case "warn": {
			if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!" });
			const member = interaction.options.getUser("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			let warnid = fs.readFileSync(path.join(__dirname, "../lists/warnid.txt")).toString();

			const warndb = await warn.create({
				username: member.username,
				userId: member.id,
				warnId: warnid,
				reason: reason,
				adminusername: interaction.user.username,
				adminId: interaction.member.id,
				channel: interaction.channelId,
				time: interaction.createdTimestamp,
			});
			const { bot } = require("../index.js");
			try {
				await warndb.save();
			}
			catch (err) {
				const acto = bot.users.cache.get("428445352354643968");
				acto.send(`Failed to store Warn ${warnid} data to DB for <@${member.id}>. Error: \n` + err);
				return;
			}
			interaction.reply({ content: `<@${member.id}> has been warned for **${reason}**.` });
			const embed = new Discord.MessageEmbed()
				.setTitle("Member Warned")
				.setColor(0xff0000)
				.setFooter({ text: `Case ID: 000${warnid}`, iconURL: bot.user.avatarURL() })
				.setTimestamp()
				.addField("Member Warned by", `<@${interaction.member.id}> with ID ${interaction.member.id}`)
				.addField("Member Warned", `<@${member.id}> with ID ${member.id}`)
				.addField("Member Warned for", `${reason}`)
				.addField("Member Warned at", `<t:${interaction.createdTimestamp}:F>`)
				.addField("Member Warned in", `<#${interaction.channel.id}>`)
				.setAuthor({ name: member.username, iconURL: member.avatarURL() });

			const warnchannel = interaction.guild.channels.cache.get("885808423483080744");
			if (!warnchannel) return interaction.reply("Could not find server logs channel.");

			warnchannel.send({ embeds: [embed] });

			try {
				member.send(`You have been warned for **${reason}** in **${interaction.guild.name}**. If you have any inquiries or opinions with the warn, please use the modmail to message mods and provide the WarnID: \`${warnid}\``);
			}
			catch (err) {
				const acto = bot.users.cache.get("428445352354643968");
				acto.send(`Unable to DM user <@${member.id}> for warn. (WarnID \`${warnid}\`) Error: \n` + err);
			}

			++warnid;
			fs.writeFileSync(path.join(__dirname, "../lists/warnid.txt"), warnid.toString());

			const warnfetch = await warn.find({ userId: member.id });
			if (!warnfetch) return;
			let warntimes = 1;
			for (; warnfetch.length > 0;) {
				warnfetch.shift();
				warntimes++;
			}
			const guildmember = interaction.guild.members.cache.get(member.id);
			if (warntimes >= 6) {
				guildmember.timeout(86400000, "6 Warnings Auto-Mute: 24 Hours");
				member.send(`You have been automatically muted in **${interaction.guild.name}** for **24h** due to having **${warntimes}** warnings.`);
			}
			else if (warntimes == 4) {
				guildmember.timeout(43200000, "4 Warnings Auto-Mute: 12 Hours");
				member.send(`You have been automatically muted in **${interaction.guild.name}** for **12h** due to having **${warntimes}** warnings.`);
			}
			else if (warntimes == 2) {
				guildmember.timeout(21600000, "2 Warnings Auto-Mute: 6 Hours");
				member.send(`You have been automatically muted in **${interaction.guild.name}** for **6h** due to having **${warntimes}** warnings.`);
			}
			else {
				try {
					member.send(`You have been warned **${warntimes}** times in **${interaction.guild.name}** in total. Another warn will result in a mute, please be aware of your acts.`);
				}
				catch (err) {
					const acto = bot.users.cache.get("428445352354643968");
					acto.send(`Unable to DM user <@${member.id}>. Error: \n` + err);
				}
			}
			break;
		}
		case "query": {
			let member = interaction.options.getUser("member");
			if (!member) member = interaction.user;

			const { hmf, bot } = require("../index.js");

			const embed = new Discord.MessageEmbed()
				.setTitle("Warnings")
				.setAuthor({ name: `${member.username}`, iconURL: member.avatarURL({ dynamic: true }) })
				.setTimestamp()
				.setColor(0xfec13d)
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() });

			const warnquery = await warn.find({ usedId: member });
			let warncount = 0;
			let warnstring = "";
			if (!warnquery) {
				embed.setDescription("No Warning has been found from all records.");

				interaction.reply({ embeds: [embed] });
			}
			else {
				for (; warnquery.length > 0;) {
					warnstring += `\`000${warnquery[0].warnId}\` **${warnquery[0].reason}** • <t:${Math.round(warnquery[0].time / 1000)}:F> \n`;
					warncount++;
					warnquery.shift();
				}
				embed.setDescription(warnstring);
				embed.addField("Total Warnings", `${warncount}`);

				interaction.reply({ embeds: [embed] });
			}
			break;
		}
		case "delete": {
			if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!" });
			const warnid = interaction.options.getNumber("warnid");

			const warnidquery = await warn.find({ warnId: `${warnid}` });
			if (!warnidquery.length) return interaction.reply({ content: `Warning \`${warnid}\` was not found in the database.` });
			else if (warnidquery.legnth >= 2) return interaction.reply({ content: `Warning \`${warnid}\` found 2 or more cases, please retry or contact the developer.` });
			await warn.deleteOne({ warnId: `${warnid}` });
			interaction.reply({ content: `Successfully deleted warning \`${warnid}\` of member <@${warnidquery[0].userId}>.` });

			const { bot, hmf } = require("../index.js");
			const embed = new Discord.MessageEmbed()
				.setTitle("Warn Deleted")
				.addField("Warn Deleted by", `<@${interaction.user.id}>`)
				.addField("WarnID of Deleted Warn", `\`${warnid}\``)
				.addField("Reason of Deleted Warn", warnidquery[0].reason)
				.addField("Warn Deleted for", `<@${warnidquery[0].userId}>`)
				.addField("Warn Deleted at", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.setTimestamp()
				.setColor(0x00ff00)
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() })
				.setAuthor({ author: `${warnidquery[0].username}`, iconURL: interaction.guild.members.cache.get(warnidquery[0].userId).avatarURL({ dynamic: true }) });

			const channel = interaction.guild.channels.cache.get("885808423483080744");
			if (!channel) return interaction.reply("Could not find server logs channel.");

			channel.send({ embeds: [embed] });
			break;
		}
		}
	},

};