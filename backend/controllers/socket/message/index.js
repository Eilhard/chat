const create = require('./create.js');

module.exports = function (socket) {
  return { create: create(socket) }
}
