const { IntentsBitField, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle, Collection, ActivityType } = require("discord.js");
const randomPuppy = require("random-puppy");
const fs = require("node:fs");
const io = require("@pm2/io");
const mongoose = require("mongoose");
const curl = require("curl");
const { Database, token, update, backup } = require("./config.json");
const bandb = require("./Schemas/BanSchema.js");
const warndb = require("./Schemas/WarnSchema.js");
const mutedb = require("./Schemas/MuteSchema.js");
const countdb = require("./Schemas/CountSchema.js");
const filterdb = require("./Schemas/FilterSchema.js");
const { waitForDebugger } = require("node:inspector");
const PREFIX = "?a";
const bot = new Client({ intents: new IntentsBitField(3276799) });

let hours = 0;
let feedcon = 0;
let state = 1;

bot.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const ids = JSON.parse(fs.readFileSync("./ids.json", "utf-8"));\

// Do not touch above
