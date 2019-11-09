const express = require('express');
const router = express.Router();
const guard = require('../../middleware/guard');
/* Api route controllers */
const user = require('../../controllers/api/user');


router.get('/search', guard.jwt, user.search);
router.get('/:id', guard.jwt, user.getById);

/* Routes for use only with your own account  */
router.patch('/:id', guard.user, user.update);
router.delete('/:id', guard.user, user.delete);

module.exports = router;
