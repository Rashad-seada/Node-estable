const mongoose =require("mongoose")
const joi = require("joi")

const membershipStatusSchema = mongoose.Schema({
    displayName:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
})
const MembershipStatus = mongoose.model("MembershipStatus",membershipStatusSchema)

function membershipStatusValidation(obj){
    const schema =joi.object({
        displayName : joi.string().min(5).max(30).required(),
        value : joi.string().min(5).max(30).required()
    })
    return schema.validate(obj)
}

module.exports = {
    MembershipStatus,
    membershipStatusValidation
}