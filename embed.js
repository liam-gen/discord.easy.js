const { MessageEmbed } = require('discord.js')
module.exports.Embed = class Embed{
    constructor(){
        this.embed = new MessageEmbed()
    }

    setTitle(title){
        this.embed.setTitle(title)
    }

    setDescription(description){
        this.embed.setDescription(description)
    }

    setFooter(footer){
        this.embed.setFooter(footer)
    }

    setFields(fields){
        if(!fields) throw new Error("Fields cannot be empty.")
        this.embed.addFields(fields)
    }

    setColor(color='#fff'){
        this.embed.setColor(color)
    }
}

module.exports.Field = class Field{
    constructor(){
        this.inline = false
    }

    setTitle(title){
        if(!title) throw new Error("The title cannot be empty.")
        this.name = title
    }

    setValue(value){
        if(!value) throw new Error("The value cannot be empty.")
        this.value = value
    }

    setInline(inline){
        if(typeof inline !== 'boolean') throw new Error("The inline must be true or false.")
        this.inline = inline
    }

    get(){
        if(!this.value || !this.name) throw new Error("Title and value cannot be empty.")
        return `{name: "${this.name}", value: "${this.value}", inline: ${this.inline}}`
    }
}