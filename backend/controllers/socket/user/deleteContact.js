const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');
/* addressee: id,
   author: id (User who create request)
*/

module.exports = (socket) => async function(request) {
  try {
    let addressee = await User.findOneAndUpdate(
      {_id: request.addressee},
      {$pull: { contacts: { user: request.author } }},
      {new: true}
    );
    let author = await User.findOneAndUpdate(
      {_id: request.author},
      {$pull: { contacts: { user: request.addressee } }},
      {new: true}
    );
    socket.to(addressee.socketId).emit('user:delete:contact:notify', request);
  } catch (error) {
    logger.logError('Controller | user.requestAdd', error);
  }
}
