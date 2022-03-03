const express = require('express');
const router = express.Router()

const { CalibrationMaster_1 ,CalibrationMasterList,CalibrationLocationMaster} = require('../models');



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

// router.get('/return', (req, res) => {
//     return new Promise((resolve, reject) => {
//         console.log('ddddr',req.body.InstrumentCode);
//         calibrationmaster.findAll({ where: {id: req.body,deleteStatus: false } }).then(function (result) {
//             sendSuccess(res, result);
//             console.log(result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
       
//     })
// })


router.get('/return', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({ where: { deleteStatus: false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('calibrationlist', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMaster_1.findAll({ where: {deleteStatus: false, InstrumentCode: req.params.code }}).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})







router.get('/dpmt', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.findAll({ where: { deleteStatus: false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})



router.post('/insert', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationMasterList.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationMasterList.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationMasterList.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})



router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        CalibrationMasterList.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})




module.exports = router