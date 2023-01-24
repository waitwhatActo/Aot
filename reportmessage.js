const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js')

module.exports = {
  name: 'reportmsg',
  type: ApplicationCommandType.Message,
  data: new ContextMenuCommandBuilder()
    .setName('Report Message')
    .setType(ApplicationCommandType.Message)
    .setDMPermission(false),
  async execute (interaction) {
    const a = 0
  }
}
