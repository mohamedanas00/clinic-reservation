import amqplib from 'amqplib'


export const sendMessage =async (queueName,msg)=>{
    try{
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName,{durable:false});
        const messageString = JSON.stringify(msg);
        channel.sendToQueue(queueName,Buffer.from(messageString));
        console.log('sent: ',messageString);
        setTimeout(()=>{
            connection.close();
        },500)
    
    }catch(err){
        new ErrorClass(`Error for creating sendMessaging`, StatusCodes.BAD_REQUEST)
    }
}

