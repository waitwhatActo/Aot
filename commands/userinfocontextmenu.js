const { ContextMenuCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "userinfo",
	type: "USER",
	data: new ContextMenuCommandBuilder()
		.setName("User Information")
		.setDMPermission(false)
		.setType(2),
	async execute(interaction) {
		const target = await interaction.guild.members.fetch(interaction.targetId);
		let targetnick = target.nickname;
		if (targetnick === null) targetnick = target.user.username;

		const { hmf, bot } = require("../index.js");

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
		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};