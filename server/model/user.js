const mongoose=require("mongoose")
const joi = require("joi")

const userSchema =new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
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
   token:{
    type:[String]
   }
})

function validateRegisterUser(obj){

    const schema =joi.object({
        name:joi.string().min(2).max(20).required(),
        email:joi.string().min(10).required(),
        password:joi.string().min(2).required(),
    })
    return schema.validate(obj)
}

function validationLoginUser(obj){
    const schema= joi.object({
       email:joi.string().trim().min(5).max(100).required(),
       password:joi.string().min(6).required(),
    })
    return schema.validate(obj);
};


const User = mongoose.model("user",userSchema)


module.exports = {
    User,
    validateRegisterUser,
    validationLoginUser
}
