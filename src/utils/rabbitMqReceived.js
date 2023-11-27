import amqplib from 'amqplib';

export const receivedMessage = async (queueName) => {
    try {
        const connection = await amqplib.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });
        console.log(`Waiting for messages in queue: ${queueName}`);

        return new Promise((resolve, reject) => {
            const messages = [];

            channel.consume(queueName, (msg) => {
                const messageObject = JSON.parse(msg.content.toString());
                messages.push(messageObject);

                // Acknowledge the message after processing
                channel.ack(msg);

                console.log("Done processing message");
            }, { noAck: false });

            // Set a longer timeout to wait for messages
            setTimeout(() => {
                // Close the channel and connection
                channel.close();
                connection.close();

                // Resolve the promise with the collected messages
                resolve(messages);
            }, 5000); // Adjust the timeout as needed
        });
    } catch (err) {
        console.error(err);
        throw new Error(`Error for received Messages: ${err.message}`);
    }
};
