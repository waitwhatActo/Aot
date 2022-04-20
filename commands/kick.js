const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	type: "slash",
	name: "kick",
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("kick a member")
		.addUserOption(option =>
			option.setName("member")
				.setDescription("member to kick")
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName("reason")
				.setDescription("reason to kick member")
				.setRequired(false),
		),
	async execute(interaction) {
		const user = interaction.options.getUser("member");
		let reason = interaction.options.get("reason").value;
		if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
		if (!user) return interaction.reply({ content: "There was no member specified.", ephemeral: true });
		if (!reason) reason = "not specified";

		interaction.reply(`**${user.username}** was kicked for **${reason}**.`);

		const kickchannel = interaction.guild.channels.cache.get("885808423483080744");
		if (!kickchannel) return interaction.reply("Could not find server logs channel.");

		const { hmf } = require("../index.js");

		const kembed = new Discord.MessageEmbed()
			.setDescription("User Kicked")
			.setColor(0xff0000)
			.addField("Kicked User", `${user} with ID ${user.id}`)
			.addField("Kicked By", `<@${interaction.user.id}> (**${user.username}**) with ID ${interaction.user.id}`)
			.addField("Kicked In", interaction.channel.toString())
			.addField("Time", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
			.addField("Reason", reason)
			.setTimestamp()
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });

		user.send(`You have been kicked from ${interaction.guild.name} for: ${reason}.`).catch(console.log);
		interaction.guild.members.kick(user, reason);
		kickchannel.send({ embeds: [kembed] });
	},
};