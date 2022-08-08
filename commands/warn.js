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
			const warnidpre = await warn.find().sort({ age: -1 });
			console.log(warnidpre);
			let warnidpre2 = parseInt(warnidpre[0].warnId);
			console.log(warnidpre2);
			let warnid = warnidpre2 += 1;
			console.log(warnid);

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
				acto.send(`Failed to store Warn 000${warnid} data to DB for <@${member.id}>. Error: \n` + err);
				interaction.reply({ content:`An error has occured. This could be due to failing to store Warn ${warnid} data to DB. You can try again, but if this keeps happening, please contact the bot owner.`, ephmeral: true });
				return;
			}

			await interaction.reply({ content: `<@${member.id}> has been warned for **${reason}**.` });
			const embed = new Discord.MessageEmbed()
				.setDescription("**Member Warned**")
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
			if (!warnchannel) return interaction.reply({ content: "Could not find server logs channel.", ephmeral: true });

			await warnchannel.send({ embeds: [embed] });

			try {
				member.send(`You have been warned for **${reason}** in **${interaction.guild.name}**. \rIf you have any inquiries or opinions with the warn, please use the modmail to message mods and provide the WarnID: \`000${warnid}\``);
			}
			catch (err) {
				console.log(err);
			}

			++warnid;
			try {
				fs.writeFileSync(path.join(__dirname, "../lists/warnid.txt"), warnid.toString());
			}
			catch {
				interaction.followUp({ content:"Failed to update warnId, immediately contact bot owner.", ephemeral: true });
			}

			const warnfetch = await warn.find({ userId: member.id });
			if (!warnfetch) return;
			let warntimes = 0;
			for (; warnfetch.length > 0;) {
				warnfetch.shift();
				warntimes++;
			}
			const guildmember = interaction.guild.members.cache.get(member.id);
			if (warntimes >= 6) {
				try {
					guildmember.timeout(86400000, "6 Warnings Auto-Mute: 24 Hours");
				}
				catch {
					try {
						guildmember.timeout(86400000, "6 Warnings Auto-Mute: 24 Hours");
					}
					catch {
						interaction.followUp({ content: "An error has occured. The bot has failed to auto mute the warned member for 24 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **24h** due to having **${warntimes}** warnings.`);
				}
				catch (err) {
					console.log(err);
				}
			}
			else if (warntimes == 4) {
				try {
					guildmember.timeout(43200000, "4 Warnings Auto-Mute: 12 Hours");
				}
				catch {
					try {
						guildmember.timeout(43200000, "4 Warnings Auto-Mute: 12 Hours");
					}
					catch {
						interaction.followUp({ content: "An error has occured. The bot has failed to auto mute the warned member for 12 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **12h** due to having **${warntimes}** warnings.`);
				}
				catch (err) {
					console.log(err);
				}
			}
			else if (warntimes == 2) {
				try {
					guildmember.timeout(21600000, "2 Warnings Auto-Mute: 6 Hours");
				}
				catch {
					try {
						guildmember.timeout(21600000, "2 Warnings Auto-Mute: 6 Hours");
					}
					catch {
						interaction.followUp({ content: "An error has occured. The bot has failed to auto mute the warned member for 6 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **6h** due to having **${warntimes}** warnings.`);
				}
				catch (err) {
					console.log(err);
				}
			}
			else {
				try {
					member.send(`You have been warned **${warntimes}** times in **${interaction.guild.name}** in total. Another warn will result in a mute, please be aware of your acts.`);
				}
				catch (err) {
					console.log(err);
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
			else if (warnidquery.legnth >= 2) return interaction.reply({ content: `Warning \`${warnid}\` found 2 or more cases, please retry or contact the bot owner.` });

			try {
				await warn.deleteOne({ warnId: `${warnid}` });
			}
			catch {
				interaction.reply({ content: `Failed to delete warning \`${warnid}\` of member <@${warnidquery[0].userId}. Please try again. If the problem persists, please contact the bot owner.`, ephemeral: true });
				return;
			}

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