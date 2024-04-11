const jwt = require("jsonwebtoken")


function verifyToken(req,res,next){

    const token = req.headers.token

    if(token){

        try{
            const decoded = jwt.verify(token,process.env.Shoeib2024)
            req.user = decoded

            console.log(req.user)
            next()

        }catch(error){
            res.status(400).json({
                status_code: -1,
                message: "This user is not autharized",
                error: {
                    message : "You token is not valid"
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
    TokenValidator.verifyToken(req,res,()=> {
        if(req.user.is_seller){
            next()
        }else {
            res.status(400).json({
                status_code: -1,
                message: "This user is not autharized",
                error: {
                    message : "You must be a seller to use this method"
                }
            })
        }

    })
}

//////////////////

module.exports = {
    verifyToken,
    verifyTokenAndAuthoraization,
    verifyTokenAndAuthoration
}