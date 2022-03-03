const express = require('express');
const router = express.Router()

const { BreakageRequest ,OCRD, OMAC} = require('../models');
// const OCRD = require('../models/OCRD');


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
        BreakageRequest.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/Breakageno', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest.findAll({ where: {deleteStatus: false, id: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/particularidvalue/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest.findAll({ where: {deleteStatus: false, id: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        BreakageRequest.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})




router.get('/viewData', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest .findAll({
            where: { deleteStatus: false }, order: [
                ['id', 'DESC']

            ],
            limit: 1,
            attributes: ['id']
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})



router.get('/viewData2', (req, res) => {
    return new Promise((resolve, reject) => {
        BreakageRequest .findAll({
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





router.get('/viewU_ToolNo', (req, res) => {
    return new Promise((resolve, reject) => {
        OMAC.findAll({
            attributes: ['U_ToolNo'],
        }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        BreakageRequest.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})




module.exports = router