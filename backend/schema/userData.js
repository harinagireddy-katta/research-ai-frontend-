const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    email : {type: String, required:true},
    data : {type:String, required:true}
});

const userData = mongoose.model('userData', userDataSchema);
module.exports = userData;