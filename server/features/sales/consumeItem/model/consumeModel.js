const mongoose = require  ('mongoose');
const joi = require("joi")
const { Schema } = mongoose;

const consumeSchema = new Schema({
  consumedItemName: {
    type: String,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
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
    enum:["pending","paid"]
  },
  type:{
    type:String,
    required:true
  },
date:{

 type:String,
    required:true
}
}, { timestamps: true });

const Consume = mongoose.model('Consume', consumeSchema);
function creatconsumValidation(obj){
    const schema =joi.object({
      consumedItemName:joi.string().required(),
      clientId:joi.string().required(),
      consumedQuantity : joi.number().required(),
      consumedPrice :joi.string().required() ,
      consumedPayment : joi.string().required().valid("pending","paid"),
      type :joi.string().required() ,
 date :joi.string().required() ,


    })
    return schema.validate(obj)
}
module.exports ={
    Consume,
    creatconsumValidation
}