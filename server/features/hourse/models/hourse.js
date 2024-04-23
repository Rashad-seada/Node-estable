const mongoose = require("mongoose");
const joi = require("joi");

const hourseSchema = mongoose.Schema({
  hourseName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  catigoryId: {
    type: [String],
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  groom: {
    type: String,
    required: false,
    default: null // Set default value as null to allow it to be nullable
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'], // Define your enum values here
  },
  note: {
    type: String,
    required: false,
    default : ""
  },
  documents: {
    type: [String],
    required: false,
    default : []
  },
});
const Hourse = mongoose.model("Hourse", hourseSchema);
function pageValidation(obj){
  const schema = joi.object({
      page_number : joi.number().required().min(1),
  })
  return schema.validate(obj);
}

function createHourseValidation(obj){
    const schema = joi.object({
        hourseName : joi.string().required().min(1).max(100),
        age : joi.number().required().min(0).max(100),
        catigoryId : joi.string().required().min(1).max(100),
        clientId: joi.string().required().min(1).max(100),
        groom: joi.string().min(1).max(100).allow(null),
        gender : joi.string().valid('male', 'female').required(),
        note: joi.string().min(1).max(100),
        documents: joi.string().min(1).max(100),
    })
    return schema.validate(obj);

}

module.exports = {
  Hourse,
  pageValidation,
  createHourseValidation
}
