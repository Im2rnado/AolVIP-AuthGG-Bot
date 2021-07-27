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
			.addField("__What is AolVIP__", "It is the only working, high quailty, Aol.com email:pass checker")
            .addField("__Features__", "```[1] Aol Brute - Checks the email and password validation, retries when there is a captcha\n[2] Aol Brute #2 + Custom Re-Check - Same as #1 + checks if 2FA is bypassable\n[3] Aol Inbox Scanner - Checks if a specific keyword is present in the inbox\n\n[+] Uses a HQ API\n[+] Great CPM (up-to 8000) on almost every Residential proxies\n[+] Takes low CPU usage\n[+] Does not skip or lock accounts```")
			.addField("__Purchase__", "Monthly: $60 - Inbox Scanner Addon: $20\nTo purchase, open a ticket at <#862758910217027626>")
            .setURL("https://gyazo.com/8fabb9a729dd6399a062c768915c4b36");

		message.channel.send(embed);
        message.channel.send("https://i.gyazo.com/8fabb9a729dd6399a062c768915c4b36.mp4")
	},
};