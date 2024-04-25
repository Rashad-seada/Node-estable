
const mongoose = require("mongoose")
const joi = require("joi")
const caveteriaSchema = mongoose.Schema({
    menuItemName:{
        type:String,
        required:false
    },
    quantity:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    },
    date:{
        type:Date,
        required:false
    },

})

const caveteria = mongoose.model("caveteria",caveteriaSchema)

function createMenueItemValidation(obj){
    const schema =joi.object({
        menuItemName:joi.string().required(),
        quantity:joi.string().required(),
        type : joi.string().required(),
        price :joi.number().required() ,
        date : joi.date().required(),
    })
    return schema.validate(obj)
}
module.exports ={
    caveteria,
    createMenueItemValidation
}