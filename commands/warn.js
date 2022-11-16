const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warn = require("../Schemas/WarnSchema.js");

module.exports = {
	type: "slash",
	name: "warn",
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Command to warn member, delete and check warns.")
		.setDMPermission(false)
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
		const { bot, hmf, ids } = require("../index.js");
		switch (interaction.options._subcommand) {
		case "warn": {
			if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!" });
			const member = interaction.options.getUser("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			const warnidpre = await warn.find({}).sort({ warnid: 1 });
			let warnidpre2 = parseInt(warnidpre[warnidpre.length].warnId);
			let warnid = warnidpre2 += 1;

			const warndb = await warn.create({
				username: member.username,
				userId: member.id,
				warnId: warnid,
				reason: reason,
				adminusername: interaction.member.user.username,
				adminId: interaction.member.id,
				channel: interaction.channelId,
				time: interaction.createdTimestamp,
			});
			try {
				await warndb.save();
			}
			catch (err) {
				const acto = await bot.users.fetch(ids.members.acto);
				acto.send(`Failed to store Warn 000${warnid} data to DB for <@${member.id}>. Error: \n` + err);
				interaction.reply({ content:`An error has occurred. This could be due to failing to store Warn ${warnid} data to DB. You can try again, but if this keeps happening, please contact the bot owner.`, ephemeral: true });
				return;
			}

			await interaction.reply({ content: `<@${member.id}> has been warned for **${reason}**.` });
			const embed = new EmbedBuilder()
				.setDescription("**Member Warned**")
				.setColor(0xff0000)
				.setFooter({ text: `Case ID: 000${warnid}`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setTimestamp()
				.addFields(
					{ name: "Member Warned", value: `<@${member.id}> (${member.id})` },
					{ name: "Member Warned by", value: `<@${interaction.member.id}> (${interaction.member.id})` },
					{ name: "Member Warned for", value: `${reason}` },
					{ name: "Member Warned at", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Member Warned in", value: `<#${interaction.channelId}>` },
				)
				.setAuthor({ name: member.username, iconURL: member.avatarURL({ size: 4096, extension: "png" }) });

			const warnchannel = interaction.guild.channels.fetch(ids.channel.logging.mod);
			if (!warnchannel) return interaction.reply({ content: "Could not find server logs channel.", ephemeral: true });

			await warnchannel.send({ embeds: [embed] });

			try {
				member.send(`You have been warned for **${reason}** in **${interaction.guild.name}**. \rIf you have any inquiries or opinions with the warn, please use the modmail to message mods and provide the WarnID: \`000${warnid}\``);
			}
			catch (err) {
				console.log(err);
			}

			warnid += 1;

			const warnfetch = await warn.find({ userId: member.id });
			if (!warnfetch) return;
			const warntimes = warnfetch.length;
			const guildmember = interaction.guild.members.fetch(member.id);
			if (warntimes >= 6) {
				try {
					guildmember.timeout(86400000, "6 Warnings Auto-Mute: 24 Hours");
				}
				catch {
					try {
						guildmember.timeout(86400000, "6 Warnings Auto-Mute: 24 Hours");
					}
					catch {
						interaction.followUp({ content: "An error has occurred. The bot has failed to auto mute the warned member for 24 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **24h** due to having **${warntimes}** warnings.`);
				}
				catch {
					console.log(`[Information]: IGNORE. Failed to DM ${member.id} for auto warn mute.`);
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
						interaction.followUp({ content: "An error has occurred. The bot has failed to auto mute the warned member for 12 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **12h** due to having **${warntimes}** warnings.`);
				}
				catch {
					console.log(`[Information]: IGNORE. Failed to DM ${member.id} for auto warn mute.`);
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
						interaction.followUp({ content: "An error has occurred. The bot has failed to auto mute the warned member for 6 hours. Please manually mute the member.", ephemeral: true });
					}
				}
				try {
					member.send(`You have been automatically muted in **${interaction.guild.name}** for **6h** due to having **${warntimes}** warnings.`);
				}
				catch {
					console.log(`[Information]: IGNORE. Failed to DM ${member.id} for auto warn mute.`);
				}
			}
			else {
				try {
					member.send(`You have been warned **${warntimes}** times in **${interaction.guild.name}** in total. Another warn will result in a mute, please be aware of your acts.`);
				}
				catch {
					console.log(`[Information]: IGNORE. Failed to DM ${member.id} for auto warn mute.`);
				}
			}
			break;
		}
		case "delete": {
			if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!" });
			const warnid = interaction.options.getNumber("warnid");

			const warnidquery = await warn.find({ warnId: `${warnid}` });
			if (!warnidquery.length) return interaction.reply({ content: `Warning \`${warnid}\` was not found in the database.` });
			else if (warnidquery.length >= 2) return interaction.reply({ content: `Warning \`${warnid}\` found 2 or more cases, please retry or contact the bot owner.` });

			try {
				await warn.deleteOne({ warnId: `${warnid}` });
			}
			catch {
				interaction.reply({ content: `Failed to delete warning \`${warnid}\` of member <@${warnidquery[0].userId}. Please try again. If the problem persists, please contact the bot owner.`, ephemeral: true });
				return;
			}

			interaction.reply({ content: `Successfully deleted warning \`${warnid}\` of member <@${warnidquery[0].userId}>.` });

			const embed = new EmbedBuilder()
				.setDescription("**Warn Deleted")
				.addFields(
					{ name: "Warn Deleted", value: `WarnID: \`00${warnid}\` of <@${warnidquery[0].userId}> (${warnidquery[0].userId})` },
					{ name: "Warn Deleted At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Warn Deleted By", value: `<@${interaction.user.id}> (${interaction.user.id})` },
					{ name: "Deleted Warn Original Reasoning", value: warnidquery[0].reason },
				)
				.setTimestamp()
				.setColor(0x00ff00)
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });

			try {
				const a = interaction.guild.members.fetch(warnidquery[0].userId);
				if (a) {
					embed.setAuthor({ name: a.tag, iconURL: a.avatarURL({ size: 4096, extension: "png" }) });
				}
				else if (!a) {
					embed.setAuthor({ name: `${warnidquery[0].username}` });
				}
			}
			catch {
				embed.setAuthor({ name: `${warnidquery[0].username}` });
			}

			const channel = interaction.guild.channels.fetch(ids.channels.logging.mod);
			if (!channel) return interaction.reply("Could not find server logs channel.");

			channel.send({ embeds: [embed] });
			break;
		}
		}
	},

};