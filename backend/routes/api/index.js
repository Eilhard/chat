const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const chat = require('./chat.js');
const stats = require('./stats.js');
const user = require('./user.js');
const guard = require('../../middleware/guard');

router.use('/api/auth', auth);
router.use('/api/chat', chat);
router.use('/api/stats', stats);
router.use('/api/user', user);

module.exports = router;
