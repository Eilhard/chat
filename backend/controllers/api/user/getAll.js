const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    logger.logError( 'Controller | user.getAll', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}