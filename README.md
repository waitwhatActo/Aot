# Acto Utils (Formerly Aot)

[![wakatime](https://wakatime.com/badge/github/cleverActon0126/Aot.svg)](https://wakatime.com/badge/github/cleverActon0126/Aot)

## About

Acto Utils (we'll use Aot here for more clarity) is an all-in-one bot, mostly focused on moderation. 
Aot is coded in JavaScript using Discord.js.
This bot is mainly designed for one specific server instead of being available for every server. 

## License

This open-source project is licensed under the GNU Affero General Public License v3.0. Read the full license [here](https://github.com/cleverActon0126/Aot/blob/master/LICENSE).

## Self-Host

If you want to use the bot, you must modify it and self-host. 

I do not recommend self-hosting the bot or modifying it for another server as it will be very difficult (stuff is hardcoded for one particular server). But if you want to, download the code and create a `config.json` file.

```json
{
    "token": "BOT_TOKEN",
    "clientId": "BOT_ID",
    "guildId": "SERVER_ID",
    "Database": "MONGODB_LINK",
    "backupbot": 0,
    "update": 0
}
```

## Credits

A huge thank you to everyone that made this project possible

- [@Delilah](https://github.com/RidgewayPlus) for contributing and helping out from time to time
- @Anon Zhe Yinglet for code feedback, improvements suggestion
- [@Jaska](https://github.com/jasius) for idea inspirations, code reference
- [@Erisa](https://github.com/Erisa) for ideas, code & list reference
- [Discord.JS](https://github.com/discordjs) main dependency of the project
- [Dependabot](https://github.com/apps/dependabot) keeping dependencies updated, and giving security advisories
- You (yes, you, the person reading this)
