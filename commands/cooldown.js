const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
	type: "slash",
	name: "cooldown",
	data: new SlashCommandBuilder()
		.setName("cooldown")
		.setDescription("Change a channel's cooldown duration.")
		.addStringOption(option =>
			option.setName("duration")
				.setDescription("Duration of cooldown. (Format: 10s, 1m, 1day, null)")
				.setRequired(true)),
	async execute(interaction) {
		if (!(interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("608937618259836930") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
		let duration = interaction.options.get("duration").value;
		if (duration == "null") {
			duration = 0;
		}
		else {
			Math.round(ms(interaction.options.get("duration").value) / 1000);
			if (!duration) return interaction.reply({ content: "Please provide a valid value for duration", ephemeral: true });
			else if (duration == undefined) return interaction.reply({ content: "Please provide a valid value for duration", ephemeral: true });
			else if (isNaN(duration)) return interaction.reply({ content: "Please provide a valid value for duration", ephemeral: true });
		}

		interaction.channel.setRateLimitPerUser(duration).catch(console.log);
		interaction.reply({ content: `The slowmode for the channel has been set to **${ms(duration * 1000)}**` });

		const { hmf, bot } = require("../index.js");

		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: interaction.member.avatarURL({ dynamic: true }) })
			.setDescription(`**Slowmode for <#${interaction.channel.id}> has been changed to _*${ms(duration * 1000)}*_ by <@${interaction.member.id}>**`)
			.setTimestamp()
			.setColor("RANDOM")
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() });

		const channel = interaction.guild.channels.cache.get("885808423483080744");
		if (!channel) return interaction.reply("Could not find server logs channel.");

		channel.send({ embeds: [embed] });
	},
};