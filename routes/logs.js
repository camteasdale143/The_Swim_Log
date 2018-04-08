//DEPENDENCIES
var express     =   require("express");
var router      =   express.Router();
var db          =   require("../models/index");
var middleware  =   require("../middleware/index")



//SHOW LOGS INDEX
// if coach - show swimmer index
router.get("/", middleware.isLoggedIn, (req,res) => {
  if (!req.user.coach){
    var dateSort = { date: -1 };
    db.Log.find({author: {id: req.user._id, username: req.user.username}}).sort(dateSort).limit(15)
    .then((allLogs) => {
      res.render("logs/index", {logs: allLogs, page:"log"})
    })
    .catch((err) => {
        res.send(err.message)
    })
  }
  else {
    db.User.find({team: {id: req.user.team.id}, coach: false})
    .then((foundSwimmers) => {
      res.render("logs/coach-player-index", {swimmers: foundSwimmers, page:"log"})
    })
    .catch((err) => {
        res.send(err.message)
    })
  }
})

// API LAZY LOAD LOGS BASED ON DATE
router.get("/api/lazyLoadIndex/:i", (req, res) => {
  var dateSort = { date: -1 };
  db.Log.find({author: {id: req.user._id, username: req.user.username}}).sort(dateSort).skip(15 + req.params.i*3).limit(3)
    .then((allLogs) => {
      res.send(allLogs);
    })
    .catch((err) => {
        res.send(err.message)
    })
})

//SHOW LOG SEARCH
router.get("/search", middleware.isLoggedIn, (req,res) => {
    res.render("logs/searchLogs", {page:"log"})
})

// API SEARCH FOR USER LOGS
router.get("/api/searchLogs/:query", (req, res) => {
  var dateSort = { date: -1 };
  db.Log.find({author: {id: req.user._id, username: req.user.username}, $or: [{$text: {$search: req.params.query,}}, ]}).sort(dateSort).limit(15)
    .then((allLogs) => {
      res.send(allLogs);
    })
    .catch((err) => {
        res.send(err.message)
    })
})

//SHOW NEW LOG
router.get("/new", middleware.isLoggedIn, (req,res) => {
    res.render("logs/new", {page:"log"})
})

// CREATE NEW LOG
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
    .catch((err) => {
        res.send(err.message)
    })
})



//SHOW SPECIFIC LOG
router.get("/:id", middleware.isLoggedIn, (req,res) => {
  db.Log.findById(req.params.id)
  .then((foundLog) => {
    res.render("logs/show", {log: foundLog})
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
  
})

//SHOW UPDATE LOG PAGE 
router.get("/:id/edit", middleware.isLoggedIn, (req,res) => {
  db.Log.findById(req.params.id)
  .then((foundLog) => {
    res.render("logs/edit", {log: foundLog})
  })
  .catch((err) => {
    console.log(err.message);
    res.redirect("back")
  })
})

//UPDATE LOG
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

//DELETE LOG
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


//EXPORT ROUTES
module.exports = router;