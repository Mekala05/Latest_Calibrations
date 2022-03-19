const express = require('express');
const router = express.Router()

const { RaiseDC,CalibrationEntiresRequest} = require('../models');

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
        // console.log(req.body);
        RaiseDC.create(req.body).then(function (result) {
            sendSuccess(res, result);
            // CalibrationEntiresRequest.destroy( { where: { id: req.body.id  } })
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        RaiseDC.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

module.exports = router