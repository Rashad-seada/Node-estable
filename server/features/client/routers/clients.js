//import token
const express = require("express");
router = express.Router();
const upload = require("../../../core/utils/upload");

const ClientController = require("../controllers/client-controller")


/**
 * @desc create New Client
 * @route api/Client
 * @method Post
 * @access private
 */
router.post(
  "/",
   ClientController.createNewClient
);



/**
 * @desc Get Client by id
 * @route api/Client
 * @method Get
 * @access private
 */
router.get(
  "/:id",
   ClientController.getClientById
);



/**
* @desc Get all Clients
* @route api/Client/
* @method Get
* @access private
*/
router.get(
  "/",
   ClientController.getAllClients
);



/**
 * @desc Update Client
 * @route api/client/:id
 * @method patch
 * @access private
 */
router.patch(
  "/:id",
   ClientController.updateClientById
);



/**
 * @desc Delete Client
 * @route api/client/:id
 * @method delete
 * @access private
 */
router.delete(
  "/:id",
   ClientController.deleteClientById
);



/**
 * @desc update Client membership status
 * @route api/client/:id
 * @method patch
 * @access private
 */
router.patch(
  "/membership-status/:id",
   ClientController.updateClientMembershipStatus
);


/**
* @desc Get all Clients
* @route api/Client/
* @method Get
* @access private
*/
router.post(
  "/upload-image/:id",
  upload.single('image'),
  ClientController.uploadClientImage
);

module.exports = router;
