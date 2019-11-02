const User = require('../../../models/User.js');

module.exports = async function (user) {
  return new Promise(resolve => (
    setTimeout(() => resolve("Hello ADD User"), 3000)
  ));
}
