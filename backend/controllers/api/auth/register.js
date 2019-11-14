const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config.js');

module.exports = async function (req, res) {
  let user, email, login;
  email = await User.findOne({email: req.body.email});
  login = await User.findOne({login: req.body.login});
  if (email || login) {
    res.status(409).send("User already exist");
    return
  }
  let password;
  if (req.body.password) {
    let validPassword = /.{6,}/
    if (!validPassword.test(req.body.password)) {
      res.status(400).send("Your password should contain at least 6 characters");
      return
    }
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(req.body.password, salt);
  }

  /* Create new user */
  try {
    user = await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      login: req.body.login,
      email: req.body.email,
      password: password
    }).save();

    global._io.emit('stats:new:node', { id: user._id, firstname: user.firstname });
    res.status(201).send(`New user created`);
  } catch (error) {
    logger.logError('Controller | auth.register', error);
    res.status(500).send("Can't create new user. Try again later.");
  }
}
