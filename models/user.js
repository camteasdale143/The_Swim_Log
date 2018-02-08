var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    verified: {type: Boolean, default: false},
    age: Number,
    coach: {type: Boolean, default: false},
    swimmers: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            firstName: String,
            lastName: String,
            username: String
        }
    ],
    team: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Team"
        },
    },

})


userSchema.index({username: "text", username: 1});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);

module.exports = User;