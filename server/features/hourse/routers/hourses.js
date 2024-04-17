//const hourseController = require("../controller/horses-controller")
const { Error } = require("mongoose");
const {
  Hourse,
  createHourseValidation,
  pageValidation,
} = require("../models/house");

const HourseController =require("../controller/horses-controller")
const express = require("express");

router = express.Router();

//>>>>>>>>>>>>>>>>>>>> Start Code Here <<<<<<<<<<<<<<<<<<<<<<<<

/**

 * @desc create New Hourse

 * @route api/hourse

 * @method Post

 * @access public

 */
router.post("/", HourseController.createNewHourse

);

/**
 * @desc Get All Hourse
 * @route api/hourse
 * @method Get
 * @access public
 */
router.get("/",HourseController.getAllHourses );

/**

 * @desc Get Hourse By id

 * @route api/hourse/:id

* @method Get

* @access public

*/
router.get("/:id",HourseController.getHourseById);

/**
 * @desc Update Hourse
 * @route api/hourse/:id
 * @method put
 * @access public
 */
router.put("/:id",HourseController.updateHourse)

/**
 * @desc  Hourse
 * @route api/hourse/:id
 * @method delete
 * @access public
 */
router.delete("/:id",HourseController.deleteHourse)


module.exports = router;
