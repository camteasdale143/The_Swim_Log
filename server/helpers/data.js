const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = require('../models/index');

/* eslint no-underscore-dangle: "off" */

async function decodeToken(token) {
  return jwt.decode(token.split(' ')[1]);
}

module.exports.getDataIndex = async (req, res) => {
  try {
    const tokenData = await decodeToken(req.headers.authorization);
    const data = await db.Data.find({ author: mongoose.Types.ObjectId(tokenData._id) });
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getDataByTitle = async (req, res) => {
  try {
    const tokenData = await decodeToken(req.headers.authorization);
    const { title, start, lim } = req.body;
    const dateSort = { date: -1 };
    const data = await db.Data.find({ author: mongoose.Types.ObjectId(tokenData._id), title })
      .sort(dateSort)
      .skip(Number(start))
      .limit(Number(lim));

    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.getDataByDate = async (req, res) => {
  try {
    const tokenData = await decodeToken(req.headers.authorization);
    const { date, start, lim } = req.body;
    const data = await db.Data.find({ author: mongoose.Types.ObjectId(tokenData._id), date })
      .skip(Number(start))
      .limit(Number(lim));
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.createNewDatum = async (req, res) => {
  try {
    const { type, value, title, date } = req.body;
    const tokenData = jwt.decode(req.headers.authorization.split(' ')[1]);
    const newDataPoint = {
      date,
      type,
      value,
      title,
      author: tokenData._id,
    };
    res.status(200).json({
      data: await db.Data.create(newDataPoint),
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.updateDatum = async (req, res) => {
  try {
    const { type, value, title, date, _id } = req.body;
    const tokenData = jwt.decode(req.headers.authorization.split(' ')[1]);
    const deletedData = await db.Data.findByIdAndRemove(_id);
    const newDataPoint = {
      _id,
      date,
      type,
      value,
      title,
      author: tokenData._id,
    };
    res.status(200).json({
      data: await db.Data.create(newDataPoint),
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getDatum = async (req, res) => {
  const foundDataPoint = await db.Data.findById(req.params.id);
  res.status(200).json({
    data: foundDataPoint,
  });
};
module.exports.deleteDatum = async (req, res) => {
  try {
    const deletedData = await db.Data.findByIdAndRemove(req.body._id);
    res.status(200).json({
      deleted: deletedData,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
