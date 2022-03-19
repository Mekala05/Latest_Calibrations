const express = require('express');
const router = express.Router()

const { CalibrationEntry } = require('../models');


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
    console.log(req.body);
    return new Promise((resolve, reject) => {
        CalibrationEntry.create(req.body).then(function (result) {
            //console.log(req.body);
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntry.findAll({ where: {deleteStatus: false }  }).then(function (result) {
            console.log(res)    
            sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntry.findAll({ where: {deleteStatus: false, id: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationEntry.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})


router.get('/approval', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntry.findAll({ where: { deleteStatus: false,  InstrumentCode : req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})


router.get('/BreakageNo', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntry.findAll({ where: { deleteStatus: false,  InstrumentCode : req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})




router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        CalibrationEntry.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        CalibrationEntry.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.get('/tabledata1', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationEntry.findAll({
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