const express = require('express');
const router = express.Router()

const { TypeMaster, CategoryMaster, GaugesMaster } = require('../models');


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
    return new Promise(async (resolve, reject) => {
        GaugesMaster.count().then(async function (Count) {
            req.body.code = 'G' + req.body.shortName + '000' + Count;
            await GaugesMaster.create(req.body).then(function (result) {
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
        GaugesMaster.findAll({ where: { deleteStatus: false }, include: [CategoryMaster, TypeMaster] }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        GaugesMaster.findAll({ where: { deleteStatus: false, id: req.params.id }, include: [CategoryMaster, TypeMaster] }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.put('/update/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        GaugesMaster.update(req.body, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.put('/delete/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        GaugesMaster.update({ deleteStatus: true }, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


// router.put('/:id/delete', function(req, res, next){
//     GaugesMaster.delete({where: {id: req.params.id}}).then(function(result){
//       return result.destroy();
//     }).then(function(){
//       res.redirect('/result/');  
//     })
//   });



router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        GaugesMaster.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})


module.exports = router