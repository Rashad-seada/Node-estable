

const express = require ("express")
const caveteriaController = require ("../controller/caveteria-controller")
router = express.Router()


router.get("/" ,caveteriaController.getAllMenueItem)
router.post("/",caveteriaController.createNewMenueItem)
module.exports = router