const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
	type: "slash",
	name: "cooldown",
	data: new SlashCommandBuilder()
		.setName("cooldown")
		.setDescription("Change a channel's cooldown duration.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(2000)
		.addStringOption(option =>
			option.setName("duration")
				.setDescription("Duration of cooldown. (Format: 10s, 1m, 1day, null)")
				.setRequired(true)),
	async execute(interaction) {
		const { ids } = require("../index.js");
		if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.trialmod))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
		const duration = interaction.options.get("duration").value;
		if (!duration) return interaction.reply({ content: "Please enter a valid time, in the format of `1h/1hour`.", ephemeral: true });
		// @ts-ignore
		interaction.channel.setRateLimitPerUser(ms(duration) / 1000);
		interaction.reply({ content: `The slowmode for the channel has been set to **${ms(ms(duration))}**` });


		const embed = new EmbedBuilder()
			.setAuthor({ name: `${interaction.channel.name}`, iconURL: interaction.guild.iconURL({ size: 4096, extension: "png" }) })
			.setDescription(`**Slowmode for <#${interaction.channel.id}> has been changed to _*${ms(ms(duration))}*_ by <@${interaction.member.id}>** (${interaction.member.id}).`)
			.setTimestamp()
			.setColor("Random")
			.setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL({ dynamic: true, size: 4096, extension: "png" }) });

		const channel = interaction.guild.channels.fetch(ids.channels.logging.general);
		if (!channel) return interaction.reply("Could not find server logs channel.");

		channel.send({ embeds: [embed] });
	},
};