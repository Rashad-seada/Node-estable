
const express = require ("express")
const {consumeController} = require ("../controller/consume-controller")
router = express.Router()


router.get("/",consumeController.getAllConsume)
router.get("/:id",consumeController.getConsumeById)

router.post("/",consumeController.createNewConsume)
router.patch("/:id",consumeController.updateConsume)
router.delete("/:id",consumeController.deleteConsume)
module.exports = router