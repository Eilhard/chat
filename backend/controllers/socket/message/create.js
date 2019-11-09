const Chat = require('../../../models/Chat.js');
const Room = require('../../../models/Room.js');
const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

/*
  fields for routing:
    isPersonal: Boolean,
    room: id, (required only for rooms)
    chat: id,
  messageSchema:
    addressee: id,
    author: id,
    text: String
 */

module.exports = (socket) => async function(message, callback) {
  try {
    let user = await User.findOne({_id: message.login});
    let chat = await Chat.findOneAndUpdate(
    {_id: message.chat},
    {$push: { messages: message }},
    {new: true}
    );
    socket.broadcast.emit('message:new', message);
    callback({
      status: 201,
      message: message
    });
  } catch (error) {
    logger.logError('Controller | message.create', error);
    callback({
      status: 500,
      message: "Internal Server Error"
    });
  }
}
