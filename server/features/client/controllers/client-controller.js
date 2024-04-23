const {
    Client,
    clientValidation,
    pageValidation,
    updateValidation,
    updateMembershipValidation,
} = require("../models/client");

//import token
const express = require("express");
router = express.Router();
const ApiErrorCode = require("../../../core/errors/apiError") 


class ClientController {

    static async createNewClient (req, res) {
        try {
          const { error } = clientValidation(req.body);
          
          if (error) {
            res.status(400).json({
              status_code: ApiErrorCode.validation,
              message: error.message,
              error: {
                message: error.message,
              },
            });
          } else {
            const client = new Client({
              username: req.body.username,
              email: req.body.email,
              phone: req.body.phone,
              gender: req.body.gender,
              age: req.body.age,
              membershipStatus : req.body.membershipStatus,
              membershipType : req.body.membershipType,
            })
              .save()
              .then((docs) => {
                const { __v, ...other } = docs._doc;
      
                res.status(200).json({
                  status_code: 1,
                  message: "The client is created successfuly",
                  data: {
                    ...other,
                  },
                });
              })
              .catch((error) => {
                res.status(500).json({
                  status_code: ApiErrorCode.internalError,
                  message:
                    "There was an error when creating the client, please try again",
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

    static async getClientById (req, res) {
        try {
          Client.findById(req.params.id)
            .then((docs) => {
              if (docs) {
                const { __v, ...other } = docs._doc;
      
                res.status(200).json({
                  status_code: 1,
                  message: "Got the client successfuly",
                  data: {
                    ...other,
                  },
                });
              } else {
                res.status(404).json({
                  status_code: ApiErrorCode.notFound,
                  message: "Didnt found the client in our records",
                  data: null,
                  error: {
                    message: "Didnt found the client in our records",
                  },
                });
              }
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

    static async getAllClients (req, res) {
        try {
            {

                console.log(req.query.page)
                // Pagination parameters
                const pageSize = 10; // Number of documents per page
          
                // Calculate the number of documents to skip
                const skip = (req.query.page - 1) * pageSize;
          
                const regexQuery = new RegExp(req.query.query, 'i'); // Case-insensitive regex query

                Client.find({
                  $or: [
                    { username: { $regex: regexQuery } },
                    { email: { $regex: regexQuery } },
                    { phone: { $regex: regexQuery } }
                  ]
                })
                  .select("-__v")
                  .skip(skip) // Skip documents
                  .limit(pageSize)
                  .then(async (docs) => {
                    const totalRecords = await Client.countDocuments();
          
                    const maxPages = Math.ceil(totalRecords / pageSize);
          
                    res.status(200).json({
                      status_code: 1,
                      message: "Got the clients successfuly",
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

    static async updateClientById (req, res) {
        try {
          const { error } = updateValidation(req.body);

          if (error) {
            res.status(400).json({
              status_code: ApiErrorCode.validation,
              message: error.message,
              error: {
                message: error.message,
              },
            });
          } else {
            const updateOps = {}; // Object to hold the fields you want to update
      
            // Example fields to update
            if (req.body.username) {
              updateOps.username = req.body.username;
            }
            if (req.body.email) {
              updateOps.email = req.body.email;
            }
            if (req.body.age) {
              updateOps.age = req.body.age;
            }
            if (req.body.phone) {
              updateOps.phone = req.body.phone;
            }
            if (req.body.membershipStatus) {
              updateOps.membershipStatus = req.body.membershipStatus;
            }
            if (req.body.membershipType) {
              updateOps.membershipType = req.body.membershipType;
            }
            if (req.body.gender) {
              updateOps.gender = req.body.gender;
            }
      
            Client.findOneAndUpdate(
              { _id: req.params.id },
              { $set: updateOps },
              { new: true }
            )
              .select("-__v")
              .then((docs) => {
                if (docs) {
                  res.status(200).json({
                    status_code: 1,
                    message: "The clients updated successfuly",
                    data: docs,
                  });
                } else {
                  res.status(404).json({
                    status_code: ApiErrorCode.notFound,
                    message: "Didn't find the client",
                    data: null,
                    error: {
                      message: "Didn't find the client",
                    },
                  });
                }
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

    static async deleteClientById (req, res) {
        try {
          Client.findByIdAndDelete(req.params.id)
            .select("-__v")
            .then((docs) => {
              if (docs) {
                res.status(200).json({
                  status_code: 1,
                  message: "The clients deleted successfuly",
                  data: [],
                });
              } else {
                res.status(404).json({
                  status_code: ApiErrorCode.notFound,
                  message: "Didn't find the client",
                  data: null,
                  error: {
                    message: "Didn't find the client",
                  },
                });
              }
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

    static async updateClientMembershipStatus (req, res) {
        try {
          const { error } = updateMembershipValidation(req.body);
      
          if (error) {
            res.status(400).json({
              status_code: ApiErrorCode.validation,
              message: error.message,
              error: {
                message: error.message,
              },
            });
          } else {
            Client.findOneAndUpdate(
              { _id: req.params.id },
              {
                $set: {
                  membershipStatus: req.body.membership_status,
                },
              },
              { new: true }
            )
              .select("-__v")
              .then((docs) => {
                if (docs) {
                  res.status(200).json({
                    status_code: 1,
                    message: "The clients updated successfuly",
                    data: docs,
                  });
                } else {
                  res.status(404).json({
                    status_code: ApiErrorCode.notFound,
                    message: "Didn't find the client",
                    data: null,
                    error: {
                      message: "Didn't find the client",
                    },
                  });
                }
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
    

} 

module.exports = ClientController;