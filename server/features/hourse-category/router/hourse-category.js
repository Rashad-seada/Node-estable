const express = require("express");
const ApiErrorCode = require("../../../core/errors/apiError") 

router = express.Router();

const {
  HourseCategory,
  hourseCategoryValidation
} = require("../model/hourse-category")

router.post("/", async (req, res) => {

    const {error} = hourseCategoryValidation(req.body);

    if(error){
        res.status(400).json({
            status_code: ApiErrorCode.validation,
            message: "There is a validation error",
            data: null,
            error : {
                message: error.message
            }
        });

    }else {
        new HourseCategory({
            displayName : req.body.displayName,
            value : req.body.value
        })
        .save()
        .then((docs) => {
          const { __v, ...other } = docs._doc;

          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "Got hourse Category successfuly",
              data: {
                ...other
              } ,
            });
          } else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "can`t find hourse Category",
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
  HourseCategory
      .find()
      .select("-__v")
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Got hourse Category successfuly",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: -1,
            message: "can`t find hourse Category ",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status_code: 0,
          message: "There are server internal error",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
});

router.delete("/:id", async (req, res) => {
  HourseCategory
      .findByIdAndDelete(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "The hourse Category was successfuly deleted",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: -1,
            message: "can`t hourse Category status",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status_code: 0,
          message: "There are server internal error",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
});



module.exports = router;
