const mongoose = require("mongoose");
const joi = require("joi");

const familyMembershipSchema = mongoose.Schema({
  famillyName: {
    type: String,
    required: true,
  },
  members: {
    type: String,
    require: true,
  },
  membershipTtpe: {
    type: String,
    require: true,
    enum:["family"]
  },
  endDate: {
    type: String,
    require: true,
  },
  startDate: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    require: true,
  },
});

const familyMembership = mongoose.model(
  "familyMembership",
  familyMembershipSchema
);

function createNewfamilyMembership(obj) {
  const schema = joi.object({
    famillyName: joi.string().required(),
    members: joi.string().required(),
    membershipTtpe: joi.string().required().valid("family"),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    status: joi.string().required().valid("active", "inactive"),
  });
  return schema.validate(obj);
}

function updatefamilyMembership(obj) {
  const schema = joi.object({
    famillyName: joi.string().required(),
    members: joi.string().required(),
    membershipTtpe: joi.string().required().valid("family"),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    status: joi.string().required().valid("active", "inactive"),
  });
  return schema.validate(obj);
}

module.exports = {
  familyMembership,
  createNewfamilyMembership,
  updatefamilyMembership,
};
