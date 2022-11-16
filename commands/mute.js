const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const mute = require("../Schemas/MuteSchema.js");

module.exports = {
	type: "slash",
	name: "mute",
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("mute a member")
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand.setName("permanent")
				.setDescription("Mutes a member permanently.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to permanently mute.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason to permanently mute member."),
				),
		)
		.addSubcommand(subcommand =>
			subcommand.setName("temporary")
				.setDescription("Mute a member temporarily.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to temporarily mute.")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("duration")
						.setDescription("The time to temporarily mute member. (Format: TimeUnit, Example: 10d, 1h, 10s")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason to temporarily mute member.")),
		)
		.addSubcommand(subcommand =>
			subcommand.setName("unmute")
				.setDescription("Unmute a member.")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to unmute.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("reason")
						.setDescription("Reason to unmute member.")),

		),
	async execute(interaction) {
		const { ids } = require("../index.js");
		switch (interaction.options._subcommand) {
		case "permanent": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";

			if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			const muteChannel = interaction.guild.channels.fetch(ids.channels.logging.mod);
			if (!muteChannel) return;

			const membed = new EmbedBuilder()
				.setDescription("**Member Muted**")
				.setColor(0xff0000)
				.addFields([
					{ name: "Muted Member", value: `<@${user.user.id}> (${user.user.id})` },
					{ name: "Muted By", value: `<@${interaction.member.user.id}> (${interaction.member.user.id})` },
					{ name: "Muted At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Muted In", value: `<#${interaction.channelId}>` },
					{ name: "Muted For", value: `${reason}` },
					{ name: "Mute Type", value: "Permanent Infinite" },
				])
				.setAuthor({ name: `${user.user.tag}`, iconURL: user.user.avatarURL({ size: 4096, extension: "png" }) })
				.setTimestamp()
				.setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL({ size: 4096, extension: "png" }) });
			const muterole = interaction.guild.roles.fetch(ids.roles.muted);
			if (!muterole) return;

			const mutedb = await mute.create({
				username: user.user.username,
				userId: user.user.id,
				duration: "0",
				reason: reason,
				adminusername: interaction.username,
				adminId: interaction.member.user.id,
				permanent: true,
				time: interaction.createdTimestamp,
			});
			try {
				await mutedb.save();
			}
			catch {
				console.log();
				interaction.reply({ content: "An error has occurred. This could be due to failing to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The mute has been aborted.", ephemeral: true });
				return;
			}

			try {
				user.roles.add(muterole.id);
				user.timeout(2419200000, reason);
			}
			catch {
				console.log();
				interaction.reply({ content: "An error has occurred. This could be due to unable to mute member. You can try again, but if the problem persists, please contact the bot owner. The mute has been aborted.", ephemeral: true });
				try {
					user.roles.remove(ids.roles.muted);
					user.timeout(null, "Failure to mute");
				}
				catch {
					console.log();
					interaction.catchUp({ content: "An error has occurred. This could be due not being able to remove role or unmute member. Please manually remove role Muted and un-timeout member.", ephemeral: true });
				}
				return;
			}

			try {
				user.send({ content: `You have been permanently muted in **${interaction.guild.name}** for **${reason}**` });
			}
			catch {
				console.log();
			}

			muteChannel.send({ embeds: [membed] });
			interaction.reply(`<@${user.user.id}> (**${user.user.username}**) has been permanently muted for **${reason}**.`);
			break;
		}
		case "temporary": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			let time = ms(interaction.options.get("duration").value);
			const timea = ms(ms(interaction.options.get("duration").value));
			if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			if (!time) {
				interaction.reply({ content: "Please enter a time to mute the member. The mute has been aborted.", ephemeral: true });
				return;
			}

			const membed = new EmbedBuilder()
				.setDescription("**Member Muted**")
				.setColor(0xff0000)
				.addFields([
					{ name: "Muted Member", value: `<@${user.user.id}> (${user.user.id})` },
					{ name: "Muted By", value: `<@${interaction.member.user.id}> (${interaction.member.user.id})` },
					{ name: "Muted At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Muted In", value: `<#${interaction.channelId}>` },
					{ name: "Muted For", value: `${reason}` },
					{ name: "Muted Duration", value: `${ms(time)}` },
					{ name: "Mute Type", value: "Temporary Finite" },
				])
				.setAuthor({ name: `${user.user.tag}`, iconURL: user.user.avatarURL({ size: 4096, extension: "png" }) })
				.setTimestamp()
				.setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL({ size: 4096, extension: "png" }) });
			const muterole = interaction.guild.roles.fetch(ids.roles.muted);
			if (!muterole) return interaction.reply({ content: "Mute role was not found", ephemeral: true });
			const muteChannel = interaction.guild.channels.fetch(ids.channels.logging.mod);
			if (!muteChannel) return interaction.reply({ content: "Mute channel was not found", ephemeral: true });

			const mutedb = await mute.create({
				username: user.user.username,
				userId: user.user.id,
				duration: time,
				reason: reason,
				adminusername: interaction.member.user.username,
				adminId: interaction.member.user.id,
				permanent: false,
				time: interaction.createdTimestamp,
				// @ts-ignore
				unmutetime: Math.round((interaction.createdTimestamp += time) / 1000),
			});
			try {
				await mutedb.save();
			}
			catch {
				console.log();
				interaction.replay({ content: "An error has occurred this could be due to not being able to save data to database. You should contact the bot owner to get this issue fixed as it is most likely a bot issue. The mute has been aborted.", ephemeral: true });
				return;
			}

			if (parseInt(time) > 2419200000) {
				time = "2419200000";
			}

			try {
				user.roles.add(ids.roles.muted);
				user.timeout(time, reason);
			}
			catch {
				console.log();
				interaction.reply({ content: "An error has occurred. This could be due not being able to add role or mute member. You can try again, but if the problem persists, please contact the bot owner. The mute has been aborted.", ephemeral: true });
				try {
					user.roles.remove(ids.roles.muted);
					user.timeout(null, "Failure to mute");
				}
				catch {
					console.log();
					interaction.catchUp({ content: "An error has occurred. This could be due not being able to remove role or unmute member. Please manually remove role Muted and un-timeout member.", ephemeral: true });
				}
				return;
			}

			try {
				user.send({ content: `You have been temporarily muted for **${timea}** in **${interaction.guild.name} for **${reason}**` });
			}
			catch {
				console.log();
			}

			muteChannel.send({ embeds: [membed] });
			interaction.reply(`<@${user.id}> (**${user.user.username}**) has been temporarily muted for **${reason}**.`);
			break;
		}
		case "unmute": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";

			if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			if (user.isCommunicationDisabled() == true || user.roles.cache.has(ids.roles.muted)) {

				if (user.isCommunicationDisabled() == true) {
					try {
						user.timeout(null, reason);
					}
					catch {
						console.log();
						interaction.reply({ content: "An error has occurred. This could be due to unable to unmute member. You can try again, but if the problem persists, please contact the bot owner. The unmute has been aborted.", ephemeral: true });
						return;
					}
				}
				else if (user.roles.cache.has(ids.roles.muted)) {
					try {
						user.roles.remove(ids.roles.muted);
					}
					catch {
						console.log();
						interaction.reply({ content: "An error has occurred. This could be due to unable to unmute member. You can try again, but if the problem persists, please contact the bot owner. The unmute has been aborted.", ephemeral: true });
						return;
					}
				}

				const embed = new EmbedBuilder()
					.setDescription("**Member Unmuted**")
					.setColor(0xff0000)
					.addFields([
						{ name: "Unmuted Member", value: `<@${user.user.id}> (${user.user.id})` },
						{ name: "Unmuted By", value: `<@${interaction.user.id}> (${interaction.user.id})` },
						{ name: "Unmuted At", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
						{ name: "Unmuted In", value: `<#${interaction.channelId}>` },
						{ name: "Unmuted For", value: `${reason}` },
						{ name: "Unmute Type", value: "UNMUTE Permanent Infinite" },
					])
					.setAuthor({ name: `${user.user.tag}`, iconURL: user.user.avatarURL({ size: 4096, extension: "png" }) })
					.setTimestamp()
					.setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL({ size: 4096, extension: "png" }) });
				interaction.reply(`<@${user.id}> (**${user.user.username}**) has been unmuted.`);
				const muteChannel = interaction.guild.channels.fetch(ids.channels.logging.mod);
				muteChannel.send({ embeds: [embed] });
			}
			else {
				interaction.reply({ content: "The user isn't muted.", ephemeral: true });
			}
		}
		}
	},
};