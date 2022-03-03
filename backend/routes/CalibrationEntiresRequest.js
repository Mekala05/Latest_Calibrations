const express = require('express');
const router = express.Router()

const { CalibrationEntiresRequest ,OCRD} = require('../models');
// const OCRD = require('../models/OCRD.JS');


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

router.post('/insert', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.findAll({ where: {deleteStatus: false, id: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})


router.get('/viewCardName', (req, res) => {
    return new Promise((resolve, reject) => {
        OCRD.findAll({
            attributes: ['CardName'],
        }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/reservice', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})



router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        CalibrationEntiresRequest.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})






module.exports = router