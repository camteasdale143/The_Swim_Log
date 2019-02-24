const jwt = require('jsonwebtoken');

// make sure the user is logged in - authentication
exports.loginRequired = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        return next({ status: 401, message: 'please log in first' });
      }
      return null;
    });
  } catch (err) {
    return next({ status: 401, message: 'please log in first' });
  }
  return null;
};

// make sure we get the correct user - authorization

exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      }
      return next({ status: 401, message: 'unauthorized' });
    });
  } catch (err) {
    return next({ status: 401, message: 'unauthorized' });
  }
  return null;
};
