const db = require('../models/index');

module.exports.getDataIndex = async (req, res) => {
  res.status(200).json({
    data: await db.Data.find({}),
  });
};
module.exports.createNewIndex = async (req, res) => {
  const { type, value, username } = req.body;
  const newDataPoint = {
    date: Date.now(),
    type,
    value,
    author: {
      username,
    },
  };

  res.status(200).json({
    data: await db.Data.create(newDataPoint),
  });
};
module.exports.returnSpecificData = async (req, res) => {
  const foundDataPoint = await db.Data.findById(req.params.id);
  res.status(200).json({
    data: foundDataPoint,
  });
};
module.exports.deleteData = async (req, res) => {
  const deletedData = await db.Data.findByIdAndRemove(req.body.id);
  res.status(200).json({
    deleted: deletedData,
  });
};
