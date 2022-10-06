const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "kick",
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("kick a member")
		.setDMPermission(false)
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
		let reason = interaction.options.get("reason")?.value ?? "not specified";
		if (!(interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("629687079567360030") || interaction.member.roles.cache.has("645832781469057024") || interaction.member.roles.cache.has("609236733464150037"))) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
		if (!user) return interaction.reply({ content: "There was no member specified.", ephemeral: true });
		if (!reason) reason = "not specified";

		const kembed = new EmbedBuilder()
			.setDescription("**Member Kicked from Server**")
			.setColor(0xff0000)
			.addFields([
				{ name: "Kicked member", value: `${user} (${user.id})` },
				{ name: "Kicked by", value: `<@${interaction.member.user.id}> (${interaction.member.user.id})` },
				{ name: "Kicked in", value: `${interaction.channel}` },
				{ name: "Kicked at", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
				{ name: "Kicked for", value: `${reason}` },
			])
			.setTimestamp()
			.setAuthor({ name: user.tag, iconURL: user.avatarURL({ size: 4096, extension: "png" }) })
			.setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.user.avatarURL({ size: 4096, extension: "png" }) });

		try {
			await user.send(`You have been kicked from ${interaction.guild.name} for: ${reason}.`);
		}
		catch {
			console.log();
		}

		try {
			await interaction.guild.members.kick(user, reason);
		}
		catch {
			console.log();
			interaction.reply({ content: "An error has occurred. This could be due to not being able to kick member. You can try again, but if the problem persists, please contact the bot owner. Kick has been aborted." });
			return;
		}

		const kickchannel = interaction.guild.channels.fetch("885808423483080744");
		if (!kickchannel) return interaction.reply("Could not find server logs channel.");
		kickchannel.send({ embeds: [kembed] });

		interaction.reply(`**${user.username}** was kicked for **${reason}**.`);
	},
};