import amqplib from 'amqplib';

export const receivedMessage = async (queueName) => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });
        console.log(`Waiting messages in queue: ${queueName}`);

        return new Promise((resolve, reject) => {
            const messages = [];

            channel.consume(queueName, (msg) => {
                const messageObject = JSON.parse(msg.content.toString());
                messages.push(messageObject);
                setTimeout(() => {
                    console.log("Done processing message");
                    channel.ack(msg);
                }, 1000);
            }, { noAck: false });

            // Wait for a certain amount of time or some condition before resolving the promise
            setTimeout(() => {
                resolve(messages);
            }, 5000); // Adjust the timeout as needed
        });
    } catch (err) {
        console.error(err);
        throw new Error(`Error for creating sendMessaging: ${err.message}`);
    }
};
