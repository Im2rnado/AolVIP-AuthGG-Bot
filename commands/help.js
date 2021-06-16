const Discord = require("discord.js");
const _ = require("lodash");

module.exports = {
	name: "help",
	description: "Get all commands",
	/**
	 * @param {Discord.Message} message
	 * @param {String[]} args
	 */
	async execute(message, args, client) {
		let { commands } = client;

		if (!args.length) {

			const commandsPerPage = 9;

			commands = Array.from(commands, ([name, value]) => ({
				name,
				value,
			}));
			let pages = _.chunk(commands, commandsPerPage);

			pages = pages.map((page, index) => {
				const fields = page.map(command => ({
					name: `${command.value.name}`,
					value: `${command.value.description}\nAliases: \`${command.value.aliases ? command.value.aliases.join(", ") : "None"}\``,
					inline: true,
				}));

				const embed = new Discord.MessageEmbed()
					.setTitle(":mailbox_with_mail: Hey! Want some help?")
					.setColor("RANDOM")
					.addFields(fields)
					.setFooter(`Page ${index + 1} of ${pages.length}`);

				return embed;
			});

			const msg = await message.channel.send(pages[0]);

			if (pages.length === 1) return;
			msg.react("⏮");
			msg.react("⬅️");
			msg.react("➡️");
			msg.react("⏭️");

			msg.delete({
				timeout: 250000,
			}).catch();

			const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

			let pageIndex = 0;

			collector.on("collect", async (messageReaction) => {

				if (messageReaction.emoji.name == "⏮") {
					pageIndex = 0;
				}

				if (messageReaction.emoji.name == "⬅️") {
					pageIndex--;
				}

				if (messageReaction.emoji.name == "➡️") {
					pageIndex++;
				}

				if (messageReaction.emoji.name == "⏭️") {
					pageIndex = pages.length - 1;
				}

				if (pageIndex == -1 || !pages[pageIndex]) {
					pageIndex = 0;
				}

				msg.edit(pages[pageIndex]);

				const notbot = messageReaction.users.cache.filter(clientuser => clientuser !== client.user).first();
				await messageReaction.users.remove(notbot);
			});

			/**
			const yourEmbed = new Discord.MessageEmbed()
				.setColor("#0099ff")
				.setTitle(":mailbox_with_mail: Hey! Want some help?")
				.addField("Categories", "`Account` - `Battle Royale` - `Creative` - `Friends` - `STW` - `Fun` - `Info` - `Moderation` - `Valorant`")
				.setDescription(`**Prefix: ${prefix}\n[Commands List](https://github.com/Im2rnado/Carbide-Help)\n[Dashboard](https://carbidebot.com)\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.id}&permissions=8&scope=bot)\n[Telegram](https://t.me/CarbideFNBot)**`)
				.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
					dynamic: true,
				}));
			return message.channel.send(yourEmbed);
			*/
		}
		else {

			const name = args.join(" ").toLowerCase();
			let command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				const exiss = commands.find(c => c.category && c.category.toLowerCase().includes(name));
				if (exiss) {
					command = commands.filter(c => c.category === exiss.category);
					const embed1 = new Discord.MessageEmbed()
						.setTitle(":mailbox_with_mail: " + args.join(" "))
						.setColor("RANDOM")
						.setFooter("Made by tornado#9999");

					command.forEach((el) => {
						embed1.addField(el.name, el.description, true);
					});

					return message.channel.send(embed1);
				}
				else {
					const embed1010 = new Discord.MessageEmbed()
						.setColor("RANDOM")
						.setTitle(`The command **${args.join(" ")}** doesn't exist!`)
						.setFooter("Need Help? Use .help");
					return message.channel.send(embed1010);
				}
			}

			const embed1 = new Discord.MessageEmbed()
				.setTitle(`:mailbox_with_mail: ${command.name} | Command Help`)
				.setColor("RANDOM")
				.setFooter("Need Help? Use .help");

			if (command.aliases) embed1.addField("**Aliases**:", `${command.aliases.join(" - ")}`, true);
			if (command.description) embed1.addField("**Description**:", `${command.description}`);
			if (command.category) embed1.addField("**Category**:", `${command.category}`);

			message.channel.send(embed1);
		}
	},
};