const { Message, MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const { Embed } = require('./embed')
const { GiveawaysManager } = require('discord-giveaways');
const ms = require('ms')
const translate = require('@vitalets/google-translate-api');
const { isSupported } = require('./langs')

Message.prototype.sendEmbed = async function(title, description, footer, color='#fff', fields) {
    
        
        
        let embed = new Embed()
        embed.setTitle(title)
        embed.setDescription(description)
        embed.setColor(color)
        embed.setFooter(footer)
        if(fields) embed.setFields(fields)
        this.channel.send(embed)
}

Message.prototype.sendButton = async function(label, color, id) {
    
        
        
    let button = new MessageButton()
        .setStyle(color)
        .setLabel(label)
        .setID(id)
        .setDisabled(true)
    this.channel.send(button)
}

Message.prototype.send = async function(text) {
    let replace = `${text}`
    .replace('$ping', `${Date.now() - this.createdTimestamp}`)
    .replace("$author", `${this.author.tag}`)
    if (!text) translate('The message cannot be empty!', {to: this.client.lang}).then(res => {
        throw new Error(res.text);
    })
    this.channel.send(replace)
}

Message.prototype.errorMessage = async function(error){
    if (!error) translate('The error cannot be empty!', {to: this.client.lang}).then(res => {
        throw new Error(res.text);
    })
    let errorEmbed = new MessageEmbed()
    let resTitle = await translate('Error', {to: this.client.lang})
    errorEmbed.setTitle(resTitle.text)
    let resFooter = await translate('Error message', {to: this.client.lang})
    errorEmbed.setFooter(resFooter.text); 
    errorEmbed.setColor("RED")
    errorEmbed.setDescription(`:x: - ${error}`)
    errorEmbed.setTimestamp()
    this.channel.send(errorEmbed)

}
Message.prototype.command = async function(command){
    if (this.content.startsWith(command)) return new Boolean(true)
    if (!this.content.startsWith(command)) return new Boolean(false)
}

Message.prototype.makeSay = async function(noArgsMsg=":x: You must fill in arguments."){
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    if(!args[0]) return this.channel.send(noArgsMsg)
    this.delete()
    this.channel.send(args.join(" "))
}

Message.prototype.makeKick = async function(kickMessage="I have kicked $user", permission="KICK_MEMBERS"){
    if (permission && !this.member.hasPermission(permission)){
        let translatedPermission = await translate("You don't have the required permissions to use this command", {to: this.client.lang})
        return this.channel.send(":x: "+translatedPermission.text)
    }
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    const user = this.mentions.users.first()
    const reason = (args.splice(1).join(' ') || 'No reason given.')
    if (user){
        this.guild.member(user).kick(reason)
        let replace = kickMessage
        .replace('$user', `${user.tag}`)
        this.channel.send(replace)
    } else {
        let userNotExists = await translate('The user does not exist.', {to: this.client.lang})
        return this.channel.send(":x: "+userNotExists.text)
    }
}

Message.prototype.makeBan = async function(banMessage="I have banned $user", permission="BAN_MEMBERS"){
    if (permission && !this.member.hasPermission(permission)){
        let translatedPermission = await translate("You don't have the required permissions to use this command", {to: this.client.lang})
        return this.channel.send(":x: "+translatedPermission.text)
    }
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    const user = this.mentions.users.first()
    const reason = (args.splice(1).join(' ') || 'No reason given.')
    if (user){
        this.guild.member(user).ban(reason)
        let replace = banMessage
        .replace('$user', `${user.tag}`)
        this.channel.send(replace)
    } else {
        let userNotExists = await translate('The user does not exist.', {to: this.client.lang})
        return this.channel.send(":x: "+userNotExists.text)
    }
}

Message.prototype.makeStartGiveaway = async function(permission, doneMsg="I started a giveaway in the channel $channel"){
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    if(permission && !this.member.hasPermission(permission)){
        let translatedPermission = await translate("You don't have the required permissions to use this command", {to: this.client.lang})
        return this.channel.send(":x: "+translatedPermission.text)
    }
    let giveawayDuration = args[0];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        let noValidDuration = await translate('You have to specify a valid duration!', {to: this.client.lang})
        return this.channel.send(":x: "+noValidDuration.text);
    }
    let noWinners = await translate('You must specify a number of winners', { to: this.client.lang})
    if (!args[1]) return this.channel.send(":x: "+noWinners.text)
    let noPrice = await translate('You must specify a price', {to: this.client.lang})
    if (!args[2]) return this.channel.send(":x: "+noPrice.text)
    this.client.giveawaysManager.start(this.channel, {
        time: ms(args[0]),
        winnerCount: parseInt(args[1]),
        prize: args.slice(2).join(' '),
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    })
    let finnalyMsg = doneMsg.replace('$channel', `${this.channel}`)
    this.channel.send(finnalyMsg)
}

