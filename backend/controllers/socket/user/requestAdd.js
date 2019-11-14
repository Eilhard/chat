const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');
/* addressee: id,
   author: id (User who create request)
*/

module.exports = (socket) => async function(request) {
  if (!request.addressee || !request.author) {
    socket.emit('server:error', { status: 400, message: "Bad request" })
    return;
  }
  try {
    let newRequest = {
      addressee: request.addressee,
      author: request.author
    };
    /* Check for unic req */
    let addressee = await User.findOne({_id: request.addressee});
    let isNewRequest = true;
    addressee.contactRequests.forEach(item => {
      if (item.author == request.author) isNewRequest = false;
    });
    if (!isNewRequest) {
      socket.emit('server:error', { status: 400, message: "Dublicate request" })
      return;
    }
    /* Add req */
    addressee = await User.findOneAndUpdate(
      {_id: request.addressee},
      {$push: { contactRequests: newRequest }},
      {new: true}
    );
    socket.to(addressee.socketId).emit('user:add:request:notify', newRequest);
  } catch (error) {
    logger.logError('Controller | user.requestAdd', error);
  }
}
