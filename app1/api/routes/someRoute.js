const express = require('express');

const router = express.Router();

const someController = require('../controllers/someController');

module.exports = () => {
  const controller = someController();

  router.route('/').get(controller.get);

  return router;
};
