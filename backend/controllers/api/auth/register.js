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
  /* Fix for nesting problem like handling undefined.isMaster */
  let access = { isMaster: false, level: 0 };
  if (req.body.access) {
    if (req.body.access.isMaster) access.isMaster = req.body.access.isMaster;
    if (req.body.access.level) access.level = req.body.access.level;
  }
  /* Check for admin key when create new admin. */
  if (access.isMaster && (req.body.masterKey != config.masterKey) ) {
    res.status(401).send("Your master key is wrong");
    return
  }
  /* Create new user */
  try {
    user = await new User({
      name: {
        firstname: req.body.name.firstname,
        lastname: req.body.name.lastname,
      },
      login: req.body.login,
      email: req.body.email,
      password: password,
      access: { isMaster: access.isMaster, level: access.level }
    }).save();
    res.status(201).send(`New user created`);
  } catch (error) {
    logger.logError('Controller | auth.register', error);
    res.status(500).send("Can't create new user. Try again later.");
  }
}
