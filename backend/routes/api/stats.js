const express = require('express');
const router = express.Router();
const guard = require('../../middleware/guard');
/* Api route controllers */
const stats = require('../../controllers/api/stats');

router.get('', guard.jwt, stats.getAll);

module.exports = router;
