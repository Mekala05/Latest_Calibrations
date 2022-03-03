const express = require('express');
const router = express.Router()

// const { ReturnList } = require('../models');
// const IssueReturn = require('../models/IssueReturn');
const { IssueReturn } = require('../models');

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

router.get('/return', (req, res) => {
    return new Promise((resolve, reject) => {
        console.log('ddddr',req.body.InstrumentCode);
        IssueReturn.findAll({ where: {InstrumentCode: req.body,deleteStatus: false }  }).then(function (result) {
            sendSuccess(res, result);
            console.log(result);
        }).catch(function (err) {
            sendError(res, err);
        });
        // IssueReturn.create(req.body).then(function (result) {
        //     sendSuccess(res, result);
        // }).catch(function (err) {
        //     sendError(res, err);
        // });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        IssueReturn.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/data/:code', (req, res) => {
    return new Promise((resolve, reject) => {
        IssueReturn.findAll({ where: {deleteStatus: false, InstrumentCode: req.params.code }}).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/data/:code', (req, res) => {
    return new Promise((resolve, reject) => {
        IssueReturn.findAll({ where: {deleteStatus: false, InstrumentCode: req.params.code }}).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        IssueReturn.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

router.put('/delete/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        IssueReturn.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

module.exports = router