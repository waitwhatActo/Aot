const { Discord } = require("discord.js");
const { ContextMenuCommandBuilder } = require("@discordjs/builders");

module.exports = {
	name: "userinfo",
	type: "USER",
	data: new ContextMenuCommandBuilder()
		.setName("User Information")
		.setType(2),
	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 */
	async execute(interaction) {
		const target = await interaction.guild.members.fetch(interaction.targetId);

		const { hmf } = require("../index.js");

		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setAuthor({
				name: target.user.tag,
				iconURL: target.user.avatarURL({ dynamics: true, size: 512 }),
			})
			.setThumbnail(target.user.avatarURL({ dynamics: true, size: 512 }))
			.addField("Username", `${target.user.username}`)
			.addField("Server Nickname", `${target.nickname}`)
			.addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
			.addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:F>`)
			.addField("User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:F>`)
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] })
			.setTimestamp();

		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};