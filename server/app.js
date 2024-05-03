const express= require("express");
require('dotenv').config({path:"./config.env"});
const {connectingDataBase} =require("./core/infrastructure/db")
const morgan = require("morgan")
const app = express();
const { verifyTokenAndAdmin, } = require("./core/middleware/verify-token")
const cors = require('cors');

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
const membershipTypeRouter = require("./features/memership-type/router/membership-type")
const membershipStatusRouter = require("./features/membership-status/router/membership-status")
const hourseCategoryRouter = require("./features/hourse-category/router/hourse-category")
const instractorRouter =require("./features/instractor/router/instractor")
const gendersRouter =require("./features/gender/router/gender")
const menuItemRouter =require("./features/sales/caveteria/router/caveteria")
const consumeRouter = require("./features/sales/consumeItem/router/consumeRoutes")
const inventoryRouter = require("./features/sales/inventory/router/inventory")
const InvConsumeRouter = require("./features/sales/invConsume/router/invConsum")
const packageRouter = require("./features/sales/packages/router/package")
const invmembershipRouter = require("./features/sales/InvMembership//router/invMembership")

// cors libyrary
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'token'] // Add 'token' to the allowed headers
}));

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
app.use("/api/hourse",verifyTokenAndAdmin,hourseRouter)
app.use("/api/membershipType",verifyTokenAndAdmin,membershipTypeRouter)
app.use("/api/membership-status",verifyTokenAndAdmin,membershipStatusRouter)
app.use("/api/hourse-category",verifyTokenAndAdmin,hourseCategoryRouter)
app.use("/api/instractor",verifyTokenAndAdmin,instractorRouter)
app.use("/api/gender",verifyTokenAndAdmin,gendersRouter)
app.use("/api/caveteria/menuitem",verifyTokenAndAdmin,menuItemRouter)
app.use("/api/caveteria/consume",verifyTokenAndAdmin,consumeRouter)
app.use("/api/inventory/inventoryitem",verifyTokenAndAdmin,inventoryRouter)
app.use("/api/inventory/InvConsume",verifyTokenAndAdmin,InvConsumeRouter)
app.use("/api/package",packageRouter)
app.use("/api/invmembership",invmembershipRouter)



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