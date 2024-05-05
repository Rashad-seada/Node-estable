const {
    Medicine,
    medicineValidation,
    updateMedicineValidation,
} = require("../model/medicine-model");

//import token
const ApiErrorCode = require("../../../core/errors/apiError") 


class MedicineController {

    static createNewMedicine(req,res){
        try {
            const {error} = medicineValidation(req.body)

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
                new Medicine({
                    name : req.body.name,
                    quantity : req.body.quantity,
                    discription : req.body.discription,
                    type : req.body.type,
                    price : req.body.price,
                    dosage : req.body.dosage,
                }).save()
                .then((docs)=> {

                    const { __v, ...other } = docs._doc;

                    res.status(200).json({
                        status_code: 1,
                        message: "Created the medicine successfuly",
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

    static getMedicineById(req,res){
        try{
            Medicine.findById(req.params.id)
            .then((docs)=> {

              if(docs){
                const { __v, ...other } = docs._doc;

                res.status(200).json({
                    status_code: 1,
                    message: "got the medicine successfully",
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

    static getAllMedicine(req,res){
        try {
            {

                // Pagination parameters
                const pageSize = 10; // Number of documents per page
          
                // Calculate the number of documents to skip
                const skip = (req.query.page - 1) * pageSize;
          
                const regexQuery = new RegExp(req.query.query, 'i'); // Case-insensitive regex query

                Medicine.find({
                  $or: [
                    { name: { $regex: regexQuery } },
                    { discription: { $regex: regexQuery } },
                    { type: { $regex: regexQuery } }
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
                      message: "Got the clients successfuly",
                      data: {
                        current_page: parseInt(req.query.page) || 1,
                        max_pages: maxPages,
                        medicine: docs,
                      },
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      status_code: ApiErrorCode.internalError,
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
            status_code: ApiErrorCode.internalError,
            message: "There was a server internal error, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        }
    }

    static updateMedicineById(req,res){
        try{
            const {error} = updateMedicineValidation(req.body)

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
                Medicine
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: {
                        name : req.body.name,
                        quantity : req.body.quantity,
                        discription : req.body.discription,
                        type : req.body.type,
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

    static deleteMedicineById(req,res){
        try {
            Medicine.findByIdAndDelete(req.params.id)
              .select("-__v")
              .then((docs) => {
                if (docs) {
                  res.status(200).json({
                    status_code: 1,
                    message: "The Medicine deleted successfuly",
                    data: docs,
                  });
                } else {
                  res.status(404).json({
                    status_code: ApiErrorCode.notFound,
                    message: "Didn't find the Medicine",
                    data: null,
                    error: {
                      message: "Didn't find the Medicine",
                    },
                  });
                }
              })
              .catch((error) => {
                res.status(500).json({
                  status_code: ApiErrorCode.internalError,
                  message:
                    "There was an error when getting the Medicine, please try again",
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

module.exports = MedicineController;