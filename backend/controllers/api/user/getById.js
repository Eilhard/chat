const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let user = await User.findOne({_id: req.params.id});
    if (req.user.id != req.params.id) {
      user = {
        firstname: user.firstname,
        lastname: user.lastname
      };
    }
    res.status(200).send(user);
  } catch (error) {
    logger.logError( 'Controller | user.getById', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}
