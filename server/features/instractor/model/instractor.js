const joi = require("joi")
const mongoose = require("mongoose")

const instractorSchema = mongoose.Schema({

    instractorName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    } ,
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    photo:{
        type:[String],
        required:true,
        default : []
    }
})

const instractor = mongoose.model("instractor",instractorSchema)


module.exports ={
    instractor
}