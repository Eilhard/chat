const User = require('../../../models/User.js');
const Chat = require('../../../models/Chat.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let users = await User.aggregate()
      .project({ firstname: true, "contacts.user": true });
    res.status(200).send(users);
  } catch (error) {
    logger.logError( 'Controller | stats.getAll', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}
