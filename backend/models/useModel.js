var mongoose = require("mongoose");
require('dotenv').config();
const DATABASE = process.env.DATABASE


// mongoose.connect("mongodb://127.0.0.1:27017/docify")
// mongoose.connect( `${DATABASE}/docify`)

mongoose.connect(DATABASE)

const userschema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : String,
    username : String,
    isBlocked : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("User", userschema);
