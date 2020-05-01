const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const someRoute = require('./api/routes/someRoute')();

app.use(cors());
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

app.use('/api/someRoute', someRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app1 listening at http://localhost:${port}`);
});

module.exports = app;
