const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../../core/middleware/verify-token");
const {
  Client,
  clientValidation,
  pageValidation,
  updateValidation,
  updateMembershipValidation,
} = require("../models/client");
//import bycrpt
const bcrypt = require("bcrypt");

//import token
const jwt = require("jsonwebtoken");
const express = require("express");
router = express.Router();

//>>>>>>>>>>>>>>>>>>>> Start Code Here <<<<<<<<<<<<<<<<<<<<<<<<

/**

 * @desc create New Client

 * @route api/Client

 * @method Post

 * @access public

 */
router.post("/", async (req, res) => {
  try {
    const { error } = clientValidation(req.body);
    
    

    if (error) {
      res.status(400).json({
        status_code: -1,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      const client = new Client({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
      })
        .save()
        .then((docs) => {
          const { __v, ...other } = docs._doc;

          res.status(200).json({
            status_code: 1,
            message: "The client is created successfuly",
            data: {
              ...other,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status_code: -2,
            message:
              "There was an error when creating the client, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**
 * @desc Get Client by id
 * @route api/Client
 * @method Get
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    Client.findById(req.params.id)
      .then((docs) => {
        if (docs) {
          const { __v, ...other } = docs._doc;

          res.status(200).json({
            status_code: 1,
            message: "Got the client successfuly",
            data: {
              ...other,
            },
          });
        } else {
          res.status(404).json({
            status_code: -4,
            message: "Didnt found the client in our records",
            data: null,
            error: {
              message: "Didnt found the client in our records",
            },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: -2,
          message:
            "There was an error when getting the client, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**

 * @desc Get Client 

 * @route api/Client/:id

* @method Get

* @access public

*/
router.get("/", async (req, res) => {
  try {
    const { error } = pageValidation(req.body);

    if (error) {
      res.status(400).json({
        status_code: -1,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      // Pagination parameters
      const pageSize = 10; // Number of documents per page

      // Calculate the number of documents to skip
      const skip = (req.body.page_number - 1) * pageSize;

      Client.find({})
        .select("-__v")
        .skip(skip) // Skip documents
        .limit(pageSize)
        .then(async (docs) => {
          const totalRecords = await Client.countDocuments();

          const maxPages = Math.ceil(totalRecords / pageSize);

          res.status(200).json({
            status_code: 1,
            message: "Got the clients successfuly",
            data: {
              current_page: req.body.page_number,
              max_pages: maxPages,
              client: docs,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status_code: -2,
            message:
              "There was an error when getting the client, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**
 * @desc Update Hourse
 * @route api/hourse/:id
 * @method patch
 * @access public
 */
router.patch("/:id", async (req, res) => {
  try {
    const { error } = updateValidation(req.body);

    if (error) {
      res.status(400).json({
        status_code: -1,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      const updateOps = {}; // Object to hold the fields you want to update

      // Example fields to update
      if (req.body.username) {
        updateOps.username = req.body.username;
      }
      if (req.body.email) {
        updateOps.email = req.body.email;
      }
      if (req.body.age) {
        updateOps.age = req.body.age;
      }
      if (req.body.phone) {
        updateOps.phone = req.body.phone;
      }

      Client.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updateOps },
        { new: true }
      )
        .select("-__v")
        .then((docs) => {
          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "The clients updated successfuly",
              data: docs,
            });
          } else {
            res.status(404).json({
              status_code: -4,
              message: "Didn't find the client",
              data: null,
              error: {
                message: "Didn't find the client",
              },
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status_code: -2,
            message:
              "There was an error when getting the client, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**
 * @desc Delete Hourse
 * @route api/client/:id
 * @method delete
 * @access public
 */

router.delete("/:id", async (req, res) => {
  try {
    Client.findByIdAndDelete(req.params.id)
      .select("-__v")
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "The clients deleted successfuly",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: -4,
            message: "Didn't find the client",
            data: null,
            error: {
              message: "Didn't find the client",
            },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: -2,
          message:
            "There was an error when getting the client, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

router.patch("/membership-status/:id", async (req, res) => {
  try {
    const { error } = updateMembershipValidation(req.body);

    if (error) {
      res.status(400).json({
        status_code: -1,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      Client.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            membershipStatus: req.body.membership_status,
          },
        },
        { new: true }
      )
        .select("-__v")
        .then((docs) => {
          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "The clients updated successfuly",
              data: docs,
            });
          } else {
            res.status(404).json({
              status_code: -4,
              message: "Didn't find the client",
              data: null,
              error: {
                message: "Didn't find the client",
              },
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status_code: -2,
            message:
              "There was an error when getting the client, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

module.exports = router;
