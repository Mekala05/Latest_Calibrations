const express = require('express');
const router = express.Router()

const { InstrumentMaster ,CategoryMaster, TypeMaster} = require('../models');


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
    return new Promise( async(resolve, reject) => {
        InstrumentMaster.count().then(async function (Count) {
            req.body.code = req.body.shortName+'10000'+Count;
            await InstrumentMaster.create(req.body).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        }).catch(function (err) {
            sendError(res, err);
        });
       
    })
})



router.get('/view', (req, res) => {
  
    return new Promise((resolve, reject) => {
        InstrumentMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
                // console.log(res);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        InstrumentMaster.findAll({ where: {deleteStatus: false, id: req.params.id },  include:[CategoryMaster, TypeMaster]   }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        InstrumentMaster.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        InstrumentMaster.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})


router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        InstrumentMaster.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

module.exports = router