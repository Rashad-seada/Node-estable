const express = require("express")
const {invMembershipController}= require ("../controller/invMembership")

router = express.Router()

router.route("/")
.get(invMembershipController.getAllinvMembership)
.post(invMembershipController.createNewinvMembership)

router.route("/:id")
.get(invMembershipController.getinvMembershipById)
.patch(invMembershipController.updateinvMembership)
.delete(invMembershipController.deleteinvMembership)

module.exports = router