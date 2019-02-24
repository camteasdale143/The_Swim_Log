const express = require('express');

const router = express.Router();
const axios = require('axios');
const db = require('../models/index');

/* eslint arrow-parens: "off" */

router.get('/', async (req, res) => {
  async function createUser(person) {
    const { first, last } = person.name;
    const { password, username } = person.login;
    const { email } = person;
    console.log(`email: ${email} , password: ${password}`);
    const { date } = person.dob;
    const user = {
      firstName: first,
      lastName: last,
      username,
      password,
      email,
      birthday: date,
    };
    return db.User.create(user);
  }

  async function createUserSet(results) {
    const usersList = [];
    for (const person of results) {
      usersList.push(await createUser(person));
    }
    return usersList;
  }
  // salt users
  await db.User.remove({});
  const request = await axios({
    method: 'get',
    url: 'https://randomuser.me/api/?results=1&seed=a',
    responseType: 'json',
  });
  const users = await createUserSet(request.data.results);
  await db.Data.remove({});
  const data = [];
  users.forEach(user => {
    const datum = {
      date: Date.now(),
      type: 'WORD',
      value: 'TEST value',
      title: 'TEST DATUM',
      author: user._id,
    };
    data.push(datum);
  });

  await db.Data.insertMany(data);

  res.status(200).json({
    users,
    data,
  });
});

module.exports = router;
