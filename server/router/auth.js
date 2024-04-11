const {User,validationLoginUser}=require("../model/user")
//import bycrpt

const bcrypt = require ("bcrypt")

//import token
const jwt = require("jsonwebtoken")

const express=require("express")
router = express.Router()



/***
 * @desc Login User
 * @route api/auth/login
 * @method post
 * @access public
 */

router.post("/login",async(req,res,) => {


    const {error}= validationLoginUser(req.body)

    if (error){
        res.status(400).json({
                status_code: -1,
                message: error.message,
                error: {
                    message: error.message
                }
            })
    }
    
    User.findOne({email: req.body.email})
    .then(async user => {

        if(user){

            const {password,__v,...other} = user._doc;
            const validPassword = await bcrypt.compare(req.body.password,user.password)

            const token = jwt.sign({
                    id : user._id,
                    is_seller : user.is_seller ,
                    randomNumber : Math.random()
                },
                process.env.JWT_SECRET_KEY,
            )



            if(validPassword){

                user.token.push(token)

                user.save()
                .then((result)=> {
                    res.status(200).json({
                        status_code: 1,
                        message: "Welcome back Mr." + user.username,
                        data: {
                            user: {
                                ...other,
                                token : token
                            }
                        }
                    })
                }).catch((error)=> {
                    res.status(500).json({
                        status_code: 0,
                        message: "The server is down, please try again later",
                        error: {
                            message: error.message
                        }
                    })
                })


            }else {

                res.status(400).json({
                    status_code: -2,
                    message: "Please enter a valid email and password",
                    data: null
                })

            }
            
        }else {
            res.status(400).json({
                status_code: -1,
                message: "There are no accounts connected to this email",
                data: null
            })

        }
    })
    .catch(error => {
        res.status(500).json({
            status_code: 0,
            message: "The server is down, please try again later",
            error: {
                message: error.message
            }
        })
    })

})


module.exports = router
