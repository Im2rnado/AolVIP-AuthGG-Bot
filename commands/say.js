const Discord = require("discord.js");

module.exports = {
	name: "say",
	description: "Says anything you want",
	guildOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args) {
		if (!message.guild || !args.length) return;

		const embed = new Discord.MessageEmbed();

		if(!message.member.hasPermission("ADMINISTRATOR")) {
			embed.setColor("#FF0000");
			embed.setTitle("❌ You do not have permission to use this command!");
			return message.channel.send(embed);
		}

		let sayMessage = args.join (" ");
		message.delete().catch(err => console.log(err));

		if(args[0] === "embed") {
			sayMessage = args.slice(1).join(" ");
			embed.setColor("RED");
			embed.setDescription(sayMessage);
			return message.channel.send(embed);
		}

		message.channel.send(sayMessage);
	},
};