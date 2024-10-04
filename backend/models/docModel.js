var mongoose = require("mongoose");
require('dotenv').config();
const DATABASE = process.env.DATABASE

// mongoose.connect("mongodb://127.0.0.1:27017/docify")
// mongoose.connect(`${DATABASE}/docify`)

mongoose.connect(DATABASE)



const docSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content : {
        type : String,
        default : ""
    },
    uploadedBy : String,
    date : {
        type : Date,
        default : Date.now 
    },
    lastUpdate :{
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Document', docSchema);