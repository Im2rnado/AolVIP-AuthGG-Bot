const Discord = require("discord.js");

module.exports = {
	name: "info",
	description: "Gets info on user/license",
	aliases: ["whois", "lookup"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		if (!args.length) return;
		const selection = args[0];
		const input = args[1];

		const loading = await message.channel.send(`<a:loading:853778455836885012> Getting ${selection == "user" ? "user" : "key"} info`);

		try {
			if (selection == "user") {
				const data = await client.API.getUserInfo(input);

				const embedMsg = UserEmbed(data);
				loading.edit("", embedMsg);
			}
			else if (selection == "license") {
				const data = await client.API.getLicenseInfo(input);

				const embedMsg = LicenseEmbed(data);
				loading.edit("", embedMsg);
			}
			else if (selection.startsWith("FORTNITIFY-")) {
				const data = await client.API.getUserInfo(input);

				const embedMsg = UserEmbed(data);
				loading.edit("", embedMsg);
			}
			else {
				const data = await client.API.getLicenseInfo(input);

				const embedMsg = LicenseEmbed(data);
				loading.edit("", embedMsg);
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

function UserEmbed(data) {
	for (const value in data) {
		if (data[value] === "") data[value] = "nil";
	}
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle("Lookup Data")
		.setDescription(`Data for user: ${data.username}`)
		.addFields(
			{ name: "Username: ", value: data.username, inline: true },
			{ name: "Email: ", value: data.email, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.addFields(
			{ name: "Rank: ", value: data.rank, inline: true },
			{ name: "HWID: ", value: data.hwid, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.addFields(
			{ name: "Variable: ", value: data.variable, inline: true },
			{ name: "Last Login: ", value: data.lastlogin, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.addFields(
			{ name: "Last IP: ", value: data.lastip, inline: true },
			{ name: "License Expiry: ", value: data.expiry, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.setTimestamp()
		.setColor("#00ff3c");

	return dataEmbed;
}

function LicenseEmbed(data) {
	for (const value in data) {
		if (data[value] === "") data[value] = "nil";
	}
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle("Lookup Data")
		.setDescription(`Data for license: ${data.license}`)
		.addFields(
			{ name: "License: ", value: data.license, inline: true },
			{ name: "Rank: ", value: data.rank, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.addFields(
			{ name: "Used: ", value: data.used, inline: true },
			{ name: "Used By: ", value: data.used_by, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.addFields(
			{ name: "Created: ", value: data.created, inline: true },
		)
		.addField("\u200B", "\u200B", true)
		.setTimestamp()
		.setColor("#00ff3c");

	return dataEmbed;
}