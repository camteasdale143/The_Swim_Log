const db = require('../models/index');
const middleware = require('../middleware/index');

exports.getLogIndex = function (req, res) {
  if (!req.user.coach) {
    const dateSort = { date: -1 };
    db.Log.find({ author: { id: req.user._id, username: req.user.username } })
      .sort(dateSort)
      .limit(15)
      .then((allLogs) => {
        res.render('logs/index', { logs: allLogs, page: 'log' });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    db.User.find({ team: { id: req.user.team.id }, coach: false })
      .then((foundSwimmers) => {
        res.render('logs/coach-player-index', { swimmers: foundSwimmers, page: 'log' });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
};
module.exports = exports;
