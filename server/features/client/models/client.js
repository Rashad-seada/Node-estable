const mongoose=require("mongoose")
const joi = require("joi")

const ClientSchema = mongoose.Schema({
    username: {
        type : String,
        required:true,
    },
    email: {
        type : String,
        required:true,
    },
    phone:{
        type : String,
        required:true,
    },
    age:{
        type : Number,
        required:true,
    },

    gender:{
        type: String,
        enum: ['male', 'female'], // Define your enum values here
        required: true

    },

    membershipStatus : {
        type: String,
        enum: ['active', 'inactive'], // Define your enum values here
        required: false,
        default : "inactive"
    },

    courses : {
        type : [String],
        required : false,
        default : []
    }
})

const Client = mongoose.model("Client",ClientSchema)

function clientValidation(obj){
    const schema = joi.object({
        username : joi.string().required().min(7).max(20),
        email : joi.string().required().min(7).max(40),
        phone : joi.string().required().min(4).max(25),
        gender : joi.string().valid('male', 'female').required(),
        age: joi.number().required().min(1).max(100),
    })
    return schema.validate(obj);
}

function pageValidation(obj){
    const schema = joi.object({
        page_number : joi.number().required().min(1),
    })
    return schema.validate(obj);
}

function updateValidation(obj){
    const schema = joi.object({
        username : joi.string().min(7).max(20),
        email : joi.string().min(7).max(40),
        phone : joi.string().min(4).max(25),
        age: joi.number().min(1).max(100),
    })
    return schema.validate(obj);
}

function updateMembershipValidation(obj){
    const schema = joi.object({
        membership_status : joi.string().valid('active', 'inactive').required(),
    })
    return schema.validate(obj);
}


module.exports = {
    Client,
    clientValidation,
    pageValidation,
    updateValidation,
    updateMembershipValidation,
}