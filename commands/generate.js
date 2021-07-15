const Discord = require("discord.js");

module.exports = {
	name: "generate",
	description: "Generates license",
	aliases: ["gen"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		const days = args[0] ? args[0] : 365;
		const amount = args[1] ? args[1] : 1;

		const loading = await message.channel.send("<a:loading:862769697841348630> Generating key");

		try {
			const keys = await client.API.generateLicense(days, amount, 1, 3, "AolVIP");
			loading.delete();
			message.react("✅");

			const object = Object.keys(keys);

			for (const key of object) {
				message.author.send(keys[key]);
			}
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