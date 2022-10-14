const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "Get bot ping :/",
    usage: "ping",
    run: (client, message) => {
      message.channel.send(`**:ping_pong:Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.:ping_pong:**`);
    }
    
  }