const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const ms = require("ms");
const ban = require("../Schemas/BanSchema.js");


module.exports = {
	type: "slash",
	name: "ban",
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member")
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
						.setDescription("Member to ban temporaraily.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option.setName("duration")
						.setDescription("Duration of temporary ban.")
						.setRequired(true))
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
		switch (interaction.options._subcommand) {
		case "permanent": {
			const user = interaction.options.getUser("member");
			const reason = interaction.options.get("reason")?.value ?? "not specified";
			const keep = interaction.options.getBoolean("keep");
			if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			if (!user) return interaction.reply({ content: "There was no member specified.", ephemeral: true });

			const banchannel = interaction.guild.channels.cache.get("885808423483080744");
			if (!banchannel) return interaction.reply("Could not find server logs channel.");

			const { hmf } = require("../index.js");
			const bembed = new Discord.MessageEmbed()
				.setDescription("User Permanently Banned")
				.setColor(0xff0000)
				.addField("Banned User", `${user} with ID ${user.id}`)
				.addField("Banned By", `<@${interaction.user.id}> (**${user.username}**) with ID ${interaction.user.id}`)
				.addField("Banned In", interaction.channel.toString())
				.addField("Banned At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Banned For", `${reason}`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

			user.send(`You have been banned permanently from ${interaction.guild.name} for: ${reason}.`).catch(console.log);
			if (keep == true) {
				try {
					interaction.guild.members.ban(user, { days: 7, reason: reason }).catch(console.log);
				}
				
			}
			else {
				interaction.guild.members.ban(user, { days: 0, reason: reason }).catch(console.log);
			}
			interaction.reply(`**${user.username}** was banned for **${reason}**.`);
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
			if (!time) return interaction.reply({ content: "Please include the ban duration.", ephemeral: true });
			if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			if (!user) return interaction.reply({ content: "There was no member specified.", ephemeral: true });

			interaction.reply(`**${user.username}** was temporarily banned for ${time} for **${reason}**.`);

			const banchannel = interaction.guild.channels.cache.get("885808423483080744");
			if (!banchannel) return interaction.reply("Could not find server logs channel.");

			const { hmf } = require("../index.js");
			const bembed = new Discord.MessageEmbed()
				.setDescription("User Temporarily Banned")
				.setColor(0xff0000)
				.addField("Temporarily Banned User", `${user} with ID ${user.id}`)
				.addField("Temporarily Banned By", `<@${interaction.user.id}> (**${user.username}**) with ID ${interaction.user.id}`)
				.addField("Temporarily Banned In", interaction.channel.toString())
				.addField("Temporarily Banned At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Temporary Ban Duration", `${time}`)
				.addField("Temporarily Banned For", reason)
				.addField("Temporarily Banned Until", `<t:${Math.round((interaction.createdTimestamp += ms(time)) / 1000)}:F>`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

			user.send(`You have been banned from ${interaction.guild.name} temporarily for ${time} for **${reason}**.`).catch(console.log);
			if (keep == true) {
				interaction.guild.members.ban(user, { days: 7, reason: reason }).catch(console.log);
			}
			else {
				interaction.guild.members.ban(user, { days: 0, reason: reason }).catch(console.log);
			}
			banchannel.send({ embeds: [bembed] });

			const bandb = await ban.create({
				username: user.username,
				userId: user.id,
				duration: ms(time),
				reason: reason,
				adminusername: interaction.user.username,
				adminId: interaction.user.id,
				permanent: false,
				bantime: interaction.createdTimestamp,
				unbantime: Math.round((interaction.createdTimestamp += ms(time)) / 1000),
			});
			await bandb.save();
			break;
		}
		case "unban": {
			if (!(interaction.member.roles.cache.has("608937618259836930") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
			const user = interaction.options.get("userid").value;

			try {
				await interaction.guild.bans.fetch(user).catch(console.log);
			}
			catch {
				interaction.reply({ content: "An error has occured. This could be due to non-existant user or user not banned.", ephemeral: true });
				return;
			}
			try {
				await interaction.guild.members.unban(user);
			}
			catch {
				interaction.reply({ content: "An error has occured. This could be due to user not being able to be unbanned. You can try again, but if this keeps happening, please notify the bot owner.", ephemeral: true });
				return;
			}

			const { hmf } = require("../index.js");
			const ubembed = new Discord.MessageEmbed()
				.setTitle("User Unbanned")
				.setColor(0x00ff00)
				.addField("Unbanned User", `<@${user}> with ID ${user}`)
				.addField("Unbanned By", `<@${interaction.member.id}> with ID ${interaction.member.id}`)
				.addField("Unbanned In", `${interaction.channel}`)
				.addField("Unbanned At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

			const unban2Channel = interaction.guild.channels.cache.find(channel => channel.name === "aot-logs");
			if (!unban2Channel) return interaction.reply({ content: "Could not find server logs channel.", ephemeral: true });

			unban2Channel.send({ embeds: [ubembed] });

			interaction.reply(`<@${user}> has been unbanned.`);
			break;
		}
		}
	},
};