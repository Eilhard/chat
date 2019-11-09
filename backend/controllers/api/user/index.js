const getById = require('./getById.js');
const search = require('./search.js');
const update = require('./update.js');
const del = require('./delete.js');

module.exports = {
  getById,
  search,
  update,
  delete: del
}
