const logger = require("../../utils/log.js");

module.exports = function({ api, __GLOBAL, client }) {
	return async function({ event }) {
		if (client.userBanned.has(event.senderID) || client.threadBanned.has(event.threadID)) return;
		let commands = client.commands.values();
		for (const command of commands) {
			if (command.event) {
				try {
					command.event({ api, event, client, __GLOBAL });
				}
				catch (error) {
					logger(error + " at event command: " + command.config.name , 2);
				}
			}
		}
	}
}