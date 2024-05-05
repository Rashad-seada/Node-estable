
const mongoose = require("mongoose")
const joi = require("joi")

const membershipSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "Client",
        required: true,
      },
membershipType:{
    type:String,
    require:true
},
startDate:{
    type:String,
    require:true
},
endDate:{type:String,
    require:true},
status:{
    type:String,
    enum :["active","inactive"] ,
    require:true
}
})

const InvMembership = mongoose.model("Membership",membershipSchema)


function createNewInvMembership(obj){
    const schema = joi.object({
        clientId:joi.string().required(),
        membershipType:joi.string().required().min(1).max(40),
        startDate:joi.string().required().min(1).max(40),
        endDate:joi.string().required().min(1).max(40),
        status:joi.string().required().valid("active","inactive").min(1).max(40)

    })
    return schema.validate(obj)
}

function updateInvMembership(obj){
    const schema = joi.object({
        clientId:joi.string().required().min(1).max(40),
        membershipType:joi.string().required().min(1).max(40),
        startDate:joi.string().required().min(1).max(40),
        endDate:joi.string().required().min(1).max(40),
        status:joi.string().required().valid("active","inactive").min(1).max(40)

    })
    return schema.validate(obj)
}

module.exports={
    InvMembership,
    createNewInvMembership,
    updateInvMembership
}