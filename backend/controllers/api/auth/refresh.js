const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');
const jwt = require('jsonwebtoken');
const config = require('../../../config.js');

module.exports = async function(req, res) {
  try {
    let token = req.body.refreshToken;
    let user = await User.findOne({refreshToken: token});
    let accessToken = jwt.sign(
      {
        id: user._id,
        login: user.login
      },
      config.jwt.accessKey,
      { expiresIn: config.jwt.accessLive }
    );
    let refreshToken = jwt.sign(
      {
        id: user._id,
        login: user.login,
      },
      config.jwt.refreshKey,
      { expiresIn: config.jwt.refreshLive }
    );
    let result = await User.updateOne(user, { $set: { refreshToken: refreshToken } });
    let response = {
      message: "Your tokens successfully refreshed",
      accessToken: accessToken,
      refreshToken: refreshToken
    };
    res.status(201).send(response);
  } catch (error) {
    logger.logError('Controller | auth.refresh', error);
    res.status(400).send(`Invalid token`);
  }
}
