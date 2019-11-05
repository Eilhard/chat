const express = require('express');
const router = express.Router();
/* Api route controllers */
const auth = require('../../controllers/api/auth');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/refresh', auth.refresh);

module.exports = router;
