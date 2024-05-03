const express = require("express")
router = express.Router()
const {packageController}=require("../controller/package-coltroller")




router.get("/",packageController.getAllpackages)
router.get("/:id",packageController.getPackageById)

router.post("/",packageController.createNawPackage)
router.patch("/:id",packageController.updatePackage)
router.delete("/:id",packageController.deletePackage)
module.exports = router