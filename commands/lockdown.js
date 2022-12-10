const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
	type: "slash",
	name: "lockdown",
	data: new SlashCommandBuilder()
		.setName("lockdown")
		.setDescription("Lock or unlock the server with a simple command.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(80)
		.addSubcommand(subcommand =>
			subcommand.setName("lock")
				.setDescription("Lock the server or specific channel(s).")
				.addStringOption(option =>
					option.setName("channels")
						.setDescription("Specify what channels to lock.")
						.setMinLength(6)
						.setMaxLength(12)
						.addChoices(
							{ name: "This Channel", value: "channel" },
							{ name: "Server", value: "server" },
						)
						.setRequired(true))
				.addBooleanOption(option =>
					option.setName("announce")
						.setDescription("Announce the lockdown in the announcement channel of the server")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("announcemsg")
						.setDescription("Specify the content for the announcement (Not required, skip if last question is false)")
						.setRequired(false))
				.addStringOption(option =>
					option.setName("autounlock")
						.setRequired(false)
						.setDescription("Specify the time for the bot to unlock the server (Not required, time format in 1m or 1minute)."),
				))
		.addSubcommand(subcommand =>
			subcommand.setName("unlock")
				.setDescription("Unlock the server of specific channel(s).")
				.addStringOption(option =>
					option.setName("channels")
						.setDescription("Specify what channels to unlock.")
						.setMinLength(6)
						.setMaxLength(12)
						.addChoices(
							{ name: "This Channel", value: "channel" },
							{ name: "Server", value: "server" },
						)
						.setRequired(true))
				.addBooleanOption(option =>
					option.setName("announce")
						.setDescription("Announce the unlock in the announcement channel of the server")
						.setRequired(true))),
	async execute(interaction) {
		const { ids, bot, hmf } = require("../index.js");
		switch (interaction.options._subcommand) {
		case "lock": {
			if (!(interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.mod))) return interaction.reply({ content: "You don't have permissions to lock the server!", ephemeral: true });
			const range = interaction.options.getString("channels");
			if (!(range == "channel" || range == "server")) return interaction.reply({ content: "You did not enter a valid channel type to lock. Please enter `channel` or `server` to lock this channel or the entire server", ephemeral: true });
			let announce = interaction.options.getBoolean("announce");
			if (!(announce == true || announce == false)) announce = false;
			const announcecontent = interaction.options.get("announcemsg").value;
			const autounlock = interaction.options.get("autounlock").value;
			const lockembed = new EmbedBuilder()
				.setColor(0xff0000)
				.setDescription("**This channel has been locked by a moderator.**")
				.setTimestamp();

			const unlockembed = new EmbedBuilder()
				.setColor(0x00ff00)
				.setDescription("**This channel has been unlocked.**")
				.setTimestamp()
				.setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });

			if (announce == true) {
				lockembed.setFooter({ text: "Check the server announcement channel for more information.", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}
			else if (announce == false && !autounlock) {
				lockembed.setFooter({ text: `Please do not ask when will the ${range} unlock and wait till' a moderator unlocks the ${range}.`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}
			else if (announce == false && autounlock) {
				lockembed.setFooter({ text: `The bot will unlock the ${range} after the set period of time.`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}
			else {
				lockembed.setFooter({ text: `Please do not ask when will the ${range} unlock and wait till' a moderator unlocks the ${range}.`, iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) });
			}

			if (range == "channel") {
				try {
					await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
						SendMessages: false,
					});
					await interaction.chanel.send("This channel has been locked by a moderator.");
				}
				catch {
					interaction.reply({ content: "An error has occurred. This could be due to unable to overwrite current permission of the role everyone. You can try again, but if the problem persists, please contact the bot owner. The lockdown has been aborted.", ephemeral: true });
					console.log();
					return;
				}
			}
			else if (range == "server") {
				const muteables = ids.channels.muteables;
				for (let mutetext = 0; mutetext < muteables.length; mutetext++) {
					try {
						const channel = await interaction.guild.channels.fetch(muteables[mutetext]);
						await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
							SendMessages: false,
						});
						await channel.send({ embeds: [lockembed] });
					}
					catch {
						interaction.reply({ content: `An error has occurred. This could be due to unable to lock a certain channel (channel${muteables[mutetext]}). You can try again, but if the problem persists, please contact the bot owner. The lockdown has been aborted, unlocking locked channels`, ephemeral: true });
						console.log();

						for (; mutetext > 0; mutetext--) {
							try {
								const channel = await interaction.guild.channels.fetch(muteables[mutetext]);
								await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
									SendMessages: true,
								});
								await channel.send({ embeds: [unlockembed] });
							}
							catch {
								await interaction.followUp({ content: `Failed to unlock channel <#${muteables[mutetext]}>. Please manually unlock the channel and public text channels above it.`, ephemeral: true });
								console.log();
								return;
							}
						}

					}
				}

				const muteablesvc = ids.channels.muteablesvc;
				for (let mutetextvc = 0; mutetextvc < muteablesvc.length; mutetextvc++) {
					try {
						const channel = await interaction.guild.channels.fetch(muteablesvc[mutetextvc]);
						await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
							Connect: false,
							Speak: false,
						});
					}
					catch {
						await interaction.reply({ content: `An error has occurred. This could be due to unable to lock a certain channel (channel ${muteablesvc[mutetextvc]}). You can try again, but if the problem persists, please contact the bot owner. The lockdown has been aborted, unlocking locked channels`, ephemeral: true });

						for (let mutetext = 0; mutetext < muteables.length; mutetext++) {
							try {
								const channel = interaction.guild.channels.fetch(muteables[mutetext]);
								await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
									SendMessages: true,
								});
								await channel.send({ embeds: [unlockembed] });
							}
							catch {
								await interaction.followUp({ content: `Failed to unlock channel <#${muteables[mutetext]}>. Please manually unlock the channel and public text channels above it.`, ephemeral: true });
								console.log();
								return;
							}
						}

						for (; mutetextvc > 0; mutetextvc--) {
							try {
								const channelvc = interaction.guild.channels.fetch(muteablesvc[mutetextvc]);
								await channelvc.permissionOverwrites.edit(interaction.guild.roles.everyone, {
									Connect: true,
									Speak: true,
								});
							}
							catch {
								await interaction.followUp({ content: `Failed to unlock channel <#${muteablesvc[mutetextvc]}>. Please manually unlock the channel and all public channels above it.`, ephemeral: true });
								console.log();
								return;
							}
						}
					}
				}
			}

			if (announce == true) {
				const announceembed = new EmbedBuilder()
					.setAuthor({ name: `Moderation Team of ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ size: 4096, extension: "png" }) })
					.setColor(0xff0000)
					.setFooter({ text: "Acto Utils Lockdown", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
					.setTimestamp();
				if (announcecontent) {
					let announceembeddescriptionserver = `**The server has been locked by a moderator.** This is due to ${announcecontent}.`;
					let announceembeddescriptionchannel = `**The <#${interaction.channelId}> channel has been locked by a moderator.** This is due to ${announcecontent}.`;
					const processedtime = parseInt(interaction.createdTimestamp);
					if (range == "server") {
						if (!autounlock) {
							announceembeddescriptionserver += "No unlock time has been specified. Please do not ask any moderators when the server will be unlocked.";
						}
						else {
							announceembeddescriptionserver += `The server will automatically unlock <t:${parseInt(processedtime + ms(autounlock)) / 1000}:F>. Please do not ask any moderators if the server will be unlocked earlier.`;
						}
						announceembed.setDescription(announceembeddescriptionserver);
					}
					else if (range == "channel") {
						if (!autounlock) {
							announceembeddescriptionchannel += "No unlock time has been specified. Please do not ask any moderators when the channel will be unlocked.";
						}
						else {
							announceembeddescriptionchannel += `The channel will automatically unlock <t:${parseInt(processedtime + ms(autounlock)) / 1000}:F>. Please do not ask any moderators if the channel will be unlocked earlier.`;
						}
						announceembed.setDescription(announceembeddescriptionchannel);
					}

					const announcechannel = await interaction.guild.channels.fetch(ids.channels.serverann);
					await announcechannel.send({ embeds: [announceembed] });

					let replycontent = "**The following channels has been successfully locked:**";
					if (range == "channel") {
						replycontent += `\r- <#${interaction.channelId}>`;
					}
					else if (range == "server") {
						const serverids = await ids.channels.muteables.concat(ids.channels.muteablesvc);
						replycontent += `\r- <#${serverids[0]}>`;
						for (let mutelength = 1; mutelength < serverids.length; mutelength++) {
							replycontent += `,\r- <#${serverids[mutelength]}>`;
						}
					}

					replycontent += `\r\rIf an autounlock time has been set, the bot will automatically unlock the ${range} after the set time. \r\rThe action (lockdown unlock ${range}) has been triggered by <@${interaction.user.id}> (${interaction.user.id}).`;

					interaction.reply({ content: replycontent, ephemeral: true });
					const loggingchannel = await interaction.guild.channels.fetch(ids.channels.logging.general);
					await loggingchannel.send({ content: replycontent });


				}
			}

			if (autounlock) {
				setTimeout(async function() {
					const loggingchannel = await interaction.guild.channels.fetch(ids.channels.logging.general);
					const announcechannel = await interaction.guild.channels.fetch(ids.channels.logging.serverann);
					if (range == "server") {
						const serverids = ids.channels.muteables;
						for (let servercount = 0; servercount < serverids.length; servercount++) {
							try {
								const channel = await interaction.guild.channels.fetch(serverids[servercount]);
								await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
									SendMessages: true,
								});
								await channel.send({ embeds: [unlockembed] });
							}
							catch {
								await interaction.followUp({ content: `An error has occurred. This could be due to unable to unlock a certain channel (channel ${serverids[servercount]}). You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.`, ephemeral: true });
							}
						}
						const serveridsvc = ids.channels.muteablesvc;
						for (let servercount = 0; servercount < serveridsvc.length; servercount++) {
							try {
								const channel = await interaction.guild.channels.fetch(serveridsvc[servercount]);
								await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
									Connect: true,
									Speak: true,
								});
							}
							catch {
								await interaction.followUp({ content: `An error has occurred. This could be due to unable to unlock a certain channel (channel ${serveridsvc[servercount]}). You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.`, ephemeral: true });
							}
						}

						loggingchannel.send({ content: `Auto Lockdown Unlock has unlocked **${serverids.length}** public text channels and **${serveridsvc.length}** public VC channels.` });
					}
					else if (range == "channel") {
						try {
							const channel = await interaction.guild.channels.fetch(interaction.channelId);
							await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
								SendMessages: true,
							});
							await channel.send({ embeds: [unlockembed] });
						}
						catch {
							await interaction.followUp({ content: `An error has occurred. This could be due to unable to unlock a certain channel (channel ${interaction.channelId}). You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.`, ephemeral: true });
						}

						loggingchannel.send({ content: `Auto Lockdown Unlock has unlocked <#${interaction.channelId}>.` });
					}

					if (announce == true) {
						const embed = new EmbedBuilder()
							.setColor(0x00ff00)
							.setFooter({ text: "Acto Utils Auto Lockdown Unlock", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
							.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ size: 4096, extension: "png" }) });

						let embedcontent = "";
						if (range == "server") {
							embedcontent += `${ids.channels.muteables.length} text channels and ${ids.channels.muteablesvc.length} has been automatically unlocked.`;
						}
						else if (range == "channel") {
							embedcontent += `<#${interaction.channelId}> has been automatically unlocked.`;
						}
						embed.setDescription(embedcontent);
						announcechannel.send({ embeds: embed });
					}
				}, ms(`${autounlock}`));
			}
			return;
		}
		case "unlock": {
			if (!(interaction.member.roles.cache.has(ids.roles.acto) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.mod))) return interaction.reply({ content: "You don't have permissions to lock the server!", ephemeral: true });
			const range = interaction.options.getValue("channels");
			if (!(range == "server" || range == "channel")) return interaction.reply({ content: "You did not enter a valid channel type to lock. Please enter `channel` or `server` to lock this channel or the entire server", ephemeral: true });
			let announce = interaction.options.getBoolean("announce");
			if (!(announce == true || announce == false)) announce = false;
			const unlockembed = new EmbedBuilder()
				.setDescription("**This channel is now unlocked")
				.setColor(0x00ff00)
				.setFooter({ text: "Unlocked by a moderator", iconURL: bot.user.avatarURL({ size: 4096, extension: "png" }) })
				.setTimestamp();

			let chanels = "";

			if (range == "channel") {
				try {
					await interaction.channel.overwritePermissions.edit({
						SendMessage: true,
					});
				}
				catch {
					console.log();
					try {
						await interaction.channel.overwritePermissions.edit({
							SendMessage: true,
						});
					}
					catch {
						console.log();
						interaction.reply({ content: "An error has occurred. This could be due to failing to unlock the channel. You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.", ephemeral: true });
					}
				}
				interaction.channel.send({ embeds: [unlockembed] });
				chanels = `<#${interaction.channelId}>`;
			}
			else if (range == "server") {
				const serverids = ids.channels.muteables;
				const serveridsvc = ids.channels.muteablesvc;
				for (let serverunmute = 0; serverunmute < serverids.length; serverunmute++) {
					try {
						await (await interaction.guild.channels.fetch(serverids[serverunmute])).overwritePermissions.edit({
							SendMessage: true,
						});
					}
					catch {
						console.log();
						try {
							await (await interaction.guild.channels.fetch(serverids[serverunmute])).overwritePermissions.edit({
								SendMessage: true,
							});
						}
						catch {
							console.log();
							await interaction.reply({ content: `Failed to unlock channel <#${serverids[serverunmute]}>. You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.`, ephemeral: true });
						}
					}
					await (interaction.guild.channels.fetch(serverids[serverunmute])).send({ embeds: [unlockembed] });
					chanels += `- <#${serverids[serverunmute]}>, \r`;
				}
				for (let serverunmutevc = 0; serverunmutevc < serveridsvc.length; serverunmutevc++) {
					try {
						await (await interaction.guild.channels.fetch(serverids[serverunmutevc])).overwritePermissions.edit({
							Connect: true,
							Speak: true,
						});
					}
					catch {
						console.log();
						try {
							await (await interaction.guild.channels.fetch(serverids[serverunmutevc])).overwritePermissions.edit({
								Connect: true,
								Speak: true,
							});
						}
						catch {
							console.log();
							await interaction.reply({ content: `Failed to unlock channel <#${serveridsvc[serverunmutevc]}>. You can try again, but if the problem persists, please contact the bot owner. The unlock has been aborted.`, ephemeral: true });
						}
					}
					chanels += `- <#${serveridsvc[serverunmutevc]}>, \r`;
				}

				await (interaction.guild.channels.fetch(ids.channels.logging.general)).send({ content: `**The following channels has been successfully locked:** \r${chanels}. \r\rThe action (lockdown unlock ${range}) has been triggered by <@${interaction.user.id}> (${interaction.user.id}).` });
			}

			if (announce == true) {
				const unlockannembed = new EmbedBuilder()
					.setDescription(`**The ${range} has been unlocked by a moderator.** Have a great time hanging out in the server!`)
					.setColor(0x00ff00)
					.setAuthor({ name: `Moderation Team of ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ extension: "png", size: 4096 }) })
					.setTimestamp()
					.setFooter({ text: "Acto Utils Lockdown (Unlock)", iconURL: bot.user.avatarURL({ extension: "png", size: 4096 }) });

				await (interaction.guild.channels.fetch(ids.channels.serverann)).send({ embeds: [unlockannembed] });
			}
			return;
		}
		}
	},
};