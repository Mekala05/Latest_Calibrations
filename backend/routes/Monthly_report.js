const express = require('express');
const router = express.Router();
const config = require('../startup/index');
var Sequelize = require('sequelize');
var sql = require("mssql");

const { CalibrationMaster_1,CalibrationRequest,Monthly_report,monthly_shedule } = require('../models');


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

// router.post('/insert', (req, res) => {
//     return new Promise((resolve, reject) => {
//         TypeMaster.create(req.body).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })

// router.get('/view', (req, res) => {
//     return new Promise((resolve, reject) => {
//         CalibrationMaster_1.findAll({ where: { deleteStatus: false } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })

// })
router.get('/lastpart', (req, res) => {
        return new Promise((resolve, reject) => {
            CalibrationRequest.findAll({ where: { CardType:'S' } }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })
    
})

router.get('/filter', (req, res) => {
    return new Promise((resolve, reject) => {
        var month = req.query.month;
        var year = req.query.year;
        // var Schedule = req.query.Schedule;
        console.log("yeariii" + year);
        console.log("monthiii" + month);
        CalibrationMaster_1.findAll({
            where: {
                Year: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
                Month: Sequelize.where(Sequelize.fn('month', Sequelize.col('date')), month),
                
            }
        }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('/SheduleNo', (req, res) => {
    return new Promise((resolve, reject) => {
        Monthly_report.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        Monthly_report.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})



router.post('/insert', (req, res) => {
    return new Promise((resolve, reject) => {
        Monthly_report.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})






// router.post('/insert', (req, res) => {

//     return new Promise((resolve, reject) => {
//         monthly_shedule.create(req.body).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })
// })





// router.put('/update/:id', (req, res) => { 
//     return new Promise((resolve, reject) => {
//         TypeMaster.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })  
// })

// router.put('/delete/:id', (req, res) => { 
//     return new Promise((resolve, reject) => {
//         TypeMaster.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })  
// })

router.get('/sheduleNum', (req, res) => {
    return new Promise((resolve, reject) => {
        monthly_shedule .findAll({
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

module.exports = router