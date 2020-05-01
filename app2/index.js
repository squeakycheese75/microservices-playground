const express = require('express')
const amqp = require('amqplib/callback_api');
const app = express()


var messages = []

app.get('/hello', function (req, res) {
  res.json({"messages": messages})
})
app.listen(5000)

amqp.connect('amqp://rabbitmq', function (error0, connection) {
  if (error0) {
    throw  error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'Hello';

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      function (msg) {
        console.log(' [x] Received %s', msg.content.toString());
        messages.push(JSON.parse(msg.content.toString()));
      },
      {
        noAck: true,
      }
    );
  });
});


