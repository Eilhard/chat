const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = (socket) => async function(connectedUser) {
  try {
    connectedUser = JSON.parse(connectedUser);
    let updated = {};
    updated.socketId = socket.id;
    let user = await User.findOneAndUpdate(
    {_id: connectedUser.id},
    {$set: updated},
    {new: true}
    );
  } catch (error) {
    logger.logError('Controller | user.connect', error);
  }
}
