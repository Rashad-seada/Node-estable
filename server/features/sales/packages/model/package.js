const mongoose = require("mongoose");
const joi = require("joi");


const packageSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: true,
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
    category:joi.string().required().min(1).max(20),
    lessons:joi.number().required().min(1).max(20),
    startDate:joi.string().required().min(1).max(20),
    endDate:joi.string().required().min(1).max(20),
    status:joi.string().required().valid("expired","unexpired").min(1).max(20),
    clientId:joi.string().required()
  })
  return schema.validate(obj);
}

function updatePackage(obj) {
  const schema = joi.object({
    category:joi.string().required().min(1).max(20),
    lessons:joi.number().required().min(1).max(20),
    startDate:joi.string().required().min(1).max(20),
    endDate:joi.string().required().min(1).max(20),
    status:joi.string().required().valid("expired","unexpired").min(1).max(20),
    clientId:joi.string().required()

  });
  return schema.validate(obj);
}

module.exports = {
    Package,
  createNewPackage,
  updatePackage,
};
