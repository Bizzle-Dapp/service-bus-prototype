// send

const { ServiceBusClient } = require("@azure/service-bus");
const connectionString = process.env.CONNECTION_STRING;
const queueName = process.env.TOPIC_NAME;

async function queuePoll(messages) {
	const sbClient = new ServiceBusClient(connectionString);
	const sender = sbClient.createSender(queueName);
	try {
		let batch = await sender.createMessageBatch();
		for (let i = 0; i < messages.length; i++) {
			const message = {
				body: JSON.stringify(messages[i])
			};
			if (!batch.tryAddMessage(message)) {
				await sender.sendMessages(batch);
				batch = await sender.createMessageBatch();
				if (!batch.tryAddMessage(message)) {
					throw new Error("Message too big to fit in a batch");
				}
			}
		}
		await sender.sendMessages(batch);
		console.log(`Sent a batch of ${messages.length} messages to the queue: ${queueName}`);
		await sender.close();
	} catch (e) {
		console.log(e);
	} finally {
		await sbClient.close();
	}
}

async function main(messages) {
	await queuePoll(messages);
}

module.exports = main;