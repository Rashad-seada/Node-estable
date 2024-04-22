const express = require("express");
const { instractor } = require("../model/instractor");

router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    await instractor
      .find()
      .select("-__v")
      
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 0,
            message: "Success to get instractors",
            data: docs,
            error: null,
          });
        } else {
          res.status(400).json({
            status_code: -1,
            message: "cant get instractor data",
            data: null,
            error: {
              error: error.message,
            },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: -2,
          message: "internal server error",
          data: null,
          error: {
            error: error.message,
          },
        });
      });
  })
  .post(async (req, res) => {
    await instractor
      .findOne({ email: req.body.email })
      .then((docs) => {
        if (docs) {
          res.status(404).json({
            status_code: -1,
            message: "instractor is already  found",
            data: null,
          });
        } else {
          new instractor({
            instractorName: req.body.instractorName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age,
            gender: req.body.gender,
            photo: req.body.photo,
          })
            .save()
            .then((docs) => {
              res.status(200).json({
                status_code: 1,
                message: "instractor created successfuly",
                data: docs,
              });
            })
            .catch((error) => {
              res.status(400).json({
                status_code: -3,
                message: "Instractor Already Found",
                error: {
                  error: error.message,
                },
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: 1,
          message: "internal server error",
          error: {
            error: error.message,
          },
        });
      });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    await instractor
      .findById(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 0,
            message: "Success to get instractor data",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: -1,
            message: "instractor Id Not Correct",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: -1,
          message: "internal server error",
          data: null,
          error: {
            error: error.message,
          },
        });
      });
  })

.patch(async (req, res) => {
    let Instractor = await  instractor.findById(req.params.id)
  
    if(Instractor){
        try {


            const newInstractor = await  instractor.findByIdAndUpdate(req.params.id,{
                $set:{
                    instractorName:req.body.instractorName,
                    email:req.body.email,
                    catigoryId:req.body.catigoryId,
                    age:req.body.age,
                    gender:req.body.gender,
                    photo:req.body.photo,
                } 
              },{ new:true})

              return  res.status(200).json({
                status_code: 2,
                message: "Updated Success",
                data: newInstractor,
                error: {
                  message: null,
        }})

        } catch (error) {
            res.status(500).json({
                status_code: -2,
                message: "Validation Error",
                data: null,
                error: {
                  message: error.message,
                },
              });
        }
    }else{

        let error =new Error()
        res.status(500).json({
            status_code: -3,
            message: "There was a server internal error, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });

    }
  })
  .delete(async (req, res) => {
    await instractor
      .findByIdAndDelete(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Instractor Is deleted",
            data: [],
          });
        } else {
          res.status(404).json({
            status_code: -1,
            message: "Instractor Id Not found",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
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
