const jwt = require("jsonwebtoken")



function verifyToken(req,res,next){


    const token = req.headers.token

    if(token){

        try {
            
            const decoded = jwt.verify(token,process.env.Shoeib2024);

                      req.user=decoded;

             next()

        } catch (error) {

            res.status(404).json({message:"invalid token "})

        }

    }else{

        res.status(404).json({message:"no token proved "})

    }
}

function verifyTokenAndAuthoraization(req,res,next){

    verifyToken(req,res,()=>{

        if(req.user.id==req.params.id ){

            next()
        }
        else{
            res.status(401).json({message:"you aren't allowed"})

        }
    })
}



function verifyTokenAndAuthoration(req,res,next){

    verifyToken(req,res,()=>{

        if( req.user.isAdmin){

            next()

        }else{

            res.status(400).json({message :"you are not admin"})
            
        }



    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthoraization,
    verifyTokenAndAuthoration
}