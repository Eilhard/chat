const Chat = require('../../../models/Chat.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let chat = await Chat.findOne({_id: req.params.id});
    res.status(200).send(chat);
  } catch (error) {
    logger.logError( 'Controller | chat.getById', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}
