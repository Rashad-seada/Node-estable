const mongoose=require("mongoose")
const joi = require("joi")

<<<<<<< HEAD
const jwt = require("jsonwebtoken")

=======
>>>>>>> 047b95af1fa590270960e07597850f2917edcb84
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


<<<<<<< HEAD
=======
    const schema =joi.object({
        name:joi.string().min(2).max(20).required(),
        email:joi.string().min(10).required(),
        password:joi.string().min(2).required(),
    })
    return schema.validate(obj)
}
>>>>>>> 047b95af1fa590270960e07597850f2917edcb84

function validationLoginUser(obj){
    const schema= joi.object({
       email:joi.string().trim().min(5).max(100).required(),
       password:joi.string().min(6).required(),
    })
    return schema.validate(obj);
};

     
     
userSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id , isAdmin: this.isAdmin,randomNumber : Math.random()},process.env.JWT_SECRET_KEY ,{expiresIn:"100d"})

     
 }

const User = mongoose.model("user",userSchema)


module.exports = {
    User,
    generateToken,
    validationLoginUser
}
