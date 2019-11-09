const connect = require('./connect.js');
const disconnect = require('./disconnect.js');
const requestAdd = require('./requestAdd.js');
const responseAdd = require('./responseAdd.js');
const deleteContact = require('./deleteContact.js');

module.exports = function (socket) {
  return {
    connect: connect(socket),
    disconnect: disconnect(socket),
    requestAdd: requestAdd(socket),
    responseAdd: responseAdd(socket),
    deleteContact: deleteContact(socket)
  }
}
