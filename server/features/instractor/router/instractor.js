const express = require("express");
const { instractor } = require("../model/instractor");
const ApiErrorCode = require("../../../core/errors/apiError");
const upload = require("../../../core/utils/upload");
const path = require('path')

router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const pageSize = 10; // Number of documents per page

    // Calculate the number of documents to skip
    const skip = (req.query.page - 1) * pageSize;

    const regexQuery = new RegExp(req.query.query, "i"); // Case-insensitive regex query

    instractor
      .find()
      .select("-__v")
      .skip(skip) // Skip documents
      .limit(pageSize)
      .then(async (docs) => {
        const totalRecords = await instractor.countDocuments();

        const maxPages = Math.ceil(totalRecords / pageSize);

        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Success to get instractors",
            data: {
              current_page: parseInt(req.query.page) || 1,
              max_pages: maxPages,
              instractor: docs,
            },
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
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
          status_code: ApiErrorCode.internalError,
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
          res.status(400).json({
            status_code: ApiErrorCode.validation,
            message: "instractor is already found",
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
              res.status(500).json({
                status_code: ApiErrorCode.internalError,
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
            status_code: 1,
            message: "Success to get instractor data",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: "instractor Id Not Correct",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "internal server error",
          data: null,
          error: {
            error: error.message,
          },
        });
      });
  })
  .patch(async (req, res) => {
    let Instractor = await instractor.findById(req.params.id);

    if (Instractor) {
      try {
        const newInstractor = await instractor.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              instractorName: req.body.instractorName,
              email: req.body.email,
              catigoryId: req.body.catigoryId,
              age: req.body.age,
              gender: req.body.gender,
              photo: req.body.photo,
            },
          },
          { new: true }
        );

        return res.status(200).json({
          status_code: 1,
          message: "Updated Success",
          data: newInstractor,
          error: {
            message: null,
          },
        });
      } catch (error) {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "Validation Error",
          data: null,
          error: {
            message: error.message,
          },
        });
      }
    } else {
      res.status(404).json({
        status_code: ApiErrorCode.notFound,
        message: "didn't found the instractor",
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
            status_code: ApiErrorCode.notFound,
            message: "Instractor Id Not found",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "internal server error",
          data: null,
          error: {
            error: error.message,
          },
        });
      });
  });

router.post(
  "/upload-image/:id",
  upload.single('image'),
  async (req,res) => {
    try{
      instractor.findByIdAndUpdate(
        { _id: req.params.id },
        { avatar : "/"+req.file.path.replace(/\\/g, '/') },
        { new: true } )
        .select("-__v")
        .then((docs)=> {
          if(docs){
            res.status(200).json({
              status_code: 1,
              message: "Got the Hourse successfuly",
              data: docs,
            });
          }else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "Didnt found the Hourse in our records",
              data: null,
              error: {
                message: "Didnt found the Hourse in our records",
              },
            });
          }
        })
        .catch((error)=> {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: error.message,
            data: null,
            error: {
              message: error.message,
            },
          });
        })
    } catch(error){
      res.status(500).json({
        status_code: ApiErrorCode.internalError,
        message: error.message,
        data: null,
        error: {
          message: error.message,
        },
      });
    }
    
  }
);

module.exports = router;
