# Acto Utils (Formerly Aot)

## About

Acto Utils (we'll use Aot here for more clarity) is an all-in-one bot, mostly focused on moderation. Although it's open-source, it's mainly designed for a specific server instead of all servers. Aot is programmed in JavaScript using Discord.js.

## License

This open-source project uses GNU Affero General Public License v3.0 for license. Read the full license [here](https://github.com/cleverActon0126/Aot/blob/master/LICENSE).

## Self-Host

If you want to use the bot, you'll have to modify it and self-host. A future public version may be made but at current times the main bot remains private.

I do not recommend self hosting the bot as modifying for another server will be very difficult (since it's built for one server, not multiple). But if you want to, download the code and unzip, then create `config.json`.

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

- [@Delilah](https://github.com/RidgewayPlus) for contributing and helping out from time to time (also Ily <3)
- [@Anon Zhe Yinglet](https://discord.com/users/997733711439216661) for code feedback, improvement director
- [@Jaska](https://github.com/jasius) for idea inspiring, code reference
- [@Erisa](https://github.com/Erisa) for code ideas, code & list reference
- [Discord.JS](https://github.com/discordjs) main dependency of the project
- [Dependabot](https://github.com/apps/dependabot) keeping dependencies updated, and giving security advisories
- You (yes, you, the person reading this)
