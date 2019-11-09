const Chat = require('../../../models/Chat.js');
const logger = require('../../../logger/index.js');

module.exports = (socket) => async function({ title, users }, callback) => {
  try {
    let chat = await new Chat({ title, users }).save();
    users.forEach((user) => {
      let { socketId } = await User.findOne({_id: user});
      socket.broadcast.to(socketId).emit('chat:new', chat);
    });
    callback({
      status: 201,
      message: "New chat created"
    });
  } catch (error) {
    logger.logError('Controller | chat.create', error);
    callback({
      status: 500,
      message: "Internal Server Error"
    });
  }
}
