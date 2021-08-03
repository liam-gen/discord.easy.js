<p align="center">
<a href="https://discordeasyjs.yukorl.repl.co"><img src="https://discordeasyjs.yukorl.repl.co/public/assets/banner.png"></a>
<br>
<br><br>
<br>
<p align="center">
<a href="https://www.npmjs.com/package/mocha"><img src="https://img.shields.io/npm/v/discord.easy.js.svg" alt="NPM Version"></a>
<a href="https://github.com/mochajs/mocha"><img src="https://img.shields.io/node/v/discord.easy.js.svg" alt="Node Version"></a>
<a href="https://www.npmjs.com/package/discord.easy.js"><img src="https://img.shields.io/npm/dt/discord.easy.js.svg?maxAge=3600" alt="NPM downloads" /></a><br><br>
<a href="https://nodei.co/npm/discord.easy.js/"><img src="https://nodei.co/npm/discord.easy.js.png?downloads=true&stars=true" alt="npm installnfo" /></a>
</p>




## Description
discord.easy.js is a library using discord.js and nodejs to code your bot more easily

## About
discord.easy.js is a powerful Node.js & discord.js module that allows you to easily interact with the Discord API.

- Free
- Easy
- Performant

## Installation
**Node.js 12.0.0 or newer is required.**

`npm install discord.easy.js`

## Example usage
```js
const discord = require('discord.easy.js')

const bot = new discord.Bot('!', 'en') // The prefix is ​​require but the language is optionnal

bot.on('start', client => {
    console.log(client.tag) // When the bot is ready, it will send the username and discriminator in your console
})


bot.on('message', (message, author, channel, args, command) => {
    if(author.bot) return // If author of message is a bot then we stop the code

    /* Embed example */
    if(command === "embed"){
        message.sendEmbed("Embed", "I am the beautiful description!", "Hmmm A nice footer", "GREEN")
    }

    /* Ping example */
    if(command === "ping"){
        message.send("My latency is `$ping`ms") // $ping will be automatically replaced by the bot latency
    }

    /* Say example */
    if (command === "say"){
        message.makeSay()
    }

    /* Kick & Ban example */

    if (command === "kick"){
        message.makeKick("I have kicked $user!", "KICK_MEMBERS") // The done message is optionnal. $user will be replaced by the mention of the kicked user. The default permission is KICK_MEMBERS
    }

    if (command === "ban"){
        message.makeBan("I have banned $user!", "BAN_MEMBERS") // The done message is optionnal. $user will be replaced by the mention of the banned user. The default permission is BAN_MEMBERS
    }

    /* More : https://github.com/liam-gen/discord.easy.js/blob/main/examples.md */
})

bot.setStatus('Powered by discord.easy.js') // Set the bot status

bot.login('DISCORD_API_TOKEN')
```

## Help

You can contact me by this address: liamgen.pro@gmail.com<br>
My discord : liamgen#7777

### Dev logs 


## v1.0.6 - 03/08/2021 at 3:30
#### en - EN
- Added new events for giveaways
- Added a "utils" element in the call to the message event
- Added the clear command
- Fixed some bugs
- Optimizations of some commands
- Removed the discord-giveaways module
- We are now independent of the discord-giveaways module

#### fr - FR
- Ajout de nouveaux évènements pour les cadeaux
- Ajout d'un élément "utils" dans l'appel de l'évènement message
- Ajout de la commande clear
- Correction de quelques bugs
- Optimisations de certaines commandes
- Supression du module discord-giveaways
- Nous sommes maintenant indépendant du module discord-giveaways