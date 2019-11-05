const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    await User.remove({_id: req.params.id});
    res.status(200).send({ id: req.params.id, message: "User was successfully deleted" });
  } catch (error) {
    logger.logError('Controller | user.delete', error);
    res.status(500).send("Can't create character. Try again later.");
  }
}
