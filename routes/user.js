const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user_ctrl');
const authCtrl = require('../controllers/authenticationCtrl');

router.post('/signup',userCtrl.signupCtrl);
router.post('/login',userCtrl.loginCtrl);

router.get('/fetch',userCtrl.fetchUsers);

router.post('/messages/send',authCtrl.authenticateUser,userCtrl.allMessagesSendByUser);
router.post('/messages/received',authCtrl.authenticateUser,userCtrl.allMessagesReceivedByUser);

module.exports = router;