const express = require('express');
const router = express.Router();
const guard = require('../../middleware/guard');
/* Api route controllers */
const user = require('../../controllers/api/user');

router.get('', (req, res) => { res.send("Hello user") });
router.get('/search', user.search);

/* Routes for use only with your own account  */
router.get('/:id', guard.user, user.getById);
router.patch('/:id', guard.user, user.getById);
router.delete('/:id', guard.user, user.getById);

module.exports = router;
