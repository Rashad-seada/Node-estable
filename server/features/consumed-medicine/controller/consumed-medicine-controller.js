const {
    ConsumedMedicine,
    consumedMedicineValidation,
    updateConsumedMedicineValidation
} = require("../model/consumed-medicine-model");

//import token
const ApiErrorCode = require("../../../core/errors/apiError") 


class ConsumedMedicineController {

    static createNewConsumedMedicine(req,res){
        try {
            const {error} = consumedMedicineValidation(req.body)

            if(error){
                res.status(400).json({
                    status_code: ApiErrorCode.validation,
                    message: error.message,
                    data: null,
                    error: {
                      message: error.message,
                    },
                  });
            } else {
                new ConsumedMedicine({

                    hourseId : req.body.hourseId,
                    medicineId : req.body.medicineId,
                    discription : req.body.discription,
                    price : req.body.price,
                    dosage : req.body.dosage,

                }).save()
                .then((docs)=> {

                    const { __v, ...other } = docs._doc;

                    res.status(200).json({
                        status_code: 1,
                        message: error.message,
                        data: {
                            ...other
                        },
                    
                      });
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
            }
        } catch (error){
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

    static getConsumedMedicineById(req,res){
        try{
            ConsumedMedicine.findById(req.params.id)
            .then((docs)=> {

                if(docs){
                    const { __v, ...other } = docs._doc;

                    res.status(200).json({
                        status_code: 1,
                        message: error.message,
                        data: {
                            ...other
                        },
                    });
                }else {
                    res.status(404).json({
                        status_code: ApiErrorCode.notFound,
                        message: "did't found the Consumed Medicine",
                        data: null,
                        error : {
                            message : "did't found the Consumed Medicine",
                        }
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
        }catch(error){
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

    static getAllConsumedMedicine(req,res){
        try {
            {

                // Pagination parameters
                const pageSize = 10; // Number of documents per page
          
                // Calculate the number of documents to skip
                const skip = (req.query.page - 1) * pageSize;
          
                const regexQuery = new RegExp(req.query.query, 'i'); // Case-insensitive regex query

                ConsumedMedicine.find({
                  $or: [
                    { discription: { $regex: regexQuery } },
                  ]
                })
                  .select("-__v")
                  .skip(skip) // Skip documents
                  .limit(pageSize)
                  .then(async (docs) => {
                    const totalRecords = await Medicine.countDocuments();
          
                    const maxPages = Math.ceil(totalRecords / pageSize);
          
                    res.status(200).json({
                      status_code: 1,
                      message: "Got the Consumed Medicine successfuly",
                      data: {
                        current_page: parseInt(req.query.page) || 1,
                        max_pages: maxPages,
                        client: docs,
                      },
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      status_code: ApiErrorCode.internalError,
                      message:
                        "There was an error when getting the Consumed Medicine, please try again",
                      data: null,
                      error: {
                        message: error.message,
                      },
                    });
                  });
              }
        } catch (error) {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: "There was a server internal error, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        }
    }

    static updateConsumedMedicineById(req,res){
        try{
            const {error} = updateConsumedMedicineValidation(req.body)

            if(error){
                res.status(400).json({
                    status_code: ApiErrorCode.validation,
                    message: error.message,
                    data: null,
                    error: {
                      message: error.message,
                    },
                  });
            } else {
                ConsumedMedicine
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: {
                        hourseId : req.body.hourseId,
                        medicineId : req.body.medicineId,
                        discription : req.body.discription,
                        price : req.body.price,
                        dosage : req.body.dosage,
                    } },
                    { new: true }
                ).then((docs)=> {

                    const { __v, ...other } = docs._doc;

                    res.status(200).json({
                        status_code: 1,
                        message: error.message,
                        data: {
                            ...other
                        },
                    
                      });
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
            }
        }catch(error){
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

    static deleteConsumedMedicineById(req,res){
        try {
            ConsumedMedicine.findByIdAndDelete(req.params.id)
              .select("-__v")
              .then((docs) => {
                if (docs) {
                  res.status(200).json({
                    status_code: 1,
                    message: "The Consumed Medicine deleted successfuly",
                    data: docs,
                  });
                } else {
                  res.status(404).json({
                    status_code: ApiErrorCode.notFound,
                    message: "Didn't find the Consumed Medicine",
                    data: null,
                    error: {
                      message: "Didn't find the Consumed Medicine",
                    },
                  });
                }
              })
              .catch((error) => {
                res.status(500).json({
                  status_code: ApiErrorCode.internalError,
                  message:
                    "There was an error when getting the Consumed Medicine, please try again",
                  data: null,
                  error: {
                    message: error.message,
                  },
                });
              });
          } catch (error) {
            res.status(500).json({
              status_code: ApiErrorCode.internalError,
              message: "There was a server internal error, please try again",
              data: null,
              error: {
                message: error.message,
              },
            });
          }
    }


}

module.exports = ConsumedMedicineController;