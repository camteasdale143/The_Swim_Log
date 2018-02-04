var mongoose = require("mongoose")

mongoose.connect("mongodb://yelpcamp:colt@ds113835.mlab.com:13835/yelp_camp_cameron_teasdale");
//mongoose.connect("mongodb://localHost/swimLogs")

mongoose.promise = Promise;

module.exports.Log = require("./swim-log");
module.exports.User = require("./user");
module.exports.Team = require("./team");