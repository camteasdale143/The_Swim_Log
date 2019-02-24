// DEPENDENCIES
const express = require('express');
const middleware = require('../middleware/index');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const {
  getDataIndex,
  createNewDatum,
  getDatum,
  deleteDatum,
  getDataByTitle,
  updateDatum,
  getDataByDate,
} = require('../helpers/data');

router.get('/', authMiddleware.loginRequired, getDataIndex);
router.get('/title', authMiddleware.loginRequired, getDataByTitle);
router.get('/log', authMiddleware.loginRequired, getDataByDate);

// CREATE NEW DATUM
router.post('/', authMiddleware.loginRequired, createNewDatum);
router.post('/update', authMiddleware.loginRequired, updateDatum);

// SHOW SPECIFIC DATUM
router.get('/:id', authMiddleware.loginRequired, getDatum);

// UPDATE A GIVEN DATUM DOSEN"T WORKD RN
router.put('/', async (req, res) => {
  const updatedDatapoint = await db.Log.findByIdAndUpdate(req.body.id, req.body.data);
  res.status(200).json({
    data: updatedDatapoint,
  });
});

// DELETE LOG
router.delete('/', authMiddleware.loginRequired, deleteDatum);

// EXPORT ROUTES
module.exports = router;
