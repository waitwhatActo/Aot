/* eslint-disable no-unused-vars */
// @ts-ignore
const { Discord, user } = require("discord.js");

// Error Message Format
const error = "An error has occurred. This could be due to ${reason}. [You can try again, but if the problem persists, please contact the bot owner.] The X has been aborted.";
// Embed Content Format
const embed = new Discord.MessageEmbed()
	.setDescription("**Title**")
	// or
	.setAuthor({ name: "involved member", iconURL: user.avatarURL({ size: 4096, extension: "png" }) })
	.addField("Add", "only if necessary")
	.setFooter({ text: "command sender or case id", iconURL: "command sender pfp" })
	.setColor("RANDOM for etc, 0xff0000 for moderator actions, 0xffff00 for warnings, 0x00ff00 for good actions")
	.setTimestamp();
embed();
// DMing Members
try {
	user.send({ context: "Message" });
}
catch {
	console.log();
}