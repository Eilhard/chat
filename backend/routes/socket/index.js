const message = require('../../controllers/socket/message');
const user = require('../../controllers/socket/user');

module.exports = socket => {
  /* Socket route controllers */
  let { create } = message(socket);
  let { requestAdd, responseAdd, disconnect, deleteContact } = user(socket);

  /* Connection logic */
  user(socket).connect(socket.handshake.query.user);

  socket.on('disconnect', disconnect);
  /* Socket routes */
  socket.on('message:create', create);
  socket.on('user:add:request', requestAdd);
  socket.on('user:add:response', responseAdd);
  socket.on('user:delete:contact', deleteContact);
}
