const express = require('express');
const router = express.Router()
const multer  = require('multer')
const path = require("path")
const app = express()
const https = require('https');
const fs = require("fs")
const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
// router.use(multer({dest:'image/'}).single('image'));
router.use(multer({dest:'./image'}).single('image'));


const { MakeMaster, CategoryMaster, TypeMaster, CalibrationMaster_1,oitm ,CalibrationLocationMaster, InstrumentMaster} = require('../models');
// const oitm = require('../models/oitm');


var storage = multer.diskStorage({
  destination: 'image/',
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

router.post('/single', upload.single('image'), function (req, res, next) {
    console.log("00000000",req.file);
    res.send("created");
})



function sendError(res, err) {
    var result = {
        "success": false,
        "error": err
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "count": Number(result)+1,
        "data": result
    };
    return res.json(finalResult);
}
// GET TypeMaster 
router.get('/Gettype', (req, res) => {
    return new Promise((resolve, reject) => {
        TypeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/Gettype/:typedata', (req, res) => {
    return new Promise((resolve, reject) => {
        console.log("ddd",req.params.categorydata);
        InstrumentMaster.findAll({ where: {deleteStatus: false, typeId: req.params.typedata  }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})



//GET CategoryMaster
router.get('/GetCategory', (req, res) => {
    return new Promise((resolve, reject) => {
        CategoryMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/GetCategory/:categorydata', (req, res) => {
    return new Promise((resolve, reject) => {
        console.log("ddd",req.params.categorydata);
        TypeMaster.findAll({ where: {deleteStatus: false, categoryId: req.params.categorydata  }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/GetCategory/:categorydata', (req, res) => {
    return new Promise((resolve, reject) => {
        console.log("ddd",req.params.categorydata);
        InstrumentMaster.findAll({ where: {deleteStatus: false, categoryId: req.params.categorydata  }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

// GET Make
router.get('/GetMake', (req, res) => {
    return new Promise((resolve, reject) => {
        MakeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/department', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/department/:departmentdata', (req, res) => {
    return new Promise((resolve, reject) => {
        console.log("ddd",req.params.categorydata);
        CalibrationLocationMaster.findAll({ where: {deleteStatus: false, ShortName: req.params.departmentdata  }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


// const upload = require("../middleware/fileupload");
// router.post('/upload-image', upload.uploadad,(req,res)=>{console.log(`not its,${req}`)
//     res.send("ok!");
// })





// router.post("/single", upload.single("image"),)(req,res=> {
//    console.log(req.file);
//    res.send("created");

// });



router.post('/insert', (req, res) => {
        console.log("inside insert");

    return new Promise((resolve, reject) => {
        console.log("inside insert");
        CalibrationMaster_1.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})



router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/particular1/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({ where: {deleteStatus: false, id: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })      
})

// router.put('/update1/:id', (req, res) => { 
//     return new Promise((resolve, reject) => {
//         console.log(req.body);
//         console.log(req.param.id);
//         CalibrationMaster_1.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })  
// })

router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})



router.post('/update', (req, res) => {
    return new Promise((resolve, reject) => {
        oitm.findAll({
            attributes: ['ItemCode','ItemName'],
        }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {0
                sendError(res, err);
            });
        })  
   
})





router.get('/view-sapref', (req, res) => {
    return new Promise((resolve, reject) => {

        
        oitm.findAll({
           attributes: ['ItemCode','ItemName'],
        }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {0
                sendError(res, err);
            });
        })  
   
})


// router.get('/recalibration', (req, res) => {
//     return new Promise((resolve, reject) => {
//         CalibrationMaster_1.findAll({ where: {deleteStatus: false }  }).then(function (result) {
//                 sendSuccess(res, result);
//             }).catch(function (err) {
//                 sendError(res, err);
//             });
//         })  
   
// })


router.get('/saprefcodeitems/:data', (req, res) => {
    //console.log("00000     "+req.params.data);
    return new Promise((resolve, reject) => {

        
        oitm.findAll({
           attributes: ['ItemCode', 'ItemName', 'ItmsGrpCod', 'U_Branch'],where:{
            U_Branch:req.params.data,
            [Op.or]: [
                {
                    ItmsGrpCod: {
                    [Op.eq]: 131,
                  },
                }, {
                    ItmsGrpCod: {
                    [Op.eq]: 138,
                  },
                },
              ],
            },
            
           }
        ).then(function (result) {
             //console.log("sdts    "+result)
                sendSuccess(res, result);
            }).catch(function (err) {0
                sendError(res, err);
            });
        })  
   
});
   




// router.get('/download', function(req, res){   
//     CalibrationMaster_1.findAll(__dirname + '/upload-folder/dramaticpenguin.MOV', 'binary');
//     res.setHeader('Content-Length', file.length);
//     res.write(file, 'binary');
//     res.end();
//   });

app.post('/api/upload', multipartMiddleware, (req, res) => {
    res.json({
        'message': 'File uploaded successfully'
    });
});






// router.post("single", upload.single("image"),)(req,res=> {
//     return new Promise((resolve, reject) => {
//         CalibrationMaster_1.create(req.body).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             res.send("single file  uploaded");
//             sendError(res, err);
//         });
//     })


// const url = "url"
// router.get(url,function(res){
// const filestream = fs.createWriteStream("photo.png");
// res.pipe(filestream);
// filestream.on("finish",function(){
//     filestream.close();
//     console.log("done")

// }
// });



// router.get('/getFile',function(req,res,next){
//     res.download('./public/google.png',function(err){
//     if(err){
//     next(err);}
//     })
//     })
//     app.use(function(err,req,res,next){
//     res.status(err.status).send(err);
//     })
//     app.listen(3000,function(){
//     // console.log("Server listening on port 3000");
//     })


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))











router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})




router.get('/tablerecord1', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({
            where: { deleteStatus: false }, order: [
                ['id', 'DESC']

            ],
            limit: 1,
           
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

module.exports = router