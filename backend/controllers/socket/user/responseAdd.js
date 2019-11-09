const User = require('../../../models/User.js');
const Chat = require('../../../models/Chat.js');
const logger = require('../../../logger/index.js');

/* addressee: id, (User who create request)
   author: id,
   status: Boolean */

module.exports = (socket) => async function(response) {
  try {
    if (!response.addressee || !response.author || typeof response.status != 'boolean' ) {
      socket.emit('server:error', { status: 400, message: "Bad request" })
      return;
    }

    /* Delete contact request item. */
    let user = await User.findOneAndUpdate(
      {_id: response.author},
      {$pull: { contactRequests: { author: response.addressee } }},
      {new: true}
    );
    /* If response positive create new chat and add it to db. */
    if (response.status) {
      let chat = await new Chat({ users: [ response.addressee, response.author ]}).save();
      console.log("test", chat);
      let author = await User.findOneAndUpdate(
        {_id: response.author},
        { $push:
          {
            contacts: {
              user: response.addressee,
              chat: { id: chat._id }
            }
          }
        },
        {new: true}
      );
      let addressee = await User.findOneAndUpdate(
        {_id: response.addressee},
        { $push:
          {
            contacts: {
              user: response.author,
              chat: { id: chat._id }
            }
          }
        },
        {new: true}
      );
      response.chat = {
        id: chat._id,
        lastReaded: 0
      };
      socket.to(addressee.socketId).emit('user:add:result', response);
      socket.emit('user:add:result', response);
    } else {
      let addressee = await User.findOne({_id: response.addressee});
      socket.to(addressee.socketId).emit('user:add:result', response);
      socket.emit('user:add:result', response);
    }
  } catch (error) {
    logger.logError('Controller | user.responseAdd', error);
  }
}
