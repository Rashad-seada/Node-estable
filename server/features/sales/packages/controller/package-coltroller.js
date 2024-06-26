const ApiErrorCode = require("../../../../core/errors/apiError");
const {
  Package,
  createNewPackage,
  updatePackage,
} = require("../model/package");
class packageController {
  static async getAllpackages(req, res) {
    // Pagination parameters
    const pageSize = 10; // Number of documents per page

    // Calculate the number of documents to skip
    const skip = (req.query.page - 1) * pageSize;

    const regexQuery = new RegExp(req.query.query, "i");

    Package.find({
      $or: [
        { category: { $regex: regexQuery } },
        { status: { $regex: regexQuery } },
      ],
    })
      .skip(skip) // Skip documents
      .limit(pageSize)
      .populate("clientId")
      .then(async (docs) => {
        if (docs) {
          const totalRecords = await Package.countDocuments();

          const maxPages = Math.ceil(totalRecords / pageSize);

          res.status(200).json({
            status_code: 1,
            message: "Success To Get All Package ",

            Packages: {
              current_page: parseInt(req.query.page) || 1,
              max_pages: maxPages,
              data: docs,
            },
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: "Can`t Found Menu Packages ",
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
  static async getPackageById(req, res) {
    Package.findById(req.params.id)
      .populate("clientId")
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Success To Get All Package By Id ",
            data: {
              packages: docs,
            },
            error: null,
          });
        } else {
          res.status(404).json({
            status_code:  ApiErrorCode.notFound,
            message: "Cant do to  Package Id ",
            data: null
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code:  ApiErrorCode.internalError,
          message: "internal Server Error ",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
  static async createNawPackage(req, res) {
    try {
      const { error } = createNewPackage(req.body);
      if (error) {
        res.status(400).json({
          status_code: ApiErrorCode.validation,
          message: error.message,
          data: null,
          error: {
            message: error.message,
          },
        });
      } else {
        await new Package({
          category: req.body.category,
          lessons: req.body.lessons,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          status: req.body.status,
          clientId: req.body.clientId,
        })
          .save()
          .then((docs) => {
            res.status(200).json({
              status_code: 1,
              message: "Package is created successfuly",
              data: docs,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status_code: ApiErrorCode.internalError,
              message: "Package  Already Found",
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
        message: "Package  Already Found",
        data : null,
        error: {
          message: error.message,
        },
      });
    }
  }
  static async updatePackage(req, res) {
    const { error } = updatePackage(req.body);
    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode.validation,
        message: error.message,
        data: null,
        error: {
          message: error.message,
        },
      });
    } else {
      Package.find({ id: req.params.id })
        .then(async (docs) => {
          if (docs) {
            await Package.findByIdAndUpdate(
              req.params.id,
              {
                $set: {
                  // clientName: req.body.clientName,
                  category: req.body.category,
                  lessons: req.body.lessons,
                  startDate: req.body.startDate,
                  endDate: req.body.endDate,
                  status: req.body.status,
                  clientId: req.body.clientId,
                },
              },
              { new: true }
            )
              .then((docs) => {
                if (docs) {
                  res.status(200).json({
                    status_code: 1,
                    message: "Updated Success",
                    data: docs,
                  });
                } else {
                  res.status(404).json({
                    status_code: ApiErrorCode.notFound,
                    message: "Cand update package",
                    data: null,
                  });
                }
              })
              .catch((error) => {
                res.status(500).json({
                  status_code: ApiErrorCode.internalError,
                  message: "id is not found",
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
  static async deletePackage(req, res) {
    Package.findByIdAndDelete(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Package Deleted Successfully",
            data: [],
            error: null,
          });
        } else {
          res.status(400).json({
            status_code: ApiErrorCode.validation,
            message: "Package Id Is Not Found",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: 1,
          message: "internal server error",
          error: {
            message: error.message,
          },
        });
      });
  }
}

module.exports = {
  packageController,
};

/**
 * clientName:req.body.clientName,
        category:req.body.category,
        lessons:req.body.lessons,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        status:req.body.endDate,
 */
