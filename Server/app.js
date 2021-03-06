//DEPENDENCIES
var express         =   require("express");
var app             =   express();
var bodyParser      =   require("body-parser");
var methodOverride  =   require("method-override")
var passport        =   require("passport");
var localStrategy   =   require("passport-local");
var mongoose        =   require("mongoose")
var db              =   require("./models/index");
const errorHandler  =   require('./helpers/error');


//ROUTES
var logRoutes       =   require("./routes/logs")
var authRoutes      =   require("./routes/auth")
var coachRoutes     =   require("./routes/coach")
var teamRoutes      =   require("./routes/team")
var accountRoutes   =   require("./routes/account")

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))


//PASSPORT CONFIG
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

// GLOBAL VARIABLES
app.use(function(req,res,next){
     res.locals.currentUser = req.user;
     next();
})


//HOME RENDER
app.get("/", (req,res) => {
  res.status(200).json({
    requestType: 'HomePage',
  })
})

//ROUTES
app.use(authRoutes);
app.use("/logs", logRoutes);
app.use("/team", teamRoutes);
app.use(coachRoutes);
app.use("/account", accountRoutes);

//UNFOUND ROUTE
app.use(function(req, res, next){
  let err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler)


//RUN SERVER
app.listen(8081 , () => {
  console.log("server started")
})
