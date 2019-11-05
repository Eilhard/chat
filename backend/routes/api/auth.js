const express = require('express');
const router = express.Router();
const guard = require('../../middleware/guard');
/* Api route controllers */
const auth = require('../../controllers/api/auth');

router.get('', (req, res) => { res.send("Hello auth") });

router.post('/register', auth.register);
router.post('/login', auth.login);

router.post('/refresh', guard.jwt, auth.refresh);

module.exports = router;
