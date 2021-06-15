const Discord = require("discord.js");

module.exports = {
	name: "users",
	description: "Retrieves list of all users from Auth.GG API",
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	async execute(message, args, client) {
		const loading = await message.channel.send("<a:loading:853778455836885012> Getting users");
		const data = await client.API.getAllUsers();

		const userArray = CreateUserArray(data);

		loading.edit("", GenerateEmbed(userArray, 0)).then(msg => {
			if (userArray.length <= 5) return;
			msg.react("➡️");
			const reactCollector = msg.createReactionCollector(
				(reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === message.author.id,
				{ time: 60000 }, // timeout
			);
			let curIndex = 0;
			reactCollector.on("collect", reaction => {
				msg.reactions.removeAll().then(async () => {
					reaction.emoji.name === "⬅️" ? curIndex -= 5 : curIndex += 5;
					msg.edit(GenerateEmbed(userArray, curIndex));
					if (curIndex !== 0) await msg.react("⬅️");
					if (curIndex + 5 < userArray.length) msg.react("➡️");
				});
			});
		});
	},
};

function CreateUserArray(data) {
	const tempArray = [];
	for (const value in data) {
		tempArray.push(data[value].username);
	}
	return tempArray;
}

function GenerateEmbed(data, index) {
	const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle("List of Users")
		.setTimestamp()
		.setColor("#00ff3c")
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} users`);
	current.forEach(user => dataEmbed.addField("Username: ", user));
	return dataEmbed;
}