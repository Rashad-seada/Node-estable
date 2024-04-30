
const express = require ("express")
const {InvConsumeController} = require ("../controller/invConsum-controller")

router = express.Router()


router.get("/" ,InvConsumeController.getAllinvConsumeItem)
router.get("/:id",InvConsumeController.getinvConsumetemById)
router.post("/",InvConsumeController.createNewinvConsumeItem)
router.patch("/:id",InvConsumeController.updateinvConsumeItem)
router.delete("/:id",InvConsumeController.deleteinvConsumeItem)


module.exports= router