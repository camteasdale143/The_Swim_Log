//DEPENDENCIES
var express     =   require("express");
var router      =   express.Router();
var db          =   require("../models/index");
var mongoose    =   require("mongoose");
var middleware  =   require("../middleware/index")

//SHOW USER ACCOUNT PAGE
router.get("/", middleware.isLoggedIn, (req, res) => {
    if (req.user.team){
        db.Team.findById(req.user.team.id)
        .then((userTeam) => {
            res.render("misc/account", {team: userTeam, page:"account"})
        })
        .catch((err) => {
            res.send(err.message)
        })
    }
    else {
        res.render("account", {team: null})
    }
})

//LEAVE CURRENT TEAM
router.post("/leave", (req, res) => {
    db.Team.findById(req.user.team.id)
    .then((foundTeam) => {
        if (foundTeam) {
            foundTeam.members = foundTeam.members.filter(removeUser);
            foundTeam.save()
            if (req.user.coach) {
                foundTeam.admin = newAdmin(req.user.id, foundTeam)
                foundTeam.save()
            }
            req.user.team = {id: null};
            req.user.save();
            req.flash("success", "Successfully Logged Out");
            res.redirect("/team")
        }
        else {
            res.redirect("back");
        }
        function removeUser(id) {
            if (id.id == req.user.id){
                console.log("same");
            }
            else {
                console.log(id.id + "!=" + req.user.id);
                return id.id;
            }
        }
        function newAdmin(userid, team) {
            if (team.admin.id == userid){
                db.Team.findOne({coach: true})
                .then((foundCoach) => {
                    team.admin = foundCoach
                })
            }
        }
    })
    .catch((err) => {
        res.send(err.message)
    })
})


//EXPORT ROUTES
module.exports = router;