//const hourseController = require("../controller/horses-controller")
const { Error } = require("mongoose");
const {
  Hourse,
  createHourseValidation,
  pageValidation,
} = require("../models/house");

const express = require("express");

router = express.Router();

//>>>>>>>>>>>>>>>>>>>> Start Code Here <<<<<<<<<<<<<<<<<<<<<<<<

/**

 * @desc create New Hourse

 * @route api/hourse

 * @method Post

 * @access public

 */
router.post("/", async (req, res) => {

    let hourse = await Hourse.findOne({hourseName:req.body.hourseName})
  
    if(!hourse){
        const { error } = createHourseValidation(req.body)

        
        if (error) {
          res.status(400).json({
            status_code: -1,
            message: error.message,
            error: {
              message: error.message,
            },
          });
        } else {
          const hourse = new Hourse({
            hourseName: req.body.hourseName,
            age: req.body.age,
            catigoryId: req.body.catigoryId,
            clientId: req.body.clientId,
            groom: req.body.groom,
            gender: req.body.gender,
            note: req.body.note,
            documents: req.body.documents,
          })
            .save()
            .then((docs) => {
              const { __v, ...other } = docs._doc;
    
              res.status(200).json({
                status_code: 1,
                message: "The Hourse is created successfuly",
                data: {
                  ...other,
                },
              });
            })
            .catch((error) => {
              res.status(500).json({
                status_code: -2,
                message:
                  "There was an error when creating the Hourse, please try again",
                data: null,
                error: {
                  message: error.message,
                },
              });
            });
        }

    } else {
        let error = new Error()
        res.status(500).json({
            status_code: -3,
            sent : "already found",
            message: "There was a server internal error, please try again",
            data: null,
            error : error.message
            
          });
    
    
  }
});

/**
 * @desc Get Hourse
 * @route api/hourse
 * @method Get
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const { error } = pageValidation(req.body);

    if (error) {
      res.status(400).json({
        status_code: -1,
        message: error.message,
        error: {
          message: error.message,
        },
      });
    } else {
      // Pagination parameters
      const pageSize = 10; // Number of documents per page

      // Calculate the number of documents to skip
      const skip = (req.body.page_number - 1) * pageSize;

      Hourse.find({})
        .select("-__v")
        .skip(skip) // Skip documents
        .limit(pageSize)
        .then(async (docs) => {
          const totalRecords = await Hourse.countDocuments();

          const maxPages = Math.ceil(totalRecords / pageSize);

          res.status(200).json({
            status_code: 1,
            message: "Got the hourse successfuly",
            data: {
              current_page: req.body.page_number,
              max_pages: maxPages,
              hourse: docs,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            status_code: -2,
            message:
              "There was an error when getting the hourse, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**

 * @desc Get Hourse By id

 * @route api/hourse/:id

* @method Get

* @access public

*/
router.get("/:id", async (req, res) => {
  try {
    Hourse.findById(req.params.id)
      .then((docs) => {
        if (docs) {
          const { __v, ...other } = docs._doc;

          res.status(200).json({
            status_code: 1,
            message: "Got the Hourse successfuly",
            data: {
              ...other,
            },
          });
        } else {
          res.status(404).json({
            status_code: -4,
            message: "Didnt found the Hourse in our records",
            data: null,
            error: {
              message: "Didnt found the Hourse in our records",
            },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: -2,
          message:
            "There was an error when getting the Hourse, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  } catch (error) {
    res.status(500).json({
      status_code: -3,
      message: "There was a server internal error, please try again",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
});

/**
 * @desc Update Hourse
 * @route api/hourse/:id
 * @method put
 * @access public
 */
router.put("/:id",async(req,res)=>{

    let hourse = await  Hourse.findById(req.params.id)

    if(hourse){
        try {


            const newHourse = await  Hourse.findByIdAndUpdate(req.params.id,{
                $set:{
                    hourseName:req.body.hourseName,
                    age:req.body.age,
                    catigoryId:req.body.catigoryId,
                    clientId:req.body.clientId,
                    groom:req.body.groom,
                    gender:req.body.gender,
                    note:req.body.note,
                    documents:req.body.documents


                } 
             },{ new:true})

             return  res.status(200).json({
                status_code: 2,
                message: "Success process",
                data: newHourse,
                error: {
                  message: null,
        }})




        } catch (error) {
            res.status(500).json({
                status_code: -2,
                message: "Validation Error",
                data: null,
                error: {
                  message: error.message,
                },
              });
        }

    }else{

        let error =new Error()
        res.status(500).json({
            status_code: -3,
            message: "There was a server internal error, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });

    }

})

/**
 * @desc  Hourse
 * @route api/hourse/:id
 * @method delete
 * @access public
 */
router.delete("/:id",async(req,res)=>{
    let hourse = await Hourse.findById(req.params.id)

    try {

        if(hourse){
            await Hourse.findByIdAndDelete(req.params.id)

            res.status(200).json({
                status_code: 4,
                message: "Horse is deleted",
                data: [],
                error:null,
            })

        }else{
            const error= new Error()
            res.status(404).json({
                status_code: -4,
                message: "Horse Id Not Found ",
                data: null,
                error: {
                  message:error.message,
                },
            })
        }
    } catch (error) {
        res.status(500).json({
            status_code: -4,
            message: "There was a server internal error, please try again ",
            data: null,
            error: {
              message: error.message,
            }
        })
    }
    })


module.exports = router;
