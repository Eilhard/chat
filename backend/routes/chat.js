const express = require('express');
const router = express.Router();


router.get('', (req, res) => {
  res.send("Hello chat");
});
router.get('/chat', (req, res) => {
  res.send("Hello chat");
});

module.exports = router;
