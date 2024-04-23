const express = require("express");

router = express.Router();

const { Gender, genderValidation } = require("../model/gender");

router.post("/", async (req, res) => {
  const { error } = genderValidation(req.body);

  if (error) {
    res.status(404).json({
      status_code: -2,
      message: "There is a validation error",
      data: null,
      error: {
        message: error.message,
      },
    });
  } else {
    new Gender({
      displayName: req.body.displayName,
      value: req.body.value,
    })
      .save()
      .then((docs) => {
        const { __v, ...other } = docs._doc;

        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Got hourse genders successfuly",
            data: {
              ...other,
            },
          });
        } else {
          res.status(404).json({
            status_code: -2,
            message: "can`t find genders",
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
  }
});

router.get("/", async (req, res) => {
  Gender.find()
    .select("-__v")
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          status_code: 1,
          message: "Got Genders successfuly",
          data: docs,
        });
      } else {
        res.status(404).json({
          status_code: -1,
          message: "can`t find Gender",
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
  Gender.findByIdAndDelete(req.params.id)
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          status_code: 1,
          message: "The Gender was successfuly deleted",
          data: docs,
        });
      } else {
        res.status(404).json({
          status_code: -1,
          message: "can`t find Gender",
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

router.patch("/:id", async (req, res) => {
  Gender.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        displayName: req.body.displayName,
        value: req.body.value,
      },
    },
    { new: true }
  )
    .then((docs) => {
        if(docs){
          res.status(200).json({
            status_code: 0,
            message: "Updated Success",
            data: docs,
          });
        }else {
          res.status(404).json({
            status_code: -1,
            message: "Id Not Found",
            data: null,
            error: {
              error: "Id Not Found",
            },
          });
        }
    })
    .catch((error) => {
      res.status(200).json({
        status_code: -1,
        message: "internal server error",
        data: null,
        error: {
          error: error.message,
        },
      });
    });
});

module.exports = router;
