const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userSchema = new Schema({
    username:String,  
	},{
        required: true,
        minlength:3,
        unique:true,
        timestamps:true,
    },
)

const User = mongoose.model("User", userSchema);

module.exports = User;
