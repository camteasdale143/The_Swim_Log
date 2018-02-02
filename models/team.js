var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var teamSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            firstName: String,
            lastName: String,
            username: String
            
        }
    ]
})

teamSchema.plugin(passportLocalMongoose);
var Team = mongoose.model('Team', teamSchema);
module.exports = Team;