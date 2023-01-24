const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  type: 'slash',
  name: 'tellraw',
  data: new SlashCommandBuilder()
    .setName('tellraw')
    .setDMPermission(false)
    .setDescription('Send a message as the bot in another channel')
    .setDefaultMemberPermissions(80)
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('What channel should I say this in?')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('What should I say in that channel?')
        .setRequired(true)),
  async execute (interaction) {
    const { ids } = require('../index.js')
    if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.trialmod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto))) return interaction.reply({ content: "You don't have permission to use this command!", ephemeral: true })
    const channel = interaction.options.getChannel('channel')
    const message = interaction.options.get('message').value
    if (!message) return interaction.reply({ content: 'Please specify a message for me to send', ephemeral: true })
    try {
      channel.send(message)
    } catch {
      interaction.reply({ content: 'An error has occurred. This could be due to unable to send message to channel specified. You can try again, but if the problem persists, please contact the bot owner. The tellraw troll has been aborted.', ephemeral: true })
    }
    interaction.reply({ content: 'Message sent', ephemeral: true })
  }
}
