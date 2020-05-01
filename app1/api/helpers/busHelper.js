const amqp = require('amqplib/callback_api');

async function sendMessage(queue, msg) {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      // eslint-disable-next-line no-console
      console.log(' [x] Sent %s', msg);
    });
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
}

module.exports = sendMessage;
