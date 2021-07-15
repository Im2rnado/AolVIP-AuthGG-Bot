const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
	name: "version",
	description: "Gets current checker version",
	aliases: ["v"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		const embed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle("**AolVIP Checker**")
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter("Made by tornado#9999")
			.setDescription("First EditionR")
			.addField("RAM Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

		message.channel.send(embed);
	},
};
