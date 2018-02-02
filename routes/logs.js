var express=require("express");
var router=express.Router();
var db = require("../models/index");
var middleware = require("../middleware/index")


router.get("/", middleware.isLoggedIn, (req,res) => {
  if (!req.user.coach){
    var dateSort = { date: -1 };
    console.log(req.user._id)
    console.log(req.user.username)
    db.Log.find({author: {id: req.user._id, username: req.user.username}}).sort(dateSort)
    .then((allLogs) => {
      res.render("index", {logs: allLogs})
    })
  }
  else {
    res.render("index")
  }
})

router.post("/", middleware.isLoggedIn, (req, res) => {
    var newLog = {
        date: req.body.date,
        food: req.body.food,
        sleepHour: req.body.sleepHour,
        wakeHour: req.body.wakeHour,
        water: req.body.water,
        practice: req.body.practice,
        comments: req.body.comments,
        author: {id: req.user._id, username: req.user.username}
    }
    
    db.Log.create(newLog)
    .then((log) => {
        res.redirect("/logs");
    })
})


router.get("/new", middleware.isLoggedIn, (req,res) => {
    res.render("new")
})

router.get("/:id", middleware.isLoggedIn, (req,res) => {
  db.Log.findById(req.params.id)
  .then((foundLog) => {
    res.render("show", {log: foundLog})
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
  
})

router.get("/:id/edit", middleware.isLoggedIn, (req,res) => {
  db.Log.findById(req.params.id)
  .then((foundLog) => {
    res.render("edit", {log: foundLog})
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
})

router.put("/:id", middleware.isLoggedIn, (req, res) => {
  db.Log.findByIdAndUpdate(req.params.id, req.body.log)
  .then((updatedLog) => {
    res.redirect("/logs/" + req.params.id);
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
})

router.delete("/:id", middleware.isLoggedIn, (req, res) => {
  db.Log.findByIdAndRemove(req.params.id)
  .then(() => {
    res.redirect("/logs")
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
})


module.exports = router;