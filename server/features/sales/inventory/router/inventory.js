
const express = require ("express")
const {InventoryController} = require ("../controller/inventory-controller")
 router = express.Router()


router.get("/" ,InventoryController.getAllInventoryItem)
router.get("/:id",InventoryController.getInventoryItemById)
router.post("/",InventoryController.createNewInventoryItem)
router.patch("/:id",InventoryController.updateInventoryItem)
router.delete("/:id",InventoryController.deleteInventoryItem)


module.exports= router