const mongoose= require ('mongoose');
const joi = require("joi")
const { Schema } = mongoose;

const inventorySchema = new Schema({
  itemName: {
    type: String,
    required: [true, "Please provide unique item Name"],
    unique: [true, "item Name Exist"],
    min: 2,
    max: 100,
  },
  quantity: {
    type: Number,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  measure: {
    type: String,
    required: true
  },
  date:{
    type:String,
    required:true
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);


function createInventoryItemValidation(obj){
    const schema =joi.object({
      itemName:joi.string().required(),
        quantity:joi.string().required(),
        type : joi.string().required(),
        price :joi.number().required() ,
        itemDescription : joi.string().required(),
        measure : joi.string().required(),
        date:joi.string().required()
    })
    return schema.validate(obj)
}
module.exports ={
    Inventory
,
createInventoryItemValidation
}