const mongoose = require("mongoose");

const userSaveAnswer = new mongoose.Schema({
    email : {type: String, required:true},
    answer : {type:String, required:true}
});

const userAnswer = mongoose.model('userAnswer', userSaveAnswer);
module.exports = userAnswer;