const Discord = require("discord.js");

module.exports = {
	name: "delete",
	description: "Deletes user/license",
	aliases: ["del"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		if (!args.length) return;
		const selection = args[0];
		const input = args[1];

		const loading = await message.channel.send(`<a:loading:853778455836885012> Deleting ${selection == "user" ? "user" : "key"}`);

		try {
			if (selection == "user") {
				await client.API.deleteUser(input);

				const grantEmbed = new Discord.MessageEmbed()
					.setTitle(`✅ Successfully Deleted User ${input}`)
					.setColor("#43B581")
					.setTimestamp()
					.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				loading.edit("", grantEmbed);
			}
			else if (selection == "license") {
				await client.API.deleteLicense(input.replace("FORTNITIFY-", ""));

				const grantEmbed = new Discord.MessageEmbed()
					.setTitle(`✅ Successfully Deleted License ${input}`)
					.setColor("#43B581")
					.setTimestamp()
					.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				loading.edit("", grantEmbed);
			}
			else if (selection.startsWith("FORTNITIFY-")) {
				await client.API.deleteLicense(selection.replace("FORTNITIFY-", ""));

				const grantEmbed = new Discord.MessageEmbed()
					.setTitle(`✅ Successfully Deleted License ${selection}`)
					.setColor("#43B581")
					.setTimestamp()
					.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				loading.edit("", grantEmbed);
			}
			else {
				loading.delete();
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