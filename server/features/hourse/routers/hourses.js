//const hourseController = require("../controller/horses-controller")

const upload = require("../../../core/utils/upload");

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
router.post("/", HourseController.createNewHourse);

/**
 * @desc Get Hourses
 * @route api/hourse
 * @method Get
 * @access public
 */
router.get("/",HourseController.getAllHourses);

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
router.patch("/:id",HourseController.updateHourse)

/**
 * @desc  Hourse
 * @route api/hourse/:id
 * @method delete
 * @access public
 */
router.delete("/:id",HourseController.deleteHourse)

/**
* @desc Get all Clients
* @route api/Client/
* @method Get
* @access private
*/
router.post(
  "/upload-image/:id",
  upload.single('image'),
  HourseController.uploadHourseImage
);

module.exports = router;
