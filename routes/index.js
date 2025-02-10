const express = require('express');
const router = express.Router();
const Card_controller = require('../controller/index');
const { auth } = require('../Middleware/auth');

router.post('/login', Card_controller.login);
router.get('/getprofile', auth, Card_controller.getprofile);
router.post('/create_card', Card_controller.CreateCardUser);
router.get('/getcard', Card_controller.GetCardUser);
router.post('/log_login', Card_controller.LogloginUser);

module.exports = router;
