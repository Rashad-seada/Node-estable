const mongoose = require  ('mongoose');
const joi = require("joi")
const { Schema } = mongoose;

const consumeSchema = new Schema({
  consumedItemName: {
    type: String,
    required: true, 
  },
  clientName: {
    type: String,
    required: true, 
  },
  consumedQuantity: {
    type: Number,
    required: true,
  },
  consumedPrice: {
    type: Number,
    required: true,
  },
  consumedPayment:{
    type: String,
    required: true,
  }
}, { timestamps: true });

const Consume = mongoose.model('Consume', consumeSchema);
function creatconsumValidation(obj){
    const schema =joi.object({
      consumedItemName:joi.string().required(),
      clientName:joi.string().required(),
      consumedQuantity : joi.string().required(),
      consumedPrice :joi.number().required() ,
      consumedPayment : joi.date().required(),
    })
    return schema.validate(obj)
}
module.exports ={
    Consume,
    creatconsumValidation
}