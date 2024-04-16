 const {verifyTokenAndAdmin, verifyToken} = require("../../../core/middleware/verify-token")
 const express = require ("express")
const {Admin} = require ("../model/admin")
 router = express.Router();
 console.log("first")

 router.get(("/get-admin"),verifyTokenAndAdmin,async(req,res) =>{

     const admin =await Admin.findOne({_id : req.user._id})
    .then(()=>{
        res.status(200).json({
            status_code: 1,
            message: "You Can Access",
            data:  `your Data : ${admin}`,
            error: {
              message:[],
            },
        }) })
        .catch((error)=>{
            res.status(200).json({
                status_code: -1,
                message: "You Can`t Access",
                data:  null,
                error: {
                  message:error.message,
                },
            })
        })
    })





 module.exports= router