var express=require("express");
var router=express.Router();
var db = require("../models/index");
var mongoose = require("mongoose");
var middleware = require("../middleware/index")

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("newTeam");
})

router.post("/new", middleware.isLoggedIn, (req, res) => {
    var newTeam = {name: req.body.teamName, password: getTeamPassword(), members: [{id: req.user._id}], admin: {id: req.user._id}};
    db.Team.create(newTeam)
    .then((createdTeam) => {
        db.User.findByIdAndUpdate(req.user._id,{$set : {"team":{id: createdTeam._id}}})
        .then((updatedUser) => {
            res.redirect("/team");
        })
    })
    .catch((err) => {
        console.log(err.message);
    })
})

function getTeamPassword() {
  var password = "";
  for (var i = 0; i < 5; i++) {
    var random = Math.floor(Math.random() * 74 + 48)
    while (random > 57 && random < 65 || random > 90 && random < 97){
      var random = Math.floor(Math.random() * 75 + 47)
    }
    password += String.fromCharCode(random)
  }
  return password
}

router.get("/", middleware.isLoggedIn, (req, res) => {
    if (req.user.team.id) {
        db.Team.findById(req.user.team.id)
        .then((foundTeam) => {
            if(foundTeam) {
                var memberList = [];
                foundTeam.members.forEach(function(member){
                    db.User.findById(member.id)
                    .then((member) => {
                        memberList.push(member);
                        console.log(memberList)
                        if(memberList.length == foundTeam.members.length) {
                            res.render("team", {team: foundTeam, members: memberList});
                        }
                    })
                })
            }
            else {
                console.log(foundTeam);
                res.redirect("back")
            }
        })
    }
    else {
        res.redirect("/team/join")
    }
})

router.get("/join", middleware.isLoggedIn, (req, res) => {
    res.render("noTeam");
})

router.post("/join", middleware.isLoggedIn, (req, res) => {
    db.Team.findOne({password: req.body.teamPassword})
    .then((foundTeam) => {
            var copy = false;
            foundTeam.members.forEach(function(member){
                console.log(member.id + " - " + req.user._id)
                if (member.id.equals(req.user._id)){
                    copy = true;
                }
            })
            if (copy) {
                res.send("you are already part of this team")
            }
            else {
                db.User.findByIdAndUpdate(req.user._id,{$set : {"team":{id: foundTeam._id}}})
                .then((self) => {
                    var newSwimmer = {id:req.user._id}
                    foundTeam.members.push(newSwimmer);
                    foundTeam.save();
                    console.log(foundTeam);
                    console.log(self);
                    res.redirect("/team");
                })
            }
    })
    .catch((err) => {
        console.log(err.message);
        res.redirect("back")
    })
})

module.exports = router;