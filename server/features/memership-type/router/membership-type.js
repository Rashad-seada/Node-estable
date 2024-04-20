const express = require("express");

router = express.Router();

const {
  membershipType,
  membershipTypeValidation,
} = require("../model/membership-type");

router.get("/", async (req, res) => {
  membershipType
    .find()
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          status_code: 1,
          message: "Success process",
          data: docs,
        });
      } else {
        res.status(404).json({
          status_code: -1,
          message: "can`t find membership",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status_code: 0,
        message: "Can`t update ",
        data: null,
        error: {
          message: error.message,
        },
      });
    });
});

router.get("/:id",async(req,res)=>{

    membershipType.findById(req.params.id)
    .then((docs)=>{
        if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "Success process",
              data: docs,
            });
          } else {
            res.status(404).json({
              status_code: -1,
              message: "Id is not defined membership",
              data: null,
            });
          }
    })

    .catch((error)=>{
        res.status(400).json({
            status_code: 0,
            message: "Can`t get membership ",
            data: null,
            error: {
              message: error.message,
            },
          });
    })
})

router.post("/", async (req, res) => {
  const { error } = membershipTypeValidation(req.body);

  if (error) {
    res.status(400).json({
      status_code: -1,
      message: error.message,
      error: {
        message: error.message,
      },
    });
  } else {
    const Membership = new membershipType({
      displayName: req.body.displayName,
      value:req.body.value
    })
      .save()
      .then((docs) => {
        if (docs) {

        const {__v , ...other} = docs._doc
          res.status(200).json({
            status_code: 1,
            message: "Success To Add New Membership",
            data: {
            ...other
            },
          });
        } else {
          res.status(200).json({
            status_code: -1,
            message: "can`t Add New Membership",
            data: null,
            error: {
              message: error.message,
            },
          });
        }
      })
      .catch((error) => {
        res.status(200).json({
          status_code: 1,
          message: "internal Server Error",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
});

router.patch("/:id", async (req, res, next) => {
  const { error } = membershipTypeValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }

  membershipType
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          displayName: req.body.displayName,
          value:req.body.value
        },
      },
      { new: true }
    )

    .then((docs) => {
      if (docs) {
        res.status(200).json({
          status_code: 1,
          message: "updated  Membership  Succes",
          data: docs,
        });
      } else {
        res.status(400).json({
          status_code: 1,
          message: " Membership Id Not Found  ",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status_code: -1,
        message: "internal Server Error ",
        data: null,
        error: {
          error: error.message,
        },
      });
    });
});

router.delete("/:id", async (req, res) => {
  membershipType
    .findByIdAndDelete(req.params.id)
    .then((docs) => {
      if (docs) {
        res.status(200).json({
          status_code: 1,
          message: " membership is deleted",
          data: docs,
        });
      } else {
        res.status(400).json({
          status_code: 1,
          message: "can`t delete membership",
          data: null,
          error: {
            message: error.message,
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status_code: -4,
        message: "cant find id ",
        data: null,
        error: {
          message: error.message,
        },
      });
    });
});

module.exports = router;
