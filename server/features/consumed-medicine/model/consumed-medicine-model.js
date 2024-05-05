const mongoose=require("mongoose")
const joi = require("joi")
const { Schema } = mongoose;

const ConsumedMedicineSchema = mongoose.Schema({
    hourseId: {
        type: Schema.Types.ObjectId,
        ref: "Hourse",
        required: true,
    
    },
    medicineId: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: false,
    },
    medicineName: {
        type: String,
        required: true,
    },
    discription:{
        type : String || null,
        required: false,
        default : null
    },
  
    price: {
        type : Number,
        required: true,
    },

    dosage : {
        type : Number,
        required: true,
    },

})

const ConsumedMedicine = mongoose.model("ConsumedMedicine",ConsumedMedicineSchema)

function consumedMedicineValidation(obj){
    const schema = joi.object({
        hourseId : joi.string().required().min(3),
        medicineId : joi.string().min(3),
        medicineName: joi.string().required().min(3),
        discription : joi.string().required().min(4),
        price : joi.number().required(),
        dosage : joi.number().required(),
    })
    return schema.validate(obj);
}

function updateConsumedMedicineValidation(obj){
    const schema = joi.object({
        hourseId : joi.string().min(3),
        medicineId : joi.string().min(3),
        medicineName: joi.string().min(3),
        discription : joi.string().min(4),
        price : joi.number(),
        dosage : joi.number(),
    })
    return schema.validate(obj);
}




module.exports = {
    ConsumedMedicine,
    consumedMedicineValidation,
    updateConsumedMedicineValidation
}