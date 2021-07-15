const Discord = require("discord.js");

module.exports = {
	name: "pay",
	description: "Returns payment methods",
	aliases: ["payment"],
	/**
     * @param {Discord.Message} message
     */
	execute(message) {
		return message.channel.send("BTC - 3Mgw84h62X5z2G3L3qStXguEE2PZUN7zXL\nLTC - MPfUZYHvZY34LzANoH51rzQK7fwLSpfBgo\nCoinbase - syxtemzyt@gmail.com");
	},
};