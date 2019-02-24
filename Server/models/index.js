// DEPENDENCIES
const mongoose = require('mongoose');

// MONGOOSE CONNECTION
// mongoose.connect("mongodb://yelpcamp:colt@ds113835.mlab.com:13835/yelp_camp_cameron_teasdale");
// mongoose.connect("mongodb://camteasdale:waper143@ds147408-a0.mlab.com:47408,ds147408-a1.mlab.com:47408/yelp_camp_cameron_teasdale?replicaSet=rs-ds147408")
mongoose.connect('mongodb://localHost/swimLogs').then(() => console.log('connected to database'));

// MOONGOOSE PROMISE CONFIG
mongoose.promise = Promise;

// EXPORT MODELS AS DB
module.exports.Data = require('./data');
module.exports.User = require('./user');
module.exports.Team = require('./team');
