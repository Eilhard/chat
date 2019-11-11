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
  let newMessage = {
    addressee: message.addressee,
    author: message.author,
    text: message.text,
  }
  try {
    let addressee = await User.findOne({_id: message.addressee});
    let chat = await Chat.findOneAndUpdate(
      {_id: message.chat},
      {$push: { messages: newMessage }},
      {new: true}
    );
    if (!message.isPersonal) {

    }
    if (addressee.socketId) socket.to(addressee.socketId).emit('message:create:notify', message);

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
