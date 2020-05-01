// const { loadCharacters } = require('../helpers/charactersHelpers'
const send = require('../../send');

function someController() {
  async function get(req, res) {
    send('Hello', 'Hello World!');
  }

  return { get };
}

module.exports = someController;
