// DEPENDENCIES
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models/index');

router.post('/signin', async (req, res, next) => {
  try {
    console.log(req.body.email);
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const {
      _id, username, firstName, lastName, email, birthday,
    } = user;
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          _id,
          username,
          firstName,
          lastName,
          email,
          birthday,
        },
        process.env.SECRET_KEY,
      );
      return res.status(200).json({
        _id,
        username,
        firstName,
        lastName,
        email,
        birthday,
        token,
      });
    }
    return next({
      status: 400,
      message: 'Invalid Email/Password',
    });
  } catch (err) {
    console.log(err);
    return next({
      status: 400,
      message: 'Invalid Email/Password',
    });
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      username, password, firstName, lastName, email, birthday,
    } = req.body;
    console.log(`${username}, ${password}, ${firstName}, ${lastName}, ${email}, ${birthday}`);
    if (!username || !password || !firstName || !lastName || !email || !birthday) {
      return res.json({
        fail: 'input all specified data',
      });
    }
    req.body.birthday = Date.now();
    const user = await db.User.create(req.body);
    const { id } = user;

    const token = jwt.sign(
      {
        id,
        username,
        firstName,
        lastName,
        email,
        birthday,
      },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({
      id,
      username,
      password,
      firstName,
      lastName,
      email,
      birthday,
      token,
    });
    // create user
    // create jsonwebtoken
    // process.env.SECRET_KEY
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry that username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
    // what kind of error
    // if it as certain kind of error response can be taken (username/password is taken)
    // else send back 400 err
  }
});

// LOGIN USER

// LOGOUT USER

// API CHECK IF USERNAME IS TAKEN (on login)
async function getUser(username) {
  return await db.User.findOne({ username });
}
async function returnUsernameAvailability(res, username) {
  return (await getUser(username)) === null;
}
router.get('/api/usernameTaken/:username', async (req, res, next) => {
  try {
    res.status(200).json({
      requestType: 'check usernam availability',
      usernameAvailable: await returnUsernameAvailability(res, req.params.username),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
