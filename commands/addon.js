const Discord = require("discord.js");

module.exports = {
	name: "addon",
	description: "Grants the addon to a user",
	aliases: ["rank"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		if (!args.length) return;
		const user = args[0];

		const loading = await message.channel.send("<a:loading:862769697841348630> Granting user addons");

		try {
			await client.API.changeUserRank(user, 5);

			const grantEmbed = new Discord.MessageEmbed()
				.setTitle(`✅ Successfully Granted ${user} Addons`)
				.setColor("#43B581")
				.setTimestamp()
				.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

			loading.edit("", grantEmbed);
		}
		catch (error) {
			console.error(error);
			const errormessage = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("❌ **That wasn't supposed to happen!**")
				.setDescription(`It seems like you encountered an error! You can [join our Support Server](${client.config.invite}) and report it there.`)
				.addField("Error Message: ", error.message ? error.message : error);

			loading.edit("", errormessage);

			client.channels.cache.get(client.config.logs).send(
				`__**⚠ Error Report**__\n**User**: ${message.author.tag} \`${message.author.id}\`\n**Command**: ${message.content}\n\`\`\`${error.stack}\`\`\``,
			);
		}
	},
};
