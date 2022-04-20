const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const ms = require("ms");
const mute = require("../Schemas/MuteSchema.js");

module.exports = {
	type: "slash",
	name: "mute",
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("mute a member")
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
				.setDescription("Unmute a memeber.")
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
		switch (interaction.options._subcommand) {
		case "permanent": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";

			if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("609236733464150037") || interaction.member.roles.cache.has("645832781469057024"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			const muteChannel = interaction.guild.channels.cache.get("885808423483080744");
			if (!muteChannel) return;

			const { hmf } = require("../index.js");

			const membed = new Discord.MessageEmbed()
				.setTitle("Member Permanently Muted")
				.setColor(0xff0000)
				.addField("Muted Member", `<@${user.id}>`)
				.addField("Permanently Muted At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Duration", "Infinite")
				.addField("Responsible Admin", `<@${interaction.member.id}>`)
				.addField("Reason", `${reason}`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
			const muterole = interaction.guild.roles.cache.get("726205475397566505");
			if (!muterole) return;

			user.roles.add(muterole.id);
			muteChannel.send({ embeds: [membed] });

			user.timeout(2419200000, reason);

			const mutedb = await mute.create({
				username: user.username,
				userId: user.id,
				duration: "0",
				reason: reason,
				adminusername: interaction.member.username,
				adminId: interaction.member.id,
				permanent: true,
				time: interaction.createdTimestamp,
			});
			await mutedb.save();

			interaction.reply(`<@${user.id}> (**${user.user.username}**) has been permanently muted for **${reason}**.`);
			break;
		}
		case "temporary": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			let time = ms(interaction.options.get("duration").value);
			if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("609236733464150037") || interaction.member.roles.cache.has("645832781469057024"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			if (!time) {
				return;
			}
			else if (time > 2419200000) {
				time = "2419200000";
			}

			const { hmf } = require("../index.js");

			const membed = new Discord.MessageEmbed()
				.setTitle("Member Temporarily Muted")
				.setColor(0xff0000)
				.addField("Muted Member", `<@${user.id}>`)
				.addField("Temporarily Muted At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Duration", `${ms(time)}`)
				.addField("Responsible Admin", `<@${interaction.member.id}>`)
				.addField("Reason", `${reason}`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
			const muterole = interaction.guild.roles.cache.get("726205475397566505");
			if (!muterole) return;
			const muteChannel = interaction.guild.channels.cache.get("885808423483080744");

			user.roles.add("885808423483080744");
			user.timeout(time, reason).catch(console.log);

			const mutedb = await mute.create({
				username: user.username,
				userId: user.id,
				duration: time,
				reason: reason,
				adminusername: interaction.member.username,
				adminId: interaction.member.id,
				permanent: false,
				time: interaction.createdTimestamp,
				unmutetime: Math.round((interaction.createdTimestamp += time) / 1000),
			});
			await mutedb.save();

			muteChannel.send({ embeds: [membed] });

			interaction.reply(`<@${user.id}> (**${user.user.username}**) has been temporarily muted for **${reason}**.`);
			break;
		}
		case "unmute": {
			const user = interaction.options.getMember("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";

			if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("609236733464150037") || interaction.member.roles.cache.has("645832781469057024"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });

			if (user.isCommunicationDisabled() == true || user.roles.cache.has("726205475397566505")) {

				if (user.isCommunicationDisabled() == true) {
					user.timeout(null, reason);
				}
				else if (user.roles.cache.has("726205475397566505")) {
					user.roles.remove("726205475397566505");
				}

				const { hmf } = require("../index.js");

				const embed = new Discord.MessageEmbed()
					.setTitle("Member Unmuted")
					.addField("Unmuted Member", `<@${user.id}> (**${user.user.username}**) with ID ${user.id}`)
					.addField("Responsible Admin", `${interaction.user}`)
					.addField("Unmuted At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
					.addField("Reason", `${reason}`)
					.setColor(0x00ff00)
					.setTimestamp()
					.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
				interaction.reply(`<@${user.id}> (**${user.user.username}**) has been unmuted.`);
				const muteChannel = interaction.guild.channels.cache.get("885808423483080744");
				muteChannel.send({ embeds: [embed] });
			}
			else {
				interaction.reply({ content: "The user isn't muted.", ephemeral: true });
			}
		}
		}
	},
};