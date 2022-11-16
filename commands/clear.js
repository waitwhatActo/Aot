const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "clear",
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Bulk purge messages")
		.setDMPermission(false)
		.addNumberOption(option =>
			option.setName("amount")
				.setDescription("Amount of messages that should be bulk purged.")
				.setRequired(true))
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Bulk purged a specific member's message")
				.setRequired(false)),
	async execute(interaction) {
		const { bot, ids } = require("../index.js");
		const amount = interaction.options.getNumber("amount");
		const member = interaction.options.getUser("member");

		if (amount > 100 || amount < 0) {
			interaction.reply({ content:"Amount of message bulk purge cannot exceed 100 or be under 1.", ephemeral: true });
			return;
		}

		const Messages = await interaction.channel.messages.fetch();

		if (!member) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ size: 4096, extension: "png" }) })
				.setColor("Random")
				.setFooter({ text: `#${interaction.channel.name}`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setTimestamp();
			await interaction.channel.bulkDelete(amount, true).then(messages => {
				interaction.reply({ content: `Bulk purged **${messages.size}** from the channel.`, ephemeral: true });
				const clearlog = interaction.guild.channels.fetch(ids.channels.logging.message);
				if (!clearlog) return interaction.channel.send("Couldn't find server logs channel.");

				embed.setDescription(`**<@${interaction.member.user.id}> has purged **${messages.size}** messages in <#${interaction.channel.id}>**`);
				clearlog.send({ embeds: [embed] });
			});
		}
		else {
			let i = 0;
			const filtered = [];
			// eslint-disable-next-line array-callback-return
			(await Messages).filter((m) => {
				if (m.author.id === member.id && amount > i) {
					filtered.push(m);
					i++;
				}
			});
			const embed = new EmbedBuilder()
				.setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL({ size: 4096, extension: "png" }) })
				.setColor("Random")
				.setTimestamp();

			await interaction.channel.bulkDelete(filtered, true).then(messages => {
				interaction.reply({ content: `Bulk purged **${messages.size}** from ${member}.`, ephemeral: true });
				const clearlog = interaction.guild.channels.fetch(ids.channels.logging.message);
				if (!clearlog) return interaction.channel.send("Couldn't find server logs channel.");

				embed.setDescription(`**<@${interaction.member.id}> has purged **${messages.size}** messages by ${member} in <#${interaction.channel.id}>**`);
				clearlog.send({ embeds: [embed] });
			});
		}
	},
};