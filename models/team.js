var mongoose = require("mongoose")

var teamSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        }
    ],
    admin: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            }
})

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;