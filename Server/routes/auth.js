//DEPENDENCIES
var express=require("express");
var router=express.Router();
var passport= require("passport");
var db = require("../models/index");

//SHOW REGISTER PAGE
router.get("/register", (req, res) => {
    res.status(200).json({
      requestType: "get register page"
    })
});

//CREATE NEW USER
router.post("/register", (req, res) => {
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
    .catch((err) => {
        res.send(err.message)
    })

})

// SHOW LOGIN PAGE
router.get("/login", (req, res) => {
  res.status(200).json({
    requestType: "get login page"
  })
});

// LOGIN USER
router.post("/login", passport.authenticate("local", {
     successRedirect: "/logs",
     failureRedirect: "/login"
}))

// LOGOUT USER
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

// API CHECK IF USERNAME IS TAKEN (on login)
router.get("/api/usernameTaken/:username", async (req, res, next) => {
  try {
    res.status(200).json({
      requestType: 'check usernam availability',
      usernameAvailable: await returnUsernameAvailability(res, req.params.username)
    })
  } catch (err) {
    next(err);
  }

})

async function returnUsernameAvailability(res, username) {
  return (await getUser(username) === null)
}


async function getUser(username) {
  return await db.User.findOne({username});
}

module.exports = router;
