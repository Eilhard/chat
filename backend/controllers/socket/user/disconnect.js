const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = (socket) => async function(connectedUser) {
  try {
    let user = await User.findOneAndUpdate(
    {socketId: socket.id},
    {$set: { socketId: '' }},
    {new: true}
    );
  } catch (error) {
    logger.logError('Controller | user.disconnect', error);
  }
}
