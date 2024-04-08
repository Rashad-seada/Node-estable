const mongoose=require("mongoose")
const joi = require("joi")
const ClientSchema = mongoose.Schema({
    userName:{},
    email:{},
    phone:{},
    gender:{},
    age:{},
})

const Client = mongoose.model("Client",ClientSchema)

function clientValidation(obj){
    const schema =joi.object({
        userName:joi.string().required().min(7).max(20),
        email:joi.string().required().min(7).max(20),
        phone:joi.string().required().min(4).max(20),
        gender:joi.string().required(),
        age:joi.string().required().min(1).max(2),
    })


}


module.exports = {
    Client,
    clientValidation
}