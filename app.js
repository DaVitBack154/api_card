const express = require('express');
const app = express();
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/connect');
require('dotenv').config();

connectDB();
const path = require('path');
app.use(
  cors({
    origin: '*',
  })
);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

readdirSync('./routes').map((e) => {
  return app.use(require('./routes/' + e));
});

const port = 5120;
app.listen(port, () => {
  console.log('Api run on Port', port);
});
