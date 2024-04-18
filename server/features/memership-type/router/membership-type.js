const express=require("express")

router = express.Router()

const {membershipType,membershipTypeValidation} = require("../model/membership-type")

router.get("/",async(req,res)=>{

    membershipType.find()
    .then((docs)=>{})
    .catch((error)=>{

        

    })
})


module.exports = router