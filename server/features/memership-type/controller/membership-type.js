const express = require("express");
const ApiErrorCode = require("../../../core/errors/apiError");
const {
  membershipType,
  membershipTypeValidation,
} = require("../model/membership-type");
router = express.Router();

class membershipTypeController {
  static async getAllmembershipType(req, res) {
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
            status_code: ApiErrorCode.notFound,
            message: "can`t find membership",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "Can`t update ",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }

  static async getmembershipById(req, res) {
    membershipType
      .findById(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 1,
            message: "Success process",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: "Id is not defined membership",
            data: null,
          });
        }
      })

      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "Can`t get membership ",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
  static async createNewMembership(req, res) {
    const { error } = membershipTypeValidation(req.body);

    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode.validation,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      const Membership = new membershipType({
        displayName: req.body.displayName,
        value: req.body.value,
      })
        .save()
        .then((docs) => {
          const { __v, ...other } = docs._doc;
          res.status(200).json({
            status_code: 1,
            message: "Success To Add New Membership",
            data: {
              ...other,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: "internal Server Error",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  }
  static async updateMembership(req, res, next) {
    const { error } = membershipTypeValidation(req.body);
    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode.validation,
        message: error.message,
        data: null,
        error: {
          message: error.message,
        },
      });
    }

    membershipType
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            displayName: req.body.displayName,
            value: req.body.value,
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
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: " Membership Id Not Found  ",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "internal Server Error ",
          data: null,
          error: {
            error: error.message,
          },
        });
      });
  }
  static async deleteMembership(req, res) {
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
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
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
          status_code: ApiErrorCode.internalError,
          message: "cant find id ",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
}

module.exports = membershipTypeController;