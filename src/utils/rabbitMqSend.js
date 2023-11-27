import amqplib from 'amqplib';

export const sendMessage = async (queueName, msg) => {
    try {
        const connection = await amqplib.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false });

        const messageString = JSON.stringify(msg);
        await channel.sendToQueue(queueName, Buffer.from(messageString));

        console.log('sent: ', messageString);

        // Wait for a moment to ensure the message is sent
        await new Promise(resolve => setTimeout(resolve, 100));

        await connection.close();
    } catch (err) {
        console.error(err);
        throw new Error(`Error for creating sendMessaging: ${err.message}`);
    }
}
