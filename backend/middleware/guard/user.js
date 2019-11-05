const jwt = require('jsonwebtoken');
const config = require('../../config.js');
const logger = require('../../logger/index.js');

module.exports = (req, res, next) => {
  try {
    /* Expected Bearer token */
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, config.jwt.accessKey);
    /* Save token fields to request obj for future purposes */
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.logError('Middleware | guard.user', error);
    res.status(401).send("You should be account owner to make this request");
  }
}
