const express = require("express")
const {familyMembershipController}= require ("../controller/familyMembership")

router = express.Router()

router.route("/")
.get(familyMembershipController.getAllfamilyMembership)
.post(familyMembershipController.createNewfamilyMembership)

router.route("/:id")
.get(familyMembershipController.getfamilyMembershipById)
.patch(familyMembershipController.updatefamilyMembership)
.delete(familyMembershipController.deletefamilyMembership)

module.exports = router