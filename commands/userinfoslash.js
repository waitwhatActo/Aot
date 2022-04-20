const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	name: "userinfoslash",
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("A member's information")
		.addUserOption(option =>
			option.setName("member")
				.setDescription("A member's information. If not specified, your own information will be shown.")
				.setRequired(false),
		),
	async execute(interaction) {
		const target = interaction.options.getMember("member");

		if (target) {
			let nickm = target.nickname;
			if (nickm == null) {
				nickm = target.user.username;
			}

			const { hmf } = require("../index.js");
			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor({
					name: target.user.tag,
					iconURL: target.user.avatarURL({ dynamics: true, size: 512 }),
				})
				.setThumbnail(target.user.avatarURL({ dynamics: true, size: 512 }))
				.addField("Username", `${target.user.username}`)
				.addField("Server Nickname", `${nickm}`)
				.addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
				.addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:F>`)
				.addField("User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:F>`)
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] })
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
		else {
			let nicki = interaction.member.nickname;
			if (nicki == null) {
				nicki = target.user.username;
			}

			const { hmf } = require("../index.js");

			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor({
					name: interaction.user.tag,
					iconURL: interaction.user.avatarURL({ dynamics: true, size: 512 }),
				})
				.setThumbnail(interaction.user.avatarURL({ dynamics: true, size: 512 }))
				.addField("Username", `${interaction.user.username}`)
				.addField("Server Nickname", `${interaction.member.nickname}`)
				.addField("Roles", `${interaction.member.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
				.addField("Member Since", `<t:${parseInt(interaction.member.joinedTimestamp / 1000)}:F>`)
				.addField("User Since", `<t:${parseInt(interaction.user.createdTimestamp / 1000)}:F>`)
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] })
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
	},
};

