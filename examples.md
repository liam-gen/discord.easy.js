## Examples 


### **Start**

#### Init
```js
const discord = require('discord.easy.js')

const bot = new discord.Bot('!', 'en') // The prefix is ​​require but the language is optionnal

bot.on('start', client => {
    console.log(client.tag) // When the bot is ready, it will send the username and discriminator in your console
})


bot.on('message', (message, author, channel, args, command) => {
    if(author.bot) return // If author of message is a bot then we stop the code

    if(command === "hello"){
        message.send("Hello World")
    }
})

bot.setStatus("Im' good bot!") // Set the bot status

bot.login('DISCORD_API_TOKEN')
```

#### Ping

```js
bot.on('message', (message, author, channel, args, command) => {

    if(command === "ping"){
        message.send("My latency is `$ping`ms") // $ping will be automatically replaced by the bot latency
    }
}
```

#### Embed 

```js
if(command === "embed"){
    message.sendEmbed("Embed", "I am the beautiful description!", "Hmmm A nice footer", "GREEN", {name: "I'm a good field!", value: "HoOoOoO i'm field value XD"}) // Embed args : title, description, footer, color and fields 
}

if (command === "divers-fields"){
    message.sendEmbed("Embed", "I am the beautiful description!", "Hmmm A nice footer", "GREEN", ({name: "Field 1", value: "Value 1"}, {name: "Field 2", value: "Value 2"}))
}
```
#### Say
```js
if (command === "say"){
        message.makeSay()
}
```
### **Moderation**

#### Kick

```js
if (command === "kick"){
        message.makeKick("I have kicked $user!", "KICK_MEMBERS") // The done message is optionnal. $user will be replaced by the mention of the kicked user. The default permission is KICK_MEMBERS
}
```

#### Ban

```js
if (command === "ban"){
        message.makeKick("I have banned $user!", "BAN_MEMBERS") // The done message is optionnal. $user will be replaced by the mention of the banned user. The default permission is BAN_MEMBERS
}
```

### **Giveaway**

#### Start

```js
if (command === "g-start"){
        message.makeStartGiveaway("ADMINISTRATOR", "I started a giveaway in the channel $channel!") // The permission is required. The default done message is : I started a giveaway in the channel $channel. $channel will be replaced by the giveaway start channel
}
```

#### Reroll

```js
if(command === "g-reroll"){
        message.makeRerollGiveaway("ADMINISTRATOR, "Giveaway rerolled !")// The permission is required. The default done message is : Giveaway rerolled!
}
```

#### End

```js
if(command === "g-end"){
        message.makeEndGiveaway("ADMINISTRATOR", "Giveaway will end in less than $time seconds...") // The permission is required. The default done message is : Giveaway will end in less than $time seconds...
}
```

### **Bot owner**

#### Setprefix

```js
// Async function is required
if (command === 'setprefix'){
        await message.setPrefix(args[0])
        await message.send(`Prefix changed to ${args[0]}!`)
}
```

#### Setlang

```js
// Async function is required
if (command === 'setlang'){
        await message.setLanguage(args[0])
        await message.send(`Language changed to ${args[]} `)
}
```

## Other functions

### isSupportedLanguage

```js
message.isSupportedLanguage('en') // Return true

message.isSupportedLanguage('qrhURZHrhTRZ4') // Return false
```
### Error Message

```js
message.errorMessage('A error test') // Return a embed error in channel of message
```

### Translate

```js
message.translate()
```