const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  addressee: {
    ref: 'user',
    type: Schema.Types.ObjectId,
  },
  author: {
    ref: 'user',
    type: Schema.Types.ObjectId,
  },
  text: String,
  date: { type: Number, default: Date.now }
});

const chatSchema = new Schema({
  date: { type: Number, default: Date.now },
  messages: [messageSchema],
  users: [
    {
      ref: 'user',
      type: Schema.Types.ObjectId,
    }
  ]
});

module.exports = mongoose.model('chat', chatSchema);
