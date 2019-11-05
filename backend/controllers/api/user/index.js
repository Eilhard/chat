const getAll = require('./getAll.js');
const getById = require('./getById.js');
const search = require('./search.js');
const update = require('./update.js');
const del = require('./delete.js');

module.exports = {
  getAll,
  getById,
  search,
  update,
  delete: del
}
