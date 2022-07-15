const Discord = require("discord.js");

// Error Message Format
const error = "An error has occured. This could be due to ${reason}. [You can try again, but if the problem persists, please contact the bot owner.]";
error();
// Embed Content Format
const embed = new Discord.MessageEmbed()
	.setDescription("**Title**")
	// or
	.setAuthor({ name: "involved member", iconURL: "involved member pfp" })
	.addField("Add", "only if neccessary")
	.setFooter({ text: "command triggerer or case id", iconURL: "command triggerer pfp" })
	.setColor("RANDOM for etc, 0xff0000 for moderator actions, 0xffff00 for warnings, 0x00ff00 for good actions")
	.setTimestamp();
embed();