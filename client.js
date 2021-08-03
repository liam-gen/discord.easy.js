const discord = require('discord.js')
var { EventEmitter } = require('events')
const { Embed } = require('./embed')
const { GiveawaysManager } = require('./giveaway/Manager');
const { isSupported } = require('./langs')
const translate = require('@vitalets/google-translate-api');
require('./message')
require('discord-buttons')

/* Soon v2.0.0 */

/*module.exports.Field = class champ extends Field{
    constructor(){
        super()
    }
}*/

class Args{
    constructor(args){
        this.args = args
    }

    toSay(){
        return this.args.join(" ")
    }

    get(i){
        return this.args[i]
    }
}
module.exports.Bot = class Client extends EventEmitter{
    constructor(lang="en", prefix){
        super()
        if (!isSupported(lang)){
            console.log(new Error(`"${lang}" is not a valid language!`))
            process.exit(1)
        }
        this.lang = lang
        if(prefix.length > 3) translate("The prefix must not exceed 3 characters", {to: this.lang}).then((res) => {
            console.log(new Error(res.text))
            process.exit(1)
        })
        this.prefix = prefix
        this.client = new discord.Client()
        this.manager = new GiveawaysManager(this.client, {
            storage: './giveaways.json',
            updateCountdownEvery: 10000,
            hasGuildMembersIntent: false,
            default: {
                botsCanWin: false,
                exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
                embedColor: '#FF0000',
                embedColorEnd: '#00FF00',
                reaction: '🎉',
                everyoneMention: false
            }
        });
        this.client.prefix = prefix
        this.client.giveawaysManager = this.manager
        this.client.lang = this.lang
        this.ready = false
        this.client.on('ready', () => {
            this.emit('start', this.client.user)
            this.ready = true
        })
        this.client.giveawaysManager.on("giveawayStart", (optionsGiveaway, channel) => {
            this.emit("giveawayStart", optionsGiveaway, channel)
        })
        this.client.giveawaysManager.on('giveawayEnded', (giveaway, winner) => {
            this.emit("giveawayEnd", giveaway, winner, giveaway.prize)
        })
        this.client.giveawaysManager.on('giveawayReactionAdded', (giveaway, member, reaction) => {
            this.emit("giveawayReactionAdd", giveaway, member.user, reaction, giveaway.prize)
        })
        this.client.giveawaysManager.on('giveawayReactionRemoved', (giveaway, member, reaction) => {
            this.emit("giveawayReactionRemove", giveaway, member.user, reaction, giveaway.prize)
        })
        this.client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
            this.emit('giveawayReroll', giveaway, winners, giveaway.prize)
        })
        this.client.on('message', message => {

            
            function thisUtil(){
                let util = {
                    serverinfo: {
                    guild: {
                        name: message.guild.name,
                        id: message.guild.id,
                        owner: message.guild.owner,
                        region: message.guild.region,
                        memberCount: message.guild.memberCount,
                        humans: message.guild.memberCount - message.guild.members.cache.filter(m=>m.user.bot).size,
                        bots: message.guild.members.cache.filter(m=>m.user.bot).size,
                        created: message.guild.createdAt.toLocaleString(),
                        roles: message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()),
                        icon: message.guild.iconURL({ dynamic: true }),
                        emojiCount: message.guild.emojis.cache.size
                    }
                }
            }
            return util
        }
        if(message.channel.type !== "dm") this.util = thisUtil()
            let args = message.content.slice(this.prefix || "").trim().split(/ +/g);
            let command = args.shift().toLowerCase()
            let cmd = command.replace(this.prefix, "")
            this.emit('message', message, message.author, message.channel, args, cmd, this.util)
        })
    }

    setStatus(name){
        this.client.on('ready', () => {
            this.client.user.setActivity(name)
        })
    }


    login(token){
        if (!token || typeof token !== 'string'){
            throw new Error('The token is invalid')
        }
        this.client.login(token)
    }

    logout(){
        process.exit(1)
    }
}