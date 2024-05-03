//import token
const express = require("express");
router = express.Router();

const MedicineController = require("../controller/medicine-controller")


/**
 * @desc create New Medicine
 * @route api/Client
 * @method Post
 * @access private
 */
router.post(
  "/",
  MedicineController.createNewMedicine
);



/**
 * @desc Get Medicine by id
 * @route api/Client
 * @method Get
 * @access private
 */
router.get(
  "/:id",
  MedicineController.getMedicineById
);



/**
* @desc Get all Medicine
* @route api/Client/
* @method Get
* @access private
*/
router.get(
  "/",
  MedicineController.getAllMedicine
);



/**
 * @desc Update Medicine
 * @route api/client/:id
 * @method patch
 * @access private
 */
router.patch(
  "/:id",
  MedicineController.updateMedicineById
);



/**
 * @desc Delete Medicine
 * @route api/client/:id
 * @method delete
 * @access private
 */
router.delete(
  "/:id",
  MedicineController.deleteMedicineById
);



module.exports = router;