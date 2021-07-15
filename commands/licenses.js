const Discord = require("discord.js");

module.exports = {
	name: "licenses",
	description: "Retrieves list of all licenses from Auth.GG API",
	aliases: ["license", "keys"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		const loading = await message.channel.send("<a:loading:862769697841348630> Getting licenses");
		const data = await client.API.getAllLicense();

		const licenseArray = CreateLicenseArray(data);

		loading.edit("", GenerateEmbed(licenseArray, 0)).then(msg => {
			if (licenseArray.length <= 5) return;
			msg.react("➡️");
			const reactCollector = msg.createReactionCollector(
				(reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === message.author.id,
				{ time: 60000 }, // timeout
			);

			let curIndex = 0;

			reactCollector.on("collect", reaction => {
				msg.reactions.removeAll().then(async () => {
					reaction.emoji.name === "⬅️" ? curIndex -= 5 : curIndex += 5;
					msg.edit(GenerateEmbed(licenseArray, curIndex));
					if (curIndex !== 0) await msg.react("⬅️");
					if (curIndex + 5 < licenseArray.length) msg.react("➡️");
				});
			});
		});
	},
};

function CreateLicenseArray(data) {
	const tempArray = [];
	let licenseObj = {};
	for (const value in data) {
		licenseObj = {
			token: data[value].token,
			days: data[value].days,
		};
		tempArray.push(licenseObj);
	}
	return tempArray;
}

function GenerateEmbed(data, index) {
	const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle("List of Licenses")
		.setTimestamp()
		.setColor("#00ff3c")
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} licenses`);
	current.forEach(arr => dataEmbed.addFields(
		{ name: "License: ", value: arr.token, inline: true },
		{ name: "Days: ", value: arr.days, inline: true },
		{ name: "\u200B", value: "\u200B", inline: true },
	));
	return dataEmbed;
}