const send = require('../helpers/busHelper');

function someController() {
  async function post(req, res) {
    const msg = req.body;
    const queue = 'Hello';

    send(queue, JSON.stringify(msg));
    const resval = { Status: 'Ok' };
    res.send(JSON.stringify(resval));
  }

  return { post };
}

module.exports = someController;
