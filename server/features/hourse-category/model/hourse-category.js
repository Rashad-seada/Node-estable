const mongoose =require("mongoose")
const joi = require("joi")

const hourseCategorySchema = mongoose.Schema({
    displayName:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
})
const HourseCategory = mongoose.model("HourseCategory",hourseCategorySchema)

function hourseCategoryValidation(obj){
    const schema =joi.object({
        displayName : joi.string().min(5).max(30).required(),
        value : joi.string().min(5).max(30).required()
    })
    return schema.validate(obj)
}

module.exports = {
    HourseCategory,
    hourseCategoryValidation
}