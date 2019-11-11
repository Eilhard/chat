const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  let updated = {};

  if (req.body.firstname) updated.firstname = req.body.firstname;
  if (req.body.lastname) updated.lastname = req.body.lastname;
  if (req.body.contacts) updated.contacts = req.body.contacts;

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
