const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message_ctrl');
const authCtrl = require('../controllers/authenticationCtrl');

router.post('/create',authCtrl.authenticateUser,messageCtrl.createMessage);
router.post('/send',authCtrl.authenticateUser,messageCtrl.sendMessage);

module.exports = router;