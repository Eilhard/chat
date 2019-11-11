const express = require('express');
const router = express.Router();
const guard = require('../../middleware/guard');
/* Api route controllers */
const chat = require('../../controllers/api/chat');

router.get('', guard.jwt, chat.getAll);
router.get('/:id', guard.jwt, chat.getById);

module.exports = router;
