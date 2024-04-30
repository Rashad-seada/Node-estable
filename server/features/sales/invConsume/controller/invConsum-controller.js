const { invConsume ,createInventoryItemValidation } = require("../model/invConsum");
const ApiErrorCode = require("../../../../core/errors/apiError");
class InvConsunController {
  static async getAllInventoryItem(req, res) {
    // Pagination parameters
    const pageSize = 10; // Number of documents per page

    // Calculate the number of documents to skip
    const skip = (req.query.page - 1) * pageSize;

    const regexQuery = new RegExp(req.query.query, "i"); // Case-insensitive regex query

    invConsume.find({
      $or: [
        { type: { $regex: regexQuery } },
        { invConsumedItemName: { $regex: regexQuery } },
      ],
    })
      .skip(skip) // Skip documents
      .limit(pageSize)
      .then(async (docs) => {
        if (docs) {
          const totalRecords = await invConsume.countDocuments();

          const maxPages = Math.ceil(totalRecords / pageSize);

          res.status(200).json({
            status_code: 1,
            message: "Success To Get All invConsume Item",
            invConsumeItems: {
              current_page: parseInt(req.query.page) || 1,
              max_pages: maxPages,
              data: docs,
            },
            error: null,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode,
            message: "Can1t Found Menu invConsume Item",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "There was a server internal error, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
  static async getInventoryItemById(req, res) {

    await invConsume.findById(req.params.id)
    .then((docs)=>{
      if(docs){
        res.status(200).json({
          status_code: 0,
          message: "Success to get invConsume Item By Id",
          data: docs,
        });

      }else{
        res.status(404).json({
          status_code: ApiErrorCode,
          message: "Can`t Found invConsume Item Name",
          data: null,
        });
      }
    })
    .catch((error)=>{
      res.status(500).json({
        status_code: ApiErrorCode,
        message: "internal server error",
        error: {
          error:message.error
        },
      });

    })
  }
  static async createNewInventoryItem(req, res) {
    const { error } = createInventoryItemValidation(req.body);
    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode,
        message: "Error Validation",
        data: null,
        error: {
          error: error.message,
        },
      });
    } else {
        invConsume.find({ invConsumedItemName: req.body.invConsumedItemName })
        .then((docs) => {
          if (!docs) {
            res.status(400).json({
              status_code: ApiErrorCode.validation,
              message: "invConsume is already found",
              data: null,
            });
          } else {
            new invConsume({
                invConsumedItemName: req.body.invConsumedItemName,
                invConsumedQuantity: req.body.invConsumedQuantity,
                invConsumedPrice: req.body.invConsumedPrice,
                invConsumedMeasure: req.body.invConsumedMeasure,
            })
              .save()
              .then((docs) => {
                res.status(200).json({
                  status_code: 1,
                  message: "invConsume item created successfuly",
                  data: docs,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  status_code: ApiErrorCode.internalError,
                  message: "invConsume item Already Found",
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
    }
  }
  static async updateInventoryItem(req, res) {
    invConsume.find({ id: req.params.id })
      .then(async (docs) => {
        if (docs) {
          await invConsume.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                invConsumedItemName: req.body.invConsumedItemName,
                invConsumedQuantity: req.body.invConsumedQuantity,
                invConsumedPrice: req.body.invConsumedPrice,
                invConsumedMeasure: req.body.invConsumedMeasure,
              },
            },
            { new: true }
          )
            .then((docs) => {
              if (docs) {
                res.status(200).json({
                  status_code:0,
                  message: "success",
                  data: docs,
                });
              } else {
                res.status(400).json({
                  status_code: ApiErrorCode.validation,
                  message: "Cand update ",
                  data: null,
                });
              }
            })
            .catch((error) => {
              res.status(404).json({
                status_code: ApiErrorCode.validation,
                message: "id is not found",
                error: {
                  error:error.message
                },
              });
            });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status_code: ApiErrorCode.validation,
          message: "internal server Down",
          error: {
            error:error.message
          },
        });
      });
  }
  static async deleteInventoryItem(req, res) {
    await Inventory.findByIdAndDelete(req.params.id)
    .then((docs)=>{
      if(docs){
        res.status(200).json({
          status_code: 0,
          message: "itemDescription item is deleted",
          data: [],
        });
      }else{
        res.status(404).json({
          status_code: ApiErrorCode,
          message: "Can`t Found Menu Item Id",
          data: null,
        });
      }

    })
    .catch((error)=>{
      res.status(500).json({
        status_code: ApiErrorCode,
        message: "Internal server Error",
        error:{
          error:error.message
        }
      });
    })
  }
}

module.exports = {InvConsunController};