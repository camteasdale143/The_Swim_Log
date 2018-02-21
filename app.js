var express = require("express");
var app = express();
var db = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override")
var passport       = require("passport");
var localStrategy  = require("passport-local");
var mongoose       = require("mongoose")
var flash          = require("connect-flash");


var logRoutes = require("./routes/logs")
var authRoutes = require("./routes/auth")
var coachRoutes = require("./routes/coach")
var teamRoutes = require("./routes/team")
var accountRoutes = require("./routes/account")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
     secret: "I love my dog",
     resave: false,
     saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function(req,res,next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     res.locals.warning = req.flash("warning");
     next();
})

app.locals.moment = require("moment");
app.locals.moment = require("moment-timezone");



app.get("/", (req,res) => {
  res.render("misc/home");
})


app.use(authRoutes);
app.use("/logs", logRoutes);
app.use("/team", teamRoutes);
app.use(coachRoutes);
app.use("/account", accountRoutes);


app.get("*", (req,res) => {
    res.render("misc/notFound")
})



app.listen(process.env.PORT, process.env.IP , () => {
  console.log("server started")
})