const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const user = require('./user.js');
const guard = require('../../middleware/guard');

router.use('/api/auth', auth);

router.use(guard.jwt);
router.use('/api/user', user);

module.exports = router;
