const mongoose=require("mongoose")
const joi = require("joi")
const jwt = require("jsonwebtoken")

const userSchema =new mongoose.Schema({
   
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   isAdmin:{
    type:Boolean,
    default:false
   },
   token :  { 
    type: [String],
     default: []
    },

})


function validationLoginUser(obj){
    const schema= joi.object({
       email:joi.string().trim().min(5).max(100).required(),
       password:joi.string().min(6).required(),
    })
    return schema.validate(obj);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({
        id : this._id ,
        isAdmin: this.isAdmin,
        randomNumber : Math.random()},
        process.env.JWT_SECRET_KEY 
    )
}

const User = mongoose.model("user",userSchema)


module.exports = {
    User,
    validationLoginUser
}
