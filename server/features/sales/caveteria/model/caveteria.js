
const mongoose = require("mongoose")

const caveteriaSchema = mongoose.Schema({
    menueItem:{
        type:String
    },
    quantity:{
        type:String
    },
    type:{
        type:String
    },
    price:{
        type:Number
    },
    date:{
        type:Date
    },
    itemName:{
        type:String
    },
    payment:{},
    client:{
        type:String
    },
})

const caveteria = mongoose.Schema("caveteria",caveteriaSchema)


module.exports ={
    caveteria
}