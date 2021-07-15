const Discord = require("discord.js");

module.exports = {
	name: "botinfo",
	description: "Gets summary of the checker",
	aliases: ["bot"],
	adminOnly: true,
	/**
     * @param {Discord.Message} message
     * @param {String[]} args
     */
	execute(message) {
        message.delete();

		const embed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle("**AolVIP**")
			.addField("__What is AolVIP__", "It is one of the only working, high quailty, Aol.com mail:pass checker")
            .addField("__Features__", "```\n[1] Aol Brute - Checks the email and password validation, retries when there is a captcha\n[2] Aol Brute #2 - Same as #1 but retries until 15 times, then marks as Flagged\n\n[+] Uses a HQ API\n[+] Great CPM on almost every Residential proxies\n[+] Takes low CPU usage\n[+] CPM is very high (upto 8000-CPM) depending on your provider\n[+] Does not skip accounts\n[+] Does not lock accounts```")
            .addField("__Purchase__", "AolVIP costs $60 monthly. To purchase, open a ticket at <#862758910217027626>")
            .setImage("https://cdn.discordapp.com/attachments/862758586333528085/863140862145462322/unknown.png")
            .setURL("https://gyazo.com/8fabb9a729dd6399a062c768915c4b36");

		message.channel.send(embed);
        message.channel.send("https://gyazo.com/8fabb9a729dd6399a062c768915c4b36")
	},
};