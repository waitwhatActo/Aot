const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	type: "slash",
	name: "role",
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("make editions to a members roles")
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand.setName("give")
				.setDescription("Gives a member a role")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to give role")
						.setRequired(true),
				)
				.addRoleOption(option =>
					option.setName("role")
						.setDescription("Role to give member")
						.setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand.setName("remove")
				.setDescription("Removes a member's role")
				.addUserOption(option =>
					option.setName("member")
						.setDescription("Member to remove role")
						.setRequired(true),
				)
				.addRoleOption(option =>
					option.setName("role")
						.setDescription("Role to remove from member")
						.setRequired(true),
				)),
	async execute(interaction) {
		const { ids } = require("../index.js");
		switch (interaction.options._subcommand) {
		case "give": {
			const member = interaction.options.getMember("member");
			const role = interaction.options.getRole("role");

			try {
				member.roles.add(role.id);
			}
			catch {
				interaction.reply({ content: "An error has occurred. This could be due to not being able to add the role to the member. You can try again, but if the problem persists, please contact the bot owner.", ephemeral: true });
				console.log();
				return;
			}

			interaction.reply(`${member} has been given the role **${role.name}**.`);

			const embed = new EmbedBuilder()
				.setDescription("**Role Added to Member**")
				.setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ size: 4096, extension: "png" })}` })
				.setColor(0xffff00)
				.addFields([
					{ name: "Role added to", value: `${member} (${member.id})` },
					{ name: "Role added by", value: `<@${interaction.member.user.id}> (${interaction.member.user.id})` },
					{ name: "Role added in", value: `${interaction.channel}` },
					{ name: "Role added at", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Role added", value: `${role}` },
				])
				.setTimestamp()
				.setFooter({ text: `${interaction.member.user.tag}`, iconURL: `${interaction.member.avatarURL({ size: 4096, extension: "png" })}` });
			const channel = interaction.guild.channels.fetch(ids.channels.logging.mod);
			channel.send({ embeds: [embed] });
			break;
		}
		case "remove": {
			const member = interaction.options.getMember("member");
			const role = interaction.options.getRole("role");
			if (!member) return interaction.reply({ content: "There was no member specified.", ephemeral: true });

			try {
				member.roles.remove(role.id);
			}
			catch {
				interaction.reply({ content: "An error has occurred. This could be due to not being able to remove the role to the member. You can try again, but if the problem persists, please contact the bot owner.", ephemeral: true });
				console.log();
				return;
			}

			interaction.reply(`The role **${role.name}** has been removed from ${member}.`);

			const embed = new EmbedBuilder()
				.setDescription("**Role Removed from Member**")
				.setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ size: 4096, extension: "png" })}` })
				.setColor(0xff0000)
				.addFields([
					{ name: "Role removed from", value: `${member} (${member.id})` },
					{ name: "Role removed by", value: `<@${member.user.id}> (${member.user.id})` },
					{ name: "Role removed in", value: `${interaction.channel}` },
					{ name: "Role Removed at", value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
					{ name: "Role removed", value: `${role}` },
				])
				.setTimestamp()
				.setFooter({ text: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ size: 4096, extension: "png" })}` });
			const channel = interaction.guild.channels.fetch(ids.channels.logging.mod);
			channel.send({ embeds: [embed] });
			break;
		}
		}
	},
};