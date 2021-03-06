const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
  date: {
    type: Number,
    default: Date.now
  },
  socketId: String,
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
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactRequests: [
    {
      addressee:  String,
      author: String
    }
  ],
  contacts: [
    {
      user: {
        ref: 'user',
        type: Schema.Types.ObjectId,
      },
      chat: {
        id: {
          ref: 'chat',
          type: Schema.Types.ObjectId,
        },
        lastReaded: {
          type: Number,
          default: 0
        }
      },
    }
  ],
  rooms: [
    {
      id: {
        ref: 'room',
        type: Schema.Types.ObjectId,
      },
      lastReaded: {
        type: Number,
        default: 0
      }
    }
  ],
  refreshToken: String
});

module.exports = mongoose.model('user', userSchema);
