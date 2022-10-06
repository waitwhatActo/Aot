const { SlashCommandBuilder } = require("discord.js");
const { ids } = require("../index.js");

module.exports = {
	type: "slash",
	name: "restart",
	data: new SlashCommandBuilder()
		.setName("restart")
		.setDescription("Restart Aot")
		.setDMPermission(false)
		.addNumberOption(option =>
			option.setName("delay")
				.setDescription("Length of restart delay in ms.")
				.setRequired(false),
		),
	async execute(interaction) {
		const delay = interaction.options.getNumber("delay");
		if (!interaction.member.id == ids.members.acto) return interaction.reply({ content: "You don't have permission to do that!", ephemeral: true });
		if (!delay) {
			await interaction.reply({ content: "Restarting bot..." });
			console.log("Bot was online for Bot restart triggered.");
			process.exit();
		}
		else {
			await interaction.reply({ content: `Restarting bot in ${delay}ms...` });
			setTimeout(async () => {
				console.log("Bot restart triggered.");
				process.exit();
			}, delay);
		}
	},
};