const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	type: "slash",
	name: "ping",
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("The latency of the bot."),
	async execute(interaction) {
		const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });

		const { hmf, bot } = require("../index.js");
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.avatarURL({ dynamic: true }) })
			.setDescription("🏓**Pong!**")
			.addField("Ping", `${sent.createdTimestamp - interaction.createdTimestamp}ms`)
			.addField("API Latency", `${bot.ws.ping}ms`)
			.setColor("RANDOM")
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() });
		interaction.editReply({ embeds: [embed] });
	},
};