const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
  date: {
    type: Number,
    default: Date.now
  },
  firstname: {
    type: String,
    default: "Unknown"
  },
  lastname: {
    type: String,
    default: "Wanderer"
  },
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [
    {
      user: {
        ref: 'user',
        type: Schema.Types.ObjectId,
      },
      chat: {
        ref: 'chat',
        type: Schema.Types.ObjectId,
      },
    }
  ],
  rooms: [
    {
      ref: 'room',
      type: Schema.Types.ObjectId,
    }
  ],
  refreshToken: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema);
