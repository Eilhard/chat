const express = require('express');
const router = express.Router();
const chat = require('./chat.js');
const user = require('./user.js');

router.use('/', chat);
router.use('/user', user);

module.exports = router;
