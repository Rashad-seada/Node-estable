const express = require("express");
const ApiErrorCode = require("../../../core/errors/apiError") 
router = express.Router();

const {
    MembershipStatus,
    membershipStatusValidation
} = require("../model/membership-status")

router.post("/", async (req, res) => {

    const {error} = membershipStatusValidation(req.body);

    if(error){
        res.status(404).json({
            status_code: ApiErrorCode.validation,
            message: "There is a validation error",
            data: null,
            error : {
                message: error.message
            }
        });

    }else {
        new MembershipStatus({
            displayName : req.body.displayName,
            value : req.body.value
        })
        .save()
        .then((docs) => {
          const { __v, ...other } = docs._doc;

          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "Got memberships status successfuly",
              data: {
                ...other
              } ,
            });
          } else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "can`t find memberships status",
              data: null,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: "There are server internal error",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }


});

router.get("/", async (req, res) => {
    MembershipStatus
      .find()
      .select("-__v")
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Got memberships status successfuly",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: "can`t find memberships status",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "There are server internal error",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
});

router.delete("/:id", async (req, res) => {
    MembershipStatus
      .findByIdAndDelete(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "The memberships status was successfuly deleted",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: "can`t find memberships status",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "There are server internal error",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
});



module.exports = router;
