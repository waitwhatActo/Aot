const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	type: "slash",
	name: "restart",
	data: new SlashCommandBuilder()
		.setName("restart")
		.setDescription("Restart Aot")
		.addNumberOption(option =>
			option.setName("delay")
				.setDescription("Length of restart delay in ms.")
				.setRequired(false),
		),
	async execute(interaction) {
		const delay = interaction.options.getNumber("delay");
		if (!interaction.member.id === "428445352354643968");
		if (!delay) {
			interaction.reply("Restarting bot...");
			console.log("Bot was online for Bot restart triggered.");
			process.exit();
		}
		else {
			setTimeout(function() {
				interaction.reply(`Restarting bot in ${delay}ms...`);
				console.log("Bot restart triggered.");
				process.exit();
			});
		}
	},
};