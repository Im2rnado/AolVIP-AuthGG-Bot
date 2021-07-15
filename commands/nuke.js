const Discord = require("discord.js");

module.exports = {
	name: "nuke",
	description: "Nukes a channel",
	guildOnly: true,
	/**
     * @param {Discord.Message} message
     */
	async execute(message) {
		if (!message.guild) return;

		const embed = new Discord.MessageEmbed();

		if(!message.member.hasPermission("ADMINISTRATOR")) {
			embed.setColor("#FF0000");
			embed.setTitle("❌ You do not have permission to use this command!");
			return message.channel.send(embed);
		}

		const regionEmbed = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("⛔ **Confirm Nuke** ⛔")
			.setDescription("✅ Confirm Nuke\n❌ Cancel Nuke")
			.addField("Warning", "This will delete all messages in this channel. You cannot undo after confirming!");

		const i = await message.channel.send(regionEmbed);
		i.react("✅").then(() => i.react("❌"));

		const filter = (reaction, user) => {
			return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		i.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
			.then(async collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === "✅") {
					await i.delete();

					const channel = await message.channel.clone();
					await channel.setPosition(message.channel.position);
					await message.channel.delete();
					channel.send(`**Successfully nuked ${channel}**\nhttps://media.giphy.com/media/hvGKQL8lasDvIlWRBC/giphy.gif`);
				}
				if (reaction.emoji.name === "❌") {
					await i.delete();
					message.channel.send("❌ Nuking Cancelled!");
				}
			});

	},
};