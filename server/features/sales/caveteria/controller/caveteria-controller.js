const { caveteria,createMenueItemValidation } = require("../model/caveteria");
const ApiErrorCode = require("../../../../core/errors/apiError");
class caveteriaController {
  static async getAllMenueItem(req, res) {
    caveteria
      .findOne({ menueItemName: req.body.menueItemName })
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Success To Get All Menu Iten",
            data: docs,
            error: null,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode,
            message: "Can1t Found Menu Item Name",
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
  static async createNewMenueItem(req, res) {

    const {error}=createMenueItemValidation(req.body)
    if(error){
        res.status(400).json({
            status_code:ApiErrorCode,
            message: "Error Validation",
            data: null,
            error: {
                error:message.error
            }
          })
    }else{
        caveteria
      .findOne({ menueItemName: req.body.menueItemName })
      .then( (docs) => {

        if (docs) {
          res.status(400).json({
            status_code: ApiErrorCode.validation,
            message: "menueItemName is already found",
            data: null,
          });
        } else {
          new caveteria({
            menueItemName: req.body.menueItemName,
            quantity: req.body.quantity,
            type: req.body.type,
            price: req.body.price,
            date: req.body.date,
          })
            .save()
            .then((docs) => {
              res.status(200).json({
                status_code: 1,
                message: "menue item created successfuly",
                data: docs,
              });
            })
            .catch((error) => {
              res.status(500).json({
                status_code: ApiErrorCode.internalError,
                message: "menue item Already Found",
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
  static async getAllCosumedtItem(req, res) {}
  static async createNewCosumedMenueItem(req, res) {}
}

module.exports = caveteriaController;
