const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const roomSchema = new Schema({
  date: {
    type: Number,
    default: Date.now
  },
  title: {
    type: String,
    default: "Untitled room"
  },
  chat: {
    ref: 'chat',
    type: Schema.Types.ObjectId,
  },
  users: [
    {
      ref: 'user',
      type: Schema.Types.ObjectId,
    }
  ]
});

module.exports = mongoose.model('room', roomSchema);
