const message = require('../../controllers/socket/message');

module.exports = socket => {
  /* Socket route controllers */
  let { create } = message(socket);

  /* Socket routes */
  socket.on('message:create', create);
}
