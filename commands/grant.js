const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  type: 'slash',
  name: 'grant',
  data: new SlashCommandBuilder()
    .setName('grant')
    .setDescription('Grants a member permissions (Tier 1).')
    .setDMPermission(false)
    .setDefaultMemberPermissions(10000000000)
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member to grant the role to')
        .setRequired(true)
    ),
  async execute (interaction) {
    const { ids } = require('../index.js')
    if (!(interaction.member.roles.cache.has(ids.roles.mod) || interaction.member.roles.cache.has(ids.roles.leadmod) || interaction.member.roles.cache.has(ids.roles.acto))) return interaction.reply({ content: "You don't have permission to do that.", ephemeral: true })
    const member = interaction.options.getMember('member')
    if (member.roles.cache.has(ids.roles.tiers._1)) return interaction.reply({ content: 'The user currently have the role.', ephemeral: true })
    const role = interaction.guild.roles.fetch(ids.roles.tiers._1)
    if (!role) return interaction.reply({ content: "Couldn't find a role to grant.", ephemeral: true })
    try {
      member.roles.add(role)
    } catch {
      console.log()
      interaction.reply({ content: 'An error has occurred. This could be due to unable to add role to member. You can try again, but if the problem persists, please contact the bot owner.', ephemeral: true })
      return
    }
    interaction.reply(`<@${member.user.id}> (**${member.user.tag}**) has been granted permissions.`)

    const embed = new EmbedBuilder()
      .setDescription('**Role Added to Member**')
      .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ size: 4096, extension: 'png' })}` })
      .setColor(0xffff00)
      .addFields([
        { name: 'Role added to', value: `${member} (${member.id})` },
        { name: 'Role added by', value: `<@${interaction.member.user.id}> (${interaction.member.user.id})` },
        { name: 'Role added in', value: `${interaction.channel}` },
        { name: 'Role added at', value: `<t:${Math.round(interaction.createdTimestamp / 1000)}:F>` },
        { name: 'Role added', value: `${role}` }
      ])
      .setTimestamp()
      .setFooter({ text: `${interaction.member.user.tag}`, iconURL: `${interaction.member.avatarURL({ size: 4096, extension: 'png' })}` })

    const channel = interaction.guild.channels.fetch(ids.channels.logging.user)
    channel.send({ embeds: [embed] })
  }
}
