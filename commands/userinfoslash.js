const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "userinfoslash",
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("Shows a member's information")
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName("member")
				.setDescription("A member's information. If not specified, your own information will be shown.")
				.setRequired(false),
		),
	async execute(interaction) {
		const { bot, hmf } = require("../index.js");
		const target = interaction.options.getMember("member");

		if (target) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: target.user.tag, iconURL: target.user.avatarURL({ size: 4096, extension: "png" }) })
				.setDescription("**User Info**")
				.addFields([
					{ name: "General Member Information", value: "​" },
					{ name: "Member Username", value: target.user.tag, inline: true },
					{ name: "Member Nickname", value: target.displayName, inline: true },
					{ name: "Member Account ID", value: target.user.id, inline: true },
					{ name: "Member Account Creation Date", value: `<t:${Math.round(target.user.createdTimestamp / 1000)}:F>` },
					{ name: "Server Member Information", value: "​" },
					{ name: "Member Server Join Date", value: `<t:${target.joinedTimestamp}:F>` },
					{ name: "Member Server Roles", value: `${target.roles.cache.map(r => r.toString())}` },
					{ name: "Member Server Permissions", value: `${target.permissions.toArray()}` },
					{ name: "Member Timed-out", value: `${target.isCommunicationDisabled()}` },
				])
				.setColor(target.displayHexColor)
				.setTimestamp()
				.setThumbnail(target.user.avatarURL({ size: 4096, extension: "png" }))
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });

			interaction.reply({ embeds: [embed] });
		}
		else {

			const embed = new EmbedBuilder()
				.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.avatarURL({ dynamic: true, extension: "png" }) })
				.setDescription("**User Info**")
				.addFields([
					{ name: "General Member Information", value: "​" },
					{ name: "Member Username", value: interaction.member.user.tag, inline: true },
					{ name: "Member Nickname", value: interaction.member.displayName, inline: true },
					{ name: "Member Account ID", value: interaction.member.user.id, inline: true },
					{ name: "Member Account Creation Date", value: `<t:${Math.round(interaction.member.user.createdTimestamp / 1000)}:F>` },
					{ name: "Server Member Information", value: "​" },
					{ name: "Member Server Join Date", value: `<t:${interaction.member.joinedTimestamp}:F>` },
					{ name: "Member Server Roles", value: `${interaction.member.roles.cache.map(r => r.toString())}` },
					{ name: "Member Server Permissions", value: `${interaction.member.permissions.toArray()}` },
					{ name: "Member Timed-out", value: `${interaction.member.isCommunicationDisabled()}` },
				])
				.setColor(interaction.member.displayHexColor)
				.setTimestamp()
				.setThumbnail(interaction.member.user.avatarURL({ size: 4096, extension: "png" }))
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });

			interaction.reply({ embeds: [embed] });
		}
	},
};

