const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const chatSchema = new Schema({
  date: {
    type: Number,
    default: Date.now
  },
  title: {
    type: String,
    default: "Untitled room"
  },
  messages: [],
  users: [
    {
      ref: 'user',
      type: Schema.Types.ObjectId,
    }
  ]
});

module.exports = mongoose.model('user', userSchema);
