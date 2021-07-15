const Discord = require("discord.js");

module.exports = {
	name: "password",
	description: "Resets password of a user",
	aliases: ["pass", "resetpass"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		if (!args.length) return;
		const user = args[0];
		const pass = args.slice(1).join(" ");

		const loading = await message.channel.send("<a:loading:862769697841348630> Changing password");

		try {
			await client.API.changeUserPass(user, pass);

			const grantEmbed = new Discord.MessageEmbed()
				.setTitle(`✅ Successfully Changed ${user}'s password to ${pass}`)
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