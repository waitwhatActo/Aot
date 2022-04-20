const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	type: "slash",
	name: "role",
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("make editions to a members roles")
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
		switch (interaction.options._subcommand) {
		case "give": {
			const member = interaction.options.getMember("member");
			const role = interaction.options.getRole("role");

			member.roles.add(role.id).catch(console.log);

			interaction.reply(`${member.user} has been given the role **${role.name}**.`);

			const { hmf } = require("../index.js");

			const embed = new Discord.MessageEmbed()
				.setDescription("Role Added to User")
				.setColor(0xff0000)
				.addField("User with New Role", `${member} with ID ${member.id}`)
				.addField("Added By", `<@${interaction.member.id}> with ID ${interaction.member.id}`)
				.addField("Added In", `${interaction.channel}`)
				.addField("Added At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Role Added", `${role}`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
			const channel = interaction.guild.channels.cache.get("885808423483080744");
			channel.send({ embeds: [embed] });
			break;
		}
		case "remove": {
			const member = interaction.options.getMember("member");
			const role = interaction.options.getRole("role");
			if (!member) return interaction.reply({ content: "There was no member specified.", ephemeral: true });

			member.roles.remove(role.id).catch(console.log);

			interaction.reply(`The role **${role.name}** has been removed from ${member.user}.`);

			const { hmf } = require("../index.js");

			const embed = new Discord.MessageEmbed()
				.setDescription("Role Removed from User")
				.setColor(0xff0000)
				.addField("User with Removed Role", `${member} with ID ${member.id}`)
				.addField("Removed By", `<@${interaction.member.id}> with ID ${interaction.member.id}`)
				.addField("Removed In", `${interaction.channel}`)
				.addField("Removed At", `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>`)
				.addField("Role Removed", `${role}`)
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)] });
			const channel = interaction.guild.channels.cache.get("885808423483080744");
			channel.send({ embeds: [embed] });
			break;
		}
		}
	},
};