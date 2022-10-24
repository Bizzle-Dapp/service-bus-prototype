const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");


async function main(subName) {
     const connectionString = process.env.CONNECTION_STRING;
     const topicName = process.env.TOPIC_NAME;
     const subscriptionName = subName;
	const sbClient = new ServiceBusClient(connectionString);

	const receiver = sbClient.createReceiver(topicName, subscriptionName);

	const myMessageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
	};

	const myErrorHandler = async (error) => {
		console.log(error);
	};

	receiver.subscribe({
		processMessage: myMessageHandler,
		processError: myErrorHandler
	});

	await delay(15000);
    console.log("Closing connection... Please establish another 15 second connection.")
    // Restart connection here.
    // ----
    // Or close
	await receiver.close();	
	await sbClient.close();
}

module.exports = main;