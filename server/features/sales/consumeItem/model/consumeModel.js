const mongoose = require  ('mongoose');
const joi = require("joi")
const { Schema } = mongoose;

const consumeSchema = new Schema({
  consumedItemName: {
    type: String,
    required: true,
  },
  clientId: {
    type: null || String,
    required: true,
    value:null
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
  },
  type:{
    
  }
}, { timestamps: true });

const Consume = mongoose.model('Consume', consumeSchema);
function creatconsumValidation(obj){
    const schema =joi.object({
      consumedItemName:joi.string().required(),
      clientId:joi.string().required(),
      consumedQuantity : joi.string().required(),
      consumedPrice :joi.string().required() ,
      consumedPayment : joi.string().required(),
    })
    return schema.validate(obj)
}
module.exports ={
    Consume,
    creatconsumValidation
}