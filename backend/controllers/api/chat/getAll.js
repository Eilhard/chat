const User = require('../../../models/User.js');
const Chat = require('../../../models/Chat.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let user = await User.findOne({_id: req.user.id});
    let chatArray = user.contacts.map(contact => contact.chat.id);
    let chat = await Chat.aggregate()
      .match({ _id: { $in: chatArray }});
    res.status(200).send(chat);
  } catch (error) {
    logger.logError( 'Controller | chat.getById', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}
