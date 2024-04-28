

const express = require ("express")
const caveteriaController = require ("../controller/caveteria-controller")
router = express.Router()


router.get("/" ,caveteriaController.getAllMenueItem)
router.get("/:id",caveteriaController.getMenuItemById)
router.post("/",caveteriaController.createNewMenueItem)
router.patch("/:id",caveteriaController.updateMenuItem)
router.delete("/:id",caveteriaController.deleteMenuItem)
module.exports = router