const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 30,
        minlength:3
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true
    },
    token:{ type : String}

})

const Users = mongoose.model("User", userSchema);




module.exports =Users;
