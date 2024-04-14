const express= require("express");
require('dotenv').config({path:"./config.env"});
const {connectingDataBase} =require("./core/infrastructure/db")
const morgan = require("morgan")
const app = express();
const { verifyTokenAndAdmin, } = require("./core/middleware/verify-token")


// Connecting to database
connectingDataBase()


// Middle were
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//path
const authRouter = require('./features/auth/routers/auth');
const clientRouter = require('./features/client/routers/clients');
const hourseRouter = require("./features/hourse/routers/hourses")

// Error handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});


//Routs
app.use("/api/auth", authRouter)
app.use("/api/client",verifyTokenAndAdmin, clientRouter)
app.use("/api/hourse",hourseRouter)

app.use((req,res,next)=> { 
    const error = new Error('Url route not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500).json({
        status_code : 0,
        message : "There was an error",
        error : {
            message : error.message
        }
    })
})


module.exports = app;