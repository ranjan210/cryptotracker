const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    username :{
        type : "String",
        required : true , 
        trim : true,
        unique : true
    },
    preferences : [{
        coin : String,
        upper : Number,
        lower : Number
    }]
})

module.exports = mongoose.model("preference",userDataSchema);