const express = require('express');
const route = express.Router();
const Card_controller = require('../controller/index');

route.post('/create_card', Card_controller.CreateCardUser);
route.post('/getcard', Card_controller.GetCardUser);
