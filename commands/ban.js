const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const ms = require("ms");
const ban = require("../Schemas/BanSchema.js");


module.exports = {
	type: "slash",
	name: "ban",
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member")
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName("permanent")
				.setDescription("Permanently ban a member.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to temporarily ban.")
						.setRequired(true),
				)
				.addBooleanOption(option =>
					option.setName("keep")
						.setDescription("Keep member's messages. If not, bot will delete up to 7 days of the member's past messages.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason to ban member.")
						.setRequired(false),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName("temporary")
				.setDescription("Temporarily ban a member.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to ban temporarily.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("duration")
						.setDescription("Duration of temporary ban.")
						.setRequired(true),
				)
				.addBooleanOption(option =>
					option.setName("keep")
						.setDescription("Keep member's messages. If not, bot will delete up to 7 days of the member's past messages.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason to ban member.")
						.setRequired(false),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName("unban")
				.setDescription("Unban a banned member")
				.addStringOption(option =>
					option.setName("userid")
						.setDescription("The ID of the user that should be unbanned")
						.setRequired(true),
				)),
	async execute(interaction) {
		const { bot } = require("../index.js");
		switch (interaction.options._subcommand) {
		case "permanent": {
			const user = interaction.options.getUser("member");
			const member = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			const keep = interaction.options.getBoolean("keep");
			if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			if (!user) return interaction.reply({ content: "There was no member specified. Ban has been aborted.", ephemeral: true });

			const bembed = new EmbedBuilder()
				.setDescription("**Member Banned**")
				.setColor(0xff0000)
				.addFields([
					{ name: "Banned Member", value: `<@${user.id}> (**<@${user.id}**)` },
					{ name: "Banned By", value: `<@${interaction.user.id}> (**${interaction.user.id}**)` },
					{ name: "Banned In", value: `<#${interaction.channelId}>` },
					{ name: "Banned At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Banned For", value: reason },
				])
				.setTimestamp()
				.setAuthor({ name: `${user.tag}`, iconURL: user.avatarURL({ size: 4096, extension: "png" }) })
				.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ size: 4096, extension: "png" }) });

			if (keep == false) {
				try {
					interaction.guild.members.ban(member, { deleteMessageDays: 7, reason: reason });
				}
				catch {
					console.log();
					interaction.reply({ content: "An error has occurred. This could be due to user unbannable. You can try again, but if the problem persists, please contact the bot owner. Ban has been aborted.", ephemeral: true });
					return;
				}
			}
			else {
				try {
					interaction.guild.members.ban(user, { deleteMessageDays: 0, reason: reason });
				}
				catch {
					console.log();
					interaction.reply({ content: "An error has occurred. This could be due to user unbannable. You can try again, but if the problem persists, please contact the bot owner.", ephemeral: true });
					return;
				}
			}
			try {
				user.send(`You have been banned permanently from ${interaction.guild.name} for: ${reason}.`);
			}
			catch {
				console.log();
			}
			interaction.reply(`**${user.username}** was banned for **${reason}**.`);

			const banchannel = interaction.guild.channels.fetch("885808423483080744");
			if (!banchannel) return interaction.reply("Could not find server logs channel.");
			banchannel.send({ embeds: [bembed] });

			const bandb = await ban.create({
				username: user.username,
				userId: user.id,
				reason: reason,
				adminusername: interaction.user.username,
				adminId: interaction.user.id,
				permanent: true,
				bantime: interaction.createdTimestamp,
			});
			await bandb.save();
			break;
		}
		case "temporary": {
			const user = interaction.options.getUser("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			const time = interaction.options.get("duration").value;
			const keep = interaction.options.getBoolean("keep");
			if (!time) return interaction.reply({ content: "Please include the ban duration. Ban has been aborted.", ephemeral: true });
			else if (time == undefined) return interaction.reply({ content: "Please enter a valid time, in the format of `1h/1hour`. Ban has been aborted." });
			if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			if (!user) return interaction.reply({ content: "There was no member specified.", ephemeral: true });

			const banchannel = interaction.guild.channels.fetch("885808423483080744");
			if (!banchannel) return interaction.reply({ content: "Could not find server logs channel. Ban has been aborted.", ephemeral: true });

			const bembed = new EmbedBuilder()
				.setDescription("**Member Temporarily Banned**")
				.setColor(0xff0000)
				.addFields([
					{ name: "Temporarily Banned Member", value: `<@${user.id}> (${user.id})` },
					{ name: "Temporarily Banned By", value: `<@${interaction.user.id}> {${interaction.user.id}}` },
					{ name: "Temporarily Banned In", value: `<#${interaction.channelId}>` },
					{ name: "Temporarily Banned At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Temporarily Banned For", value: `${reason}` },
					// @ts-ignore
					{ name: "Temporary Ban Duration", value: `${ms(ms(time))} (or until <t:${(interaction.createdTimestamp += ms(time)) / 1000}:F>)` },
				])
				.setTimestamp()
				.setAuthor({ name: `${user.tag}`, iconURL: user.avatarURL({ size: 4096, extension: "png" }) })
				.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ size: 4096, extension: "png" }) });

			const bandb = await ban.create({
				username: user.username,
				userId: user.id,
				duration: ms(time),
				reason: reason,
				adminusername: interaction.user.username,
				adminId: interaction.user.id,
				permanent: false,
				bantime: interaction.createdTimestamp,
				// @ts-ignore
				unbantime: Math.round((interaction.createdTimestamp += ms(time)) / 1000),
			});
			try {
				await bandb.save();
			}
			catch {
				interaction.reply({ content: "An error has occurred. This could be due to unable to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The ban has been aborted.", ephemeral: true });
			}

			if (keep == true) {
				try {
					await interaction.guild.members.ban(user, { deleteMessageDays: 7, reason: reason });
				}
				catch {
					console.log();
					interaction.reply({ content: "An error has occurred. This could be due to user unbannable. You can try again, but if the problem persists, please contact the bot owner.", ephemeral: true });
					return;
				}
			}
			else {
				try {
					await interaction.guild.members.ban(user, { deleteMessageDays: 0, reason: reason });
				}
				catch {
					console.log();
					interaction.reply({ content: "An error has occurred. This could be due to user unbannable. You can try again, but if the problem persists, please contact the bot owner.", ephemeral: true });
					return;
				}
			}
			interaction.reply(`**${user.username}** was temporarily banned for ${time} for **${reason}**.`);
			try {
				user.send(`You have been banned from ${interaction.guild.name} temporarily for ${time} for **${reason}**.`);
			}
			catch {
				console.log();
			}
			banchannel.send({ embeds: [bembed] });
			break;
		}
		case "unban": {
			if (!(interaction.member.roles.cache.has("608937618259836930") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			const user = interaction.options.get("userid").value;

			try {
				await interaction.guild.bans.fetch(user);
			}
			catch {
				interaction.reply({ content: "An error has occurred. This could be due to non-existent user or user not banned.", ephemeral: true });
				return;
			}
			try {
				await interaction.guild.members.unban(user);
			}
			catch {
				interaction.reply({ content: "An error has occurred. This could be due to user not being able to be unbanned. You can try again, but if this keeps happening, please notify the bot owner.", ephemeral: true });
				return;
			}

			const ubembed = new EmbedBuilder()
				.setDescription("**Member Unbanned**")
				.setColor(0xff0000)
				.addFields([
					{ name: "Unbanned Member", value: `<@${user}> (${user})` },
					{ name: "Unbanned By", value: `<@${interaction.user.id}> (${interaction.user.id})` },
					{ name: "Unbanned At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
				])
				.setTimestamp()
				.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ size: 4096, extension: "png" }) });

			const userfetched = await bot.users.fetch(user);
			if (!userfetched) {
				console.log();
			}
			else {
				ubembed.setAuthor({ name: `${userfetched.tag}`, iconURL: userfetched.avatarURL({ size: 4096, extension: "png" }) });
			}

			const unban2Channel = interaction.guild.channels.cache.find(channel => channel.name === "aot-logs");
			if (!unban2Channel) return interaction.reply({ content: "Could not find server logs channel.", ephemeral: true });

			unban2Channel.send({ embeds: [ubembed] });

			interaction.reply(`<@${user}> has been unbanned.`);
			break;
		}
		}
	},
};