const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warn = require("../Schemas/WarnSchema.js");
const filter = require("../Schemas/FilterSchema.js");

module.exports = {
	name: "infractions",
	type: "slash",
	data: new SlashCommandBuilder()
		.setName("infractions")
		.setDescription("Show past infractions")
		.addUserOption(option =>
			option.setName("member")
				.setDescription("Show a specific member's past infractions")
				.setRequired(false)),
	async execute(interaction) {
		const { hmf, bot } = require("../index.js");
		let member = interaction.options.getUser("member");
		if (!member) member = interaction.user;

		const embed = new EmbedBuilder()
			.setTitle("Infractions")
			.setAuthor({ name: `${member.username}`, iconURL: member.avatarURL({ dynamic: true }) })
			.setTimestamp()
			.setColor(0xfec13d)
			.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });

		const warnquery = await warn.find();
		const filterquery = await filter.find();
		let warncount = 0;
		let warnstring = "";
		let filtercount = 0;
		let filterstring = "";

		for (; warnquery.length > 0;) {
			if (warnquery[0].userId == member.id) {
				warnstring += `\`000${warnquery[0].warnId}\` **${warnquery[0].reason}** • <t:${Math.round(parseInt(warnquery[0].time) / 1000)}:F> \n`;
				warncount++;
				warnquery.shift();
			}
			else {
				warnquery.shift();
			}
		}
		for (; filterquery.length > 0;) {
			if (filterquery[0].userId == member.id) {
				filterstring += `\`000${filterquery[0].caseId}\` **${filterquery[0].type}** • <t:${Math.round(parseInt(filterquery[0].time) / 1000)}:F> \n`;
				filtercount++;
				filterquery.shift();
			}
			else {
				filterquery.shift();
			}
		}
		if (warnstring == "") {
			warnstring = "No past warning was found.";
			warncount = 0;
		}
		if (filterstring == "") {
			filterstring = "No past warning was found.";
			filtercount = 0;
		}

		const finalstring = `**Warnings** \n${warnstring}\n**Filtered Messages** \n${filterstring}`;

		embed.setDescription(finalstring);
		embed.addFields(
			{ name: "Total Warnings", value: `${warncount}` },
			{ name: "Total Filtered Messages", value: `${filtercount}` },
		);

		interaction.reply({ embeds: [embed] });
	},
};