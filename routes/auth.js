var express=require("express");
var router=express.Router();
var passport= require("passport");
var db = require("../models/index");


router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    console.log(req.body.coach);
    var newUser = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, coach: req.body.coach}
    var userPassword = req.body.password
    db.User.findOne({username: req.body.username})
    .then((foundUsername) => {
        if (!foundUsername){
            db.User.register(newUser, userPassword, (err, user) => {
                if (err) {
                    console.log(err)
                }
                else {
                    passport.authenticate("local")(req, res, function(){
                    res.redirect("/logs");
                    })  
                }
            })
        } else {
            console.log("name taken")
            res.redirect("back");
        }
    })

})
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
     successRedirect: "/logs",
     failureRedirect: "/login"
}))

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

router.get("/api/usernameTaken/:username", (req, res) => {
    db.User.findOne({username: req.params.username})
    .then((foundUser) => {
        if (foundUser) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    })
}) 

module.exports = router;