const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  type: 'slash',
  name: 'ping',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('The latency of the bot.')
    .setDMPermission(false),
  async execute (interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true })

    const { hmf, bot } = require('../index.js')
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.avatarURL({ size: 4096, extension: 'png' }) })
      .setDescription('🏓**Pong!**')
      .addFields(
        { name: 'Ping', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms` },
        { name: 'Discord API Latency', value: `${bot.ws.ping}ms` }
      )
      .setColor('Random')
      .setFooter({ text: hmf[Math.floor(Math.random() * hmf.length)], iconURL: bot.user.avatarURL({ size: 4096, extension: 'png' }) })
    interaction.editReply({ content: '​', embeds: [embed] })
  }
}
