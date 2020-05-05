const express = require('express')
const amqp = require('amqplib/callback_api');
const app = express()

var messages = []

app.get('/hello', function (req, res) {
  res.json({"messages": messages})
})
app.listen(5000)

amqp.connect('amqp://rabbitmq', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'Hello';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] App2 Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            console.log(" [x] App2 received a message %s", msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});
