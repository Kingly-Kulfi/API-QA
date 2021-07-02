const express = require('express');
const router = require('./routes.js');
const app = express();

const port = 3000;

app.use(express.json());

app.use('/qa', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})