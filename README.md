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

    /* More examples : https://github.com/liam-gen/discord.easy.js/blob/main/examples.md */
})

bot.setStatus('Powered by discord.easy.js') // Set the bot status

bot.login('DISCORD_API_TOKEN')
```

## Help

You can contact me by this address: liamgen.pro@gmail.com<br>
My discord : liamgen#7777

### Dev logs 

v1.0.4 - 29/07/27 at 5:19
#### en - EN
- Create moderation commands
- Message arguments are not required
- Create the giveaways system
- Translate all commands
- Create a translator where the user defines a bot language
- Optimizations of some commands
- Added optional permissions for some commands
- Fixed some bugs
- Added functions to set the bot prefix and language
- Addition of a limitation of the prefix characters
- Added a function that checks if the language exists

#### fr - FR
- Création de commandes de modération
- Les arguments du message ne sont plus requis 
- Créer le système de cadeaux
- Traduire toutes les commandes
- Créer un traducteur où l'utilisateur définit un langage du bot
- Optimisations de certaines commandes
- Ajout d'autorisations facultatives pour certaines commandes
- Correction de quelques bugs
- Ajout de fonctions pour définir le préfix et la langue du bot
- Ajout d'une limitation des caractères du préfix
- Ajout d'une fonction qui check si la langue existe
