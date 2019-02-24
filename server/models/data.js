const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  created: { type: Date, default: Date.now(), required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
