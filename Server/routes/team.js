// DEPENDENCIES
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const db = require('../models/index');
const middleware = require('../middleware/index');

// SHOW NEW TEAM
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('team/newTeam', { page: 'team' });
});

// CREATE NEW TEAM
router.post('/new', middleware.isLoggedIn, (req, res) => {
  const newTeam = {
    name: req.body.teamName,
    password: getTeamPassword(),
    members: [{ id: req.user._id }],
    admin: { id: req.user._id },
  };
  db.Team.create(newTeam)
    .then((createdTeam) => {
      db.User.findByIdAndUpdate(req.user._id, { $set: { team: { id: createdTeam._id } } })
        .then((updatedUser) => {
          res.redirect('/team');
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// CREATE RANDOM KEY FOR TEAM ACCESS
// DUPLICATES ARE POSSIBLE!!!
function getTeamPassword() {
  let password = '';
  for (let i = 0; i < 5; i++) {
    var random = Math.floor(Math.random() * 74 + 48);
    while ((random > 57 && random < 65) || (random > 90 && random < 97)) {
      var random = Math.floor(Math.random() * 75 + 47);
    }
    password += String.fromCharCode(random);
  }

  return password;
}

// SHOW TEAM MEMBERS OF A USER
router.get('/', middleware.isLoggedIn, (req, res) => {
  if (req.user.team.id) {
    db.Team.findById(req.user.team.id)
      .then((foundTeam) => {
        if (foundTeam) {
          const memberList = [];
          foundTeam.members.forEach((member) => {
            db.User.findById(member.id)
              .then((member) => {
                memberList.push(member);
                if (memberList.length == foundTeam.members.length) {
                  res.render('team/team', { team: foundTeam, members: memberList });
                }
              })
              .catch((err) => {
                res.send(err.message);
              });
          });
        } else {
          res.redirect('back');
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    res.redirect('/team/join');
  }
});

// SHOW JOIN TEAM PAGE
router.get('/join', middleware.isLoggedIn, (req, res) => {
  res.render('team/noTeam', { page: 'team' });
});

// USER JOIN TEAM
router.post('/join', middleware.isLoggedIn, (req, res) => {
  db.Team.findOne({ password: req.body.teamPassword })
    .then((foundTeam) => {
      let copy = false;
      foundTeam.members.forEach((member) => {
        if (member.id.equals(req.user._id)) {
          copy = true;
        }
      });
      if (copy) {
        res.send('you are already part of this team');
      } else {
        db.User.findByIdAndUpdate(req.user._id, { $set: { team: { id: foundTeam._id } } })
          .then((self) => {
            const newSwimmer = { id: req.user._id };
            foundTeam.members.push(newSwimmer);
            foundTeam.save();
            res.redirect('/team');
          })
          .catch((err) => {
            res.send(err.message);
          });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// EXPORT ROUTER
module.exports = router;
