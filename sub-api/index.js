const express = require('express')
const app = express()
const port = 3002

var dotenv = require('dotenv');
dotenv.config()

var cors = require('cors');
app.use(cors());

const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

app.get('/', (req, res, next) => {
    res.send("Running...")
})

app.listen(port, () => {
    console.log(`Subscription API listening on port ${port}`)
    subscriptionController();
})

// ---------- Service Bus Stuff

async function subscriptionController() {
    console.log("Starting Subscription Controller.")
    const connectionString = process.env.CONNECTION_STRING;
    const topicName = process.env.TOPIC_NAME;
    const subscriptionName = process.env.SUBSCRIPTION_NAME;
    const sbClient = new ServiceBusClient(connectionString);
    const receiver = sbClient.createReceiver(topicName, subscriptionName);
    try{
       await subscribe(receiver);
    } catch(e) {
        console.log("Something went wrong:", e);
        await closure(sbClient, receiver);
    }
}


async function subscribe(receiver) {
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
}

async function closure(sbClient, receiver){
    console.log("Closing connection... Please establish another connection.")
    // Restart connection here.
    // ----
    // Or close
    await receiver.close();
    await sbClient.close();
}