Message.prototype.makeRerollGiveaway = async function(permission, doneMsg="Giveaway rerolled!"){
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    if(permission && !this.member.hasPermission(permission)){
        let translatedPermission = await translate("You don't have the required permissions to use this command", {to: this.client.lang})
        return this.channel.send(":x: "+translatedPermission.text)
    }

    if(!args[0]){
        let noMsgId = await translate('You have to specify a valid message ID!', {to: this.client.lang})
        return this.channel.send(':x: '+noMsgId.text);
    }

    let giveaway = this.client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === this.guild.id) || this.client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === this.guild.id);

    if(!giveaway){
        let noGiveaway = await translate("Unable to find a giveaway for ", {to: this.client.lang})
        return this.channel.send(":x: "+noGiveaway.text+ args.join(' ') +'`.');
    }

    this.client.giveawaysManager.reroll(giveaway.messageID)
    .then(async() => {
        this.channel.send(doneMsg);
    })
    .catch(async(e) => {
        if(e == `Giveaway with message ID ${giveaway.messageID} is not ended.`){
            let notEnded = await translate('This giveaway is not ended!', {to: this.client.lang})
            this.channel.send(":x: "+notEnded.text);
        } else {
            console.error(e);
            let errorMsg = await translate("An error occured...", {to: this.client.lang})
            this.channel.send(':x: '+errorMsg.text);
        }
    });
}

Message.prototype.makeEndGiveaway = async function(permission, doneMsg="Giveaway will end in less than $time seconds..."){
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    if(permission && !this.member.hasPermission(permission)){
        let translatedPermission = await translate("You don't have the required permissions to use this command", {to: this.client.lang})
        return this.channel.send(":x: "+translatedPermission.text)
    }

    if(!args[0]){
        let noMsgId = await translate('You have to specify a valid message ID!', {to: this.client.lang})
        return this.channel.send(':x: '+noMsgId.text);
    }

    let giveaway = this.client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === this.guild.id) || this.client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === this.guild.id);

    if(!giveaway){
        let noGiveaway = await translate("Unable to find a giveaway for ", {to: this.client.lang})
        return this.channel.send(":x: "+noGiveaway.text+ args.join(' ') +'`.');
    }


    this.client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    }).then(async() => {
        let replace = doneMsg.replace('$time', `${this.client.giveawaysManager.options.updateCountdownEvery/1000}`)
        this.channel.send(replace);
    })
    .catch(async(e) => {
        if(e == `Giveaway with message ID ${giveaway.messageID} is already ended.`){
            let alreadyEnd = await translate('This giveaway is already ended!', {to: this.client.lang})
            this.channel.send(alreadyEnd.text);
        } else {
            console.error(e);
            let errorMsg = await translate('An error occured...', {to: this.client.lang})
            this.channel.send(errorMsg.text);
        }
    });
}

Message.prototype.isSupportedLanguage = async function(lang){
    return isSupported(lang)
}

Message.prototype.setLanguage = async function(lang){
    if (!lang) return
    let notSupported = await translate("is not a valid language!", {to: this.client.lang})
    if(!isSupported(lang)) return this.channel.send(`:x: "${lang}" `+notSupported.text)
    this.client.lang = lang
}

Message.prototype.setPrefix = async function(prefix){
    if (!prefix) return
    let noLength = await translate("The prefix must not exceed 2 characters", {to: this.client.lang})
    if(prefix.length > 3) return this.channel.send(":x: "+noLength.text)
    this.client.prefix = prefix
}

Message.prototype.translate = async function(){
    let args = this.content.slice(this.client.prefix || "").trim().split(/ +/g);
    translate(args.splice(3).join(' '), {from: args[1], to: args[2]}).then((res) => this.channel.send(res.text)).catch((e) => console.log(e))
}