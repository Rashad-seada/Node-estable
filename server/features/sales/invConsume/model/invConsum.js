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
  }
}, { timestamps: true });

const invConsume = mongoose.model('invConsume', invConsumeSchema);

module.exports ={
    invConsume
}