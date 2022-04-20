const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	name: "clear",
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Bulk purge messages")
		.addNumberOption(option =>
			option.setName("amount")
				.setDescription("Amount of messages that should be bulk purged.")
				.setRequired(true))
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Bulk purged a specific member's message")
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.user;
		const amount = interaction.options.getNumber("amount");
		const target = interaction.options.getUser("member");
		const { hmf, bot } = "../index.js";

		if (amount > 100 || amount < 0) {
			interaction.reply({ content:"Amount of message bulk purge cannot exceed 100 or be under 1.", ephemeral: true });
			return;
		}

		const Messages = await interaction.channel.messages.fetch();

		if (target) {
			let i = 0;
			const filtered = [];
			// eslint-disable-next-line array-callback-return
			(await Messages).filter((m) => {
				if (m.author.id === target.id && amount > i) {
					filtered.push(m);
					i++;
				}
			});
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: `${user.username}`, iconURL: interaction.member.user.avatarURL() })
				.setColor("RANDOM")
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() });


			await interaction.channel.bulkDelete(filtered, true).then(messages => {
				interaction.reply({ content: `Bulk purged **${messages.size}** from ${target}.`, ephemeral: true });
				const clearlog = interaction.guild.channels.cache.find(channel => channel.name === "aot-logs");
				if (!clearlog) return interaction.channel.send("Couldn't find server logs channel.");

				embed.setDescription(`**<@${interaction.member.id}> has purged **${messages.size}** messages by ${target} in <#${interaction.channel.id}>**`);
				clearlog.send({ embeds: [embed] });
			});
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: `${user.username}`, iconURL: interaction.member.user.avatarURL() })
				.setColor("RANDOM")
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL() });
			await interaction.channel.bulkDelete(amount, true).then(messages => {
				interaction.reply({ content: `Bulk purged **${messages.size}** from the channel.`, ephemeral: true });
				const clearlog = interaction.guild.channels.cache.find(channel => channel.name === "aot-logs");
				if (!clearlog) return interaction.channel.send("Couldn't find server logs channel.");

				embed.setDescription(`**<@${interaction.member.id}> has purged **${messages.size}** messages by ${target} in <#${interaction.channel.id}>**`);
				clearlog.send({ embeds: [embed] });
			});
		}
	},
};