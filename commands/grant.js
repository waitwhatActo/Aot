const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	type: "slash",
	name: "grant",
	data: new SlashCommandBuilder()
		.setName("grant")
		.setDescription("Grants a member permissions (Tier 1).")
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Member to grant the role to")
				.setRequired(true),
		),
	async execute(interaction) {
		if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("608937618259836930") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that.", ephemeral: true });
		const usera = interaction.options.getMember("member");
		if (usera.roles.cache.has("725361624294096927")) return interaction.reply({ content: "The user currently have the role.", ephemeral: true });
		const role = interaction.guild.roles.cache.get("725361624294096927");
		if (!role) return interaction.reply({ content: "Couldn't find a role to grant.", ephemeral: true });

		usera.roles.add(role);
		interaction.reply(`<@${usera.id}> (**${usera.nickname}**) has been granted permissions.`);

		const { hmf } = require("../index.js");

		const embed = new Discord.MessageEmbed()
			.setTitle("Permissions Granted")
			.addField("Permission Granted By", `<@${interaction.user.id}>`)
			.addField("Permission Granted To", `<@${usera.id}>`)
			.addField("Permission Granted In", `<#${interaction.channel.id}>`)
			.addField("Permission Granted At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] })
			.setTimestamp()
			.setColor(0x00ff00);

		const channel = interaction.guild.channels.cache.get("885808423483080744");
		channel.send({ embeds: [embed] });
	} };