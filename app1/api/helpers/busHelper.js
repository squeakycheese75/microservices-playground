const amqp = require('amqplib/callback_api');

async function sendMessage(queue, msg) {
  amqp.connect('amqp://rabbitmq', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      var exchange = 'Hello';
      channel.assertExchange(exchange, 'fanout', {
        durable: false
      });

      channel.publish(exchange, '', Buffer.from(msg));
      // eslint-disable-next-line no-console
      console.log(' [x] App1 sent %s', msg);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
}

module.exports = sendMessage;
