const express = require('express');
const router = express.Router()

const { CalibrationLocationMaster, odep } = require('../models');
const { Olct } = require('../models');
// const Oudp = require('../models/Oudp');



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
        "count": Number(result) + 1,
        "data": result
    };
    return res.json(finalResult);
}

router.post('/insert', (req, res) => {
    console.log("122" + res);
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.create(req.body).then(function (result) {
            //console.log(result);
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/viewolct', (req, res) => {
    return new Promise((resolve, reject) => {
        Olct.findAll({
            attributes: ['code', 'Location', 'U_BranchName', 'U_Branch'],
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.findAll({ where: { deleteStatus: false, id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.findAll({ where: { deleteStatus: false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})



router.put('/update/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.update(req.body, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.put('/delete/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.update({ deleteStatus: true }, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/viewData', (req, res) => {
    return new Promise((resolve, reject) => {
        odep.findAll({
            attributes: ['Name'],
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })



})

router.get('/viewDataname', (req, res) => {
    return new Promise((resolve, reject) => { //models.Olct 
        odep.findAll({
            include: [{
                model: Olct // will create a left join
            }]
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

// _subscriptionModel.findAll({
//     where: {
//         start_date: {
//             _lte: today // Get all subscriptions where start_date <= today
//         }
//     },
//     limit,
//     include: [
//         {
//             model: _planAllocationModel
//         }
//     ]
// });



router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        CalibrationLocationMaster.destroy({ where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})



module.exports = router