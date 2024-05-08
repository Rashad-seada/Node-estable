const {
    familyMembership,
    createNewfamilyMembership,updatefamilyMembership
  } = require("../model/familyMembership");
  const ApiErrorCode = require("../../../../core/errors/apiError");
  class familyMembershipController {
    static async getAllfamilyMembership(req, res) {
      // Pagination parameters
      const pageSize = 10; // Number of documents per page
  
      // Calculate the number of documents to skip
      const skip = (req.query.page - 1) * pageSize;
  
      const regexQuery = new RegExp(req.query.query, "i"); // Case-insensitive regex query
      familyMembership.find({
        $or: [
          { type: { $regex: regexQuery } },
          { famillyName: { $regex: regexQuery } },
        ],
      })
        .skip(skip) // Skip documents
        .limit(pageSize)
        // .populate("clientId")
        .then(async (docs) => {
          if (docs) {
            const totalRecords = await familyMembership.countDocuments();
  
            const maxPages = Math.ceil(totalRecords / pageSize);
  
            res.status(200).json({
              status_code: 1,
              message: "Success To Get All  familyMembership",
              familyMembership: {
                current_page: parseInt(req.query.page) || 1,
                max_pages: maxPages,
                data: docs,
              },
              error: null,
            });
          } else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "Can`t Found Menu familyMembership ",
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
    static async getfamilyMembershipById(req, res) {
      await familyMembership.findById(req.params.id)
        // .populate("clientId")
        .then((docs) => {
          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: "Success to get familyMembership By Id",
              data: docs,
            });
          } else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "Can`t Found familyMembership  ",
              data: null,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status_code: ApiErrorCode,
            message: "internal server error",
            error: {
              message: error.message,
            },
          });
        });
    }
    static async createNewfamilyMembership(req, res) {
      const { error } = createNewfamilyMembership(req.body);
      if (error) {
        res.status(400).json({
          status_code: ApiErrorCode.validation,
          message: "Error Validation",
          data: null,
          error: {
            message: error.message,
          },
        });
      } else {
        familyMembership.findOne({ famillyName: req.body.famillyName })
          .then((docs) => {
            if (docs) {
              res.status(400).json({
                status_code: ApiErrorCode.validation,
                message: "familyMembership is already found",
                data: null,
              });
            } else {
              new familyMembership({
                famillyName: req.body.famillyName,
                members: req.body.members,
                membershipTtpe: req.body.membershipTtpe,
                endDate: req.body.endDate,
                startDate: req.body.startDate,
                status: req.body.status,
              })
  
                .save()
                .then((docs) => {
                  res.status(200).json({
                    status_code: 1,
                    message: "familyMembership  created successfuly",
                    data: docs,
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    status_code: ApiErrorCode.internalError,
                    message: "familyMembership  Already Found",
                    error: {
                      message: error.message,
                    },
                  });
                });
            }
          })
          .catch((error) => {
            res.status(500).json({
              status_code: ApiErrorCode.internalError,
              message: "internal server error",
              error: {
                message: error.message,
              },
            });
          });
      }
    }
    static async updatefamilyMembership(req, res) {
     const {error}=updatefamilyMembership(req.body)
  if(error){
      res.status(400).json({
          status_code: ApiErrorCode.validation,
          message: "Validation Error",
          data: null,
          error: {
            message: error.message,
          },
        });
  }else{
      familyMembership.find({ id: req.params.id })
      .then(async (docs) => {
        if (docs) {
          await familyMembership.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                famillyName: req.body.famillyName,
                members: req.body.members,
                membershipTtpe: req.body.membershipTtpe,
                endDate: req.body.endDate,
                startDate: req.body.startDate,
                status: req.body.status,
              },
            },
            { new: true }
          )
            .then((docs) => {
              if (docs) {
                res.status(200).json({
                  status_code: 1,
                  message: "Updated Suvccess",
                  data: docs,
                });
              } else {
                res.status(400).json({
                  status_code: ApiErrorCode.validation,
                  message: "Cand update familyMembership",
                  data: null,
                });
              }
            })
            .catch((error) => {
              res.status(404).json({
                status_code: ApiErrorCode.notFound,
                message: "familyMembership id is not found",
                error: {
                  message: error.message,
                },
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "internal server Down",
          error: {
            message: error.message,
          },
        });
      });
  }
  
     
    }
    static async deletefamilyMembership(req, res) {
      await familyMembership.findByIdAndDelete(req.params.id)
        .then((docs) => {
          if (docs) {
              res.status(200).json({
                status_code: 1,
                message: "Deleted  Successfully",
                data: [],
              });
            } else {
              res.status(400).json({
                status_code: ApiErrorCode.validation,
                message: "Can`d Find  familyMembership Id",
                data: null,
              });
            }
        })
        .catch((error) => {
          res.status(500).json({
              status_code: ApiErrorCode.internalError,
              message: "internal server error , please try again",
              data: null,
              error: {
                message: error.message,
              },
            });
        });
    }
  }

module.exports = { familyMembershipController };