const mongoose = require("mongoose");
const joi = require("joi");

const packageSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  clientName:{
    type:String ,
    required:true,
  },
  category: {
    type: String,
    required: true,
  },
  lessons: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum:["expired","unexpired"],
    required: true,
  }
  
});

const Package = mongoose.model("Package", packageSchema);

function createNewPackage(obj) {
  const schema = joi.object({
    clientName:joi.string().required(),
    category:joi.string().required(),
    lessons:joi.number().required(),
    startDate:joi.string().required(),
    endDate:joi.string().required(),
    status:joi.string().required().valid("expired","unexpired"),
    clientId:joi.string().required()
  })
  return schema.validate(obj);
}

function updatePackage(obj) {
  const schema = joi.object({
    clientName:joi.string().required(),
    category:joi.string().required(),
    lessons:joi.number().required(),
    startDate:joi.string().required(),
    endDate:joi.string().required(),
    status:joi.string().required().valid("expired","unexpired"),
    clientId:joi.string().required()

  });
  return schema.validate(obj);
}

module.exports = {
    Package,
  createNewPackage,
  updatePackage,
};
