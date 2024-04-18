const jwt = require("jsonwebtoken")


function verifyToken(req,res,next){

    const token = req.headers.token

    if(token){

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user = decoded
<<<<<<< HEAD

=======
            
>>>>>>> 534651199d83439dcb813aae2b3b2129178c6737
            next()

        }catch(error){
            res.status(400).json({
                status_code: -1,
                message: "This user is not autharized",
                error: {
                    message : error
                }
            })
        }
        

    }else {
        res.status(400).json({
            status_code: -1,
            message: "This user is not autharized",
            error: {
                message : "You must provide a token to execute the method"
            }
        })
    }
}

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=> {

        if(req.user.isAdmin ){

            next()

        }else {
            res.status(400).json({
                status_code: -1,
                message: "This user is not autharized",
                error: {
                    message : "You must be an admin to use this method"
                }
            })
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
}