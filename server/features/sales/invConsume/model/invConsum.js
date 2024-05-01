const mongoose =require ('mongoose');

const joi = require ("joi")
const { Schema } = mongoose;

const invConsumeSchema = new Schema({
  invConsumedItemName: {
    type: String,
    required: true,
  },
  invConsumedQuantity: {
    type: Number,
    required: true,
  },
  invConsumedPrice: {
    type: Number,
    required: true,
  },
  invConsumedMeasure:{
    type: String,
    required: true,
  },
  date:{
    type:String,
    required:true
  }
}, { timestamps: true });

const invConsume = mongoose.model('invConsume', invConsumeSchema);
function createInvConsumeValidation(obj){
  const schema =joi.object({
    invConsumedItemName:joi.string().required(),
    invConsumedQuantity:joi.number().required(),
    invConsumedPrice : joi.number().required(),
    invConsumedMeasure :joi.string().required(),
    date:joi.string().required()

  })
  return schema.validate(obj)
}
module.exports ={
    invConsume,
    createInvConsumeValidation
}