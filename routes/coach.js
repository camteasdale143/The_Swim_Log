var express=require("express");
var router=express.Router();
var db = require("../models/index");
var mongoose = require("mongoose");
var middleware = require("../middleware/index")

router.get("/addCoach", middleware.isLoggedIn, (req, res) => {
    res.render("addCoach")
})

router.post("/addCoach", middleware.isLoggedIn, (req, res) => {
    db.User.findOne({username:req.body.username})
    .then((foundCoach) => {
        if (foundCoach.coach){
            var copy = false;
            foundCoach.swimmers.forEach(function(swimmer){
                console.log(swimmer.id + " - " + req.user._id)
                if (swimmer.id.equals(req.user._id)){
                    copy = true;
                }
            })
            
            if (copy) {
                res.send("you are one of this coaches swimmers")
            }
            else {
                db.User.findById(req.user._id)
                .then((self) => {
                    var newSwimmer = {id:req.user._id, username:req.user.username, firstName:req.user.firstName, lastName:req.user.lastName}
                    var newCoach = {id:foundCoach._id, username:foundCoach.username, firstName:foundCoach.firstName, lastName:foundCoach.lastName}
                    foundCoach.swimmers.push(newSwimmer);
                    foundCoach.save();
                    self.swimmers.push(newCoach);
                    self.save();
                    res.redirect("/logs");
                })
                
            }
        }
        else {
            res.redirect("/addCoach")
        }
    })
    .catch((err) => {
        console.log(err.message);
        res.redirect("back")
    })
})

router.get("/swimmer/:id/:username/logs", middleware.isLoggedIn, (req, res) => {
    var id = mongoose.Types.ObjectId(req.params.id);
    var name = req.params.username
    var dateSort = { date: -1 };
    db.Log.find({author: {id: id, username: name}}).sort(dateSort)
    .then((logs) => {
        db.User.findById(id)
        .then((swimmer) => {
            res.render("coachIndex", {logs: logs, swimmer:swimmer});
        })
    })
    .catch((err) => {
        console.log(err.message);
        res.redirect("back")
    })
})

module.exports = router;