const mongoose =require("mongoose")
const joi = require("joi")

const genderSchema = mongoose.Schema({
    displayName:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
})
const Gender = mongoose.model("Gender",genderSchema)

function genderValidation(obj){
    const schema =joi.object({
        displayName : joi.string().min(5).max(30).required(),
        value : joi.string().min(5).max(30).required()
    })
    return schema.validate(obj)
}

module.exports = {
    Gender,
    genderValidation
}