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
		const loading = await message.channel.send("<a:loading:853778455836885012> Getting version");

		try {
			const { data } = await axios.get("https://raw.githubusercontent.com/Im2rnado/Fortnitify/main/version.txt");
			console.log(data);

			const embed = new Discord.MessageEmbed()
				.setColor("RED")
				.setTitle("**Fortnitify Checker**")
				.setThumbnail(client.user.displayAvatarURL())
				.setFooter("Made by tornado#9999")
				.addField("Version", data.isNaN() ? data : data.toFixed(1))
				.addField("RAM Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

			loading.edit("", embed);
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