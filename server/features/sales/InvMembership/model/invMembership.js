
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
    enum :["Active","inActive"] ,
    require:true
}
})

const InvMembership = mongoose.model("Membership",membershipSchema)


function createNewInvMembership(obj){
    const schema = joi.object({
        clientId:joi.string().required(),
        membershipType:joi.string().required(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        status:joi.string().required().valid("Active","inActive")

    })
    return schema.validate(obj)
}

function updateInvMembership(obj){
    const schema = joi.object({
        clientId:joi.string().required(),
        membershipType:joi.string().required(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        status:joi.string().required().valid("Active","inActive")

    })
    return schema.validate(obj)
}

module.exports={
    InvMembership,
    createNewInvMembership,
    updateInvMembership
}