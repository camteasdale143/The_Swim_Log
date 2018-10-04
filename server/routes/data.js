// DEPENDENCIES
const express = require('express');
const middleware = require('../middleware/index');

const router = express.Router();

const {
  getDataIndex, createNewIndex, returnSpecificData, deleteData,
} = require('../helpers/data');

router.get('/', getDataIndex);

// CREATE NEW DATUM
router.post('/', createNewIndex);

// SHOW SPECIFIC DATUM
router.get('/:id', returnSpecificData);

// UPDATE A GIVEN DATUM DOSEN"T WORKD RN
router.put('/', async (req, res) => {
  const updatedDatapoint = await db.Log.findByIdAndUpdate(req.body.id, req.body.data);
  res.status(200).json({
    data: updatedDatapoint,
  });
});

// DELETE LOG
router.delete('/', deleteData);

// EXPORT ROUTES
module.exports = router;
