const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date: Date,
  created: {
    type: Date,
    default: Date.now(),
  },
  type: String,
  value: String,
  author: {
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    username: String,
  },
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
