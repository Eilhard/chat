const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
  date: {
    type: Number,
    default: Date.now
  },
  name: {
    firstname: {
      type: String,
      default: "Unknown"
    },
    lastname: {
      type: String,
      default: "Wanderer"
    }
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
  friends: [
    {
      friend: {
        ref: 'friends',
        type: Schema.Types.ObjectId,
      },
      messages: []
    }
  ],
  rooms: [
    {
      ref: 'rooms',
      type: Schema.Types.ObjectId,
    }
  ],
  refreshToken: {
    type: String
  }
});

module.exports = mongoose.model('users', userSchema);
