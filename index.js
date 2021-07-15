const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");
const AuthGG = require("./lib");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.config = config;
client.API = new AuthGG(config.auth);

// functions
function ImportCommands() {
	const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on("ready", () => {
	ImportCommands();

	function randomStatus() {
		const status = ["over AOL accounts", `${client.users.cache.size} users`];
		const rstatus = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[rstatus], { type: "WATCHING" });
	} setInterval(randomStatus, 20000);

	console.log(`Loaded a total of ${client.commands.size} commands.`);
	console.log(`${client.user.tag} (${client.user.id}), ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);

	const OnlineEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle("Bot is online!")
		.addField("Total Guilds", client.guilds.cache.size)
		.addField("Total Commands", client.commands.size)
		.setFooter("AolVIP Discord Bot", client.user.displayAvatarURL());
	client.channels.cache.get(config.logs).send(OnlineEmbed);
});

client.on("message", async message => {
	const prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmdd => cmdd.aliases && cmdd.aliases.includes(commandName));

	if (!command) return;

	if(command.guildOnly && !message.guild) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("❌ This command is only available on servers!");
		return message.channel.send(yourEmbed);
	}

	if(command.disabled) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("❌ This command is currently disabled!");
		return message.channel.send(yourEmbed);
	}

	if(command.adminOnly && !config.admins.includes(message.author.id)) {
		return message.react("🤡");
	}

	console.log(`${message.author.username} (${message.author.id}) used command "${command.name}"`);

	try {
		await command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		const errormessage = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("❌ **That wasn't supposed to happen!**")
			.setDescription(`It seems like you encountered an error! You can [join our Support Server](${config.invite}) and report it there.`)
			.addField("Error Message: ", error.message ? error.message : error);

		message.channel.send(errormessage);

		client.channels.cache.get(config.logs).send(
			`__**⚠ Error Report**__\n**User**: ${message.author.tag} \`${message.author.id}\`\n**Command**: ${message.content}\n\`\`\`${error.stack}\`\`\``,
		);
	}

});

client.login(config.token);

client.on("error", console.error);
client.on("shardError", console.error);
client.on("warn", console.warn);

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
process.on("warning", console.warn);