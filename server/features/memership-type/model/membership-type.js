

const mongoose =require("mongoose")
const joi = require("joi")

const membershipTypeSchema = mongoose.Schema({
    displayName:{
        type:String,
        required:true
    }
})
const membershipType = mongoose.model("membershipType",membershipTypeSchema)

function membershipTypeValidation(obj){
    const schema =joi.object({
        displayName : joi.string().min(5).max(20).required()
    })
    return schema.validate(obj)
}

module.exports ={
    membershipType,
    membershipTypeValidation
}