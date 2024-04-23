const express = require("express");
const ApiErrorCode = require("../../../core/errors/apiError") 

const membershipTypeController = require("../controller/membership-type")
router = express.Router();

const {
  membershipType,
  membershipTypeValidation,
} = require("../model/membership-type");

router.get("/", membershipTypeController.getAllmembershipType);

router.get("/:id",membershipTypeController.getmembershipById)

router.post("/", membershipTypeController.createNewMembership);

router.patch("/:id", membershipTypeController.updateMembership );

router.delete("/:id", membershipTypeController.deleteMembership );

module.exports = router;
