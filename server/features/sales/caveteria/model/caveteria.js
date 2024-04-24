
const mongoose = require("mongoose")
const joi = require("joi")
const caveteriaSchema = mongoose.Schema({
    menueItemName:{
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
    itemName:{
        type:String,
        required:false
    },
    payment:{

    },
    client:{
        type:String,
        required:false
    },
})

const caveteria = mongoose.model("caveteria",caveteriaSchema)

function createMenueItemValidation(obj){
    const schema =joi.object({
        menueItemName:joi.string().required(),
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