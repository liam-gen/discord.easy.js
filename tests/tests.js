const discord = require('../index')

async function sleep(ms) {
    return new Promise((resolve) => {
    setTimeout(resolve, ms);
});
}


const bot = new discord.Bot('fr', '!')

bot.on('start', client => {
    console.log(client.tag) 
})

bot.on('message', (message, author, channel, args, command, util) => {
    if(author.bot) return 

    /* Embed example */
    if(command === "embed"){
        message.sendEmbed("Embed", "I am the beautiful description!", "Hmmm A nice footer", "GREEN", ({name: "Field 1", value: "Value 1"}, {name: "Field 2", value: "Value 2"}))
    }

    /* Ping example */
    if(command === "ping"){
        message.send("My latency is `$ping`ms")
        message.errorMessage('Here it\'s error')
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

    if (command === "clear"){
        message.makeClear()
    }

    if (command === "s-info"){
        let info = util.serverinfo.guild
        message.send(`Name: ${info.name}, members: ${info.memberCount}, bots: ${info.bots}, icon: ${info.icon}, emojisCount: ${info.emojiCount}, created: ${info.created}`)
    }

})

bot.on('giveawayReactionAdd', (giveaway, member, reaction, prize) => {
    member.send(`Hey ${member.tag}! Vous avez bien réagis au giveaway ${reaction.emoji}. Vous avez peut être une chance de gagner \`${prize}\``)
})

bot.on("giveawayEnd", (giveaway, winners, prize) => {
    if(!winners) return
    winners.forEach((member) => {
        member.send('Congratulations, '+member.user.username+', you won: '+prize);
    });
})

bot.on("giveawayStart", (giveaway, channel) => {
    console.log('go')
    channel.send(`Vous avez bien créer un giveaway dans le salon ${channel}! Le prix est ${giveaway.prize} et la durée est de ${giveaway.time}`)
})


bot.on('message', async(message) => {
    if (message.content.startsWith("!botstop")){
        await message.send('I stop')
        await sleep(5000)
        await bot.logout()
    }
})

bot.setStatus('I\'m a good bot') 

bot.login('ODEyNDMwODk0Njc2NTc0MjQ4.YDApOw.9pMNs_wCnWKIYijiHRWsMFM_JdU')