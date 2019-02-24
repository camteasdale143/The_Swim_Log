const db = require('../models/index');

const middlewareOBJ = {};

middlewareOBJ.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = middlewareOBJ;
