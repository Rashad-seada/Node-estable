
const express = require ("express")
const {InvConsunController} = require ("../controller/invConsum-controller")

router = express.Router()


router.get("/" ,InvConsunController.getAllInventoryItem)
router.get("/:id",InvConsunController.getInventoryItemById)
router.post("/",InventoryController.createNewInventoryItem)
router.patch("/:id",InvConsunController.updateInventoryItem)
router.delete("/:id",InvConsunController.deleteInventoryItem)


module.exports= router