const discord = require('../index')

async function sleep(ms) {
    return new Promise((resolve) => {
    setTimeout(resolve, ms);
});
}


const bot = new discord.Bot('fr', '!') // The prefix is ​​optional but is required to use arguments and command

bot.on('start', client => {
    console.log(client.tag) // When the bot is ready, it will send the username and discriminator in your console
})

bot.on('message', (message, author, channel, args, command) => {
    if(author.bot) return // If author of message is a bot then we stop the code

    /* Embed example */
    if(command === "embed"){
        message.sendEmbed("Embed", "I am the beautiful description!", "Hmmm A nice footer", "GREEN", ({name: "Field 1", value: "Value 1"}, {name: "Field 2", value: "Value 2"}))
    }

    /* Ping example */
    if(command === "ping"){
        message.send("My latency is `$ping`ms")
        message.errorMessage('Ceci est une erreur')
    }

    /* Say example */
    if (command === "say"){
        message.makeSay()
    }

    if (command === "g-start"){
        message.makeStartGiveaway("ADMINISTRATOR")
    }

    if(command === "ban"){
        message.makeBan()
    }

    if(command === "g-end"){
        message.makeEndGiveaway()
    }

    if(command === "g-reroll"){
        message.makeRerollGiveaway()
    }

    if (command === 'setlang'){
        message.setLanguage(args[0])
        message.send('Succes !')
    }

    if (command === 'setprefix'){
        message.setPrefix(args[0])
        message.send("Prefix changed !")
    }

    if (command === "translate"){
        message.translate()
    }

})


bot.on('message', async(message) => {
    if (message.content.startsWith("!botstop")){
        await message.send('I stop')
        await sleep(5000)
        await bot.logout()
    }
})

bot.setStatus('Je suis un bot qui marche ...') // Set the bot status

bot.login('ODMyOTUwNTA1NDA2OTg4MzYw.YHrPmw.RBv_kYbpjH6NnuugWK9JtE4GCdw')