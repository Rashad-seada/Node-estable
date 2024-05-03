//import token
const express = require("express");
router = express.Router();

const ConsumedMedicineController = require("../controller/consumed-medicine-controller")


/**
 * @desc create New Consumed Medicine
 * @route api/Client
 * @method Post
 * @access private
 */
router.post(
  "/",
  ConsumedMedicineController.createNewConsumedMedicine
);



/**
 * @desc Get Consumed Medicine by id
 * @route api/Client
 * @method Get
 * @access private
 */
router.get(
  "/:id",
  ConsumedMedicineController.getConsumedMedicineById
);



/**
* @desc Get all Consumed Medicine
* @route api/Client/
* @method Get
* @access private
*/
router.get(
  "/",
  ConsumedMedicineController.getAllConsumedMedicine
);



/**
 * @desc Update Consumed Medicine
 * @route api/client/:id
 * @method patch
 * @access private
 */
router.patch(
  "/:id",
  ConsumedMedicineController.updateConsumedMedicineById
);



/**
 * @desc Delete Consumed Medicine
 * @route api/client/:id
 * @method delete
 * @access private
 */
router.delete(
  "/:id",
  ConsumedMedicineController.deleteConsumedMedicineById
);






module.exports = router;
