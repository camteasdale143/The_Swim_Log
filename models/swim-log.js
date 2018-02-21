var mongoose = require("mongoose")

var logSchema = new mongoose.Schema({
    date: Date,
    created:{type:Date, default: Date.now()},
    food: String,
    sleepHour: String,
    wakeHour: String,
    water: Number,
    practice: String,
    comments: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

logSchema.index({ comments: 'text', practice: 'text', food: 'text'});

var Log = mongoose.model('Log', logSchema);
module.exports = Log;