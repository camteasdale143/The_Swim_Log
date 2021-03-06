//DEPENDENCIES
var mongoose = require("mongoose")

//MONGOOSE CONNECTION
//mongoose.connect("mongodb://yelpcamp:colt@ds113835.mlab.com:13835/yelp_camp_cameron_teasdale");
//mongoose.connect("mongodb://camteasdale:waper143@ds147408-a0.mlab.com:47408,ds147408-a1.mlab.com:47408/yelp_camp_cameron_teasdale?replicaSet=rs-ds147408")
mongoose.connect("mongodb://localHost/swimLogs")

//MOONGOOSE PROMISE CONFIG
mongoose.promise = Promise;

//EXPORT MODELS AS DB
module.exports.Log = require("./swim-log");
module.exports.User = require("./user");
module.exports.Team = require("./team");