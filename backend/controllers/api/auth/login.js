const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config.js');

module.exports = async function (req, res) {
  let user = await User.findOne({login: req.body.login});
  if (!user) {
    res.status(400).send("No user with this credentials");
    return
  }
  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    res.status(400).send("No user with this credentials");
    return
  }
  try {
    let accessToken = jwt.sign(
      {
        id: user._id,
        login: user.login,
        isMaster: user.access.isMaster,
        accessLevel: user.access.level
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
      message: "Your tokens successfully created",
      accessToken: accessToken,
      refreshToken: refreshToken
    };
    res.status(201).send(response);
  } catch (error) {
    logger.logError('Controller | auth.login', error);
    res.status(500).send("Can't log in. Try again later.");
  }
}
