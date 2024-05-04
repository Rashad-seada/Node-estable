const path = require("path")

const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cd) {
        cd(null,"uploads/")
    },
    filename : function(req,file,cd){
        cd(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage : storage }) 

module.exports = upload