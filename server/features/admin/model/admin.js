
const mongoose = require("mongoose")

const adminSchema =new mongoose.Schema({
   
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
      required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model("Admin",adminSchema)

module.exports ={ 
    Admin
}