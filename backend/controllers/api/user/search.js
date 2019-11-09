const User = require('../../../models/User.js');
const logger = require('../../../logger/index.js');

module.exports = async function (req, res) {
  try {
    let searchStr = req.query.search;
    if (!searchStr) {
      res.status(200).send([]);
      return;
    }
    let regexp = new RegExp('^' + searchStr + '.*', 'i');

    /* Exclude requestor and his contacts from results. */
    let requestor = await User.findOne({ _id: req.user.id})
    let requestorContacts = [];
    requestor.contacts.forEach(contact => {
      requestorContacts.push(contact.user);
    });

    let users = await User.aggregate()
      .project({fullname: {$concat: ['$firstname', ' ', '$lastname']}})
      .match({ fullname: regexp, _id: { $nin: [ requestor._id, ...requestorContacts ] }});
    res.status(200).send(users);
  } catch (error) {
    logger.logError( 'Controller | user.search', error);
    res.status(500).send("Can't get data. Try again later.");
  }
}
