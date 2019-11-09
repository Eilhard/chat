const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  let updated = {};
  if (req.body.name) {
    updated.name = {};
    if (req.body.name.firstname) updated.name.firstname = req.body.name.firstname;
    if (req.body.name.lastname) updated.name.lastname = req.body.name.lastname;
  }
  try {
    let user = await User.findOneAndUpdate(
    {_id: req.user.id},
    {$set: updated},
    {new: true}
    );
    res.status(200).send(user);
  } catch (error) {
    logger.logError('Controller | user.update', error);
    res.status(500).send("Can't update data. Try again later.");
  }
}
