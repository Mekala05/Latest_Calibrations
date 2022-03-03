const express = require('express');
const router = express.Router()

const { TypeMaster,CategoryMaster,EquipmentMaster } = require('../models');


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
        EquipmentMaster.count().then(async function (Count) {
            req.body.code = 'E'+req.body.shortName+'000'+Count;
            await EquipmentMaster.create(req.body).then(function (result) {
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
        EquipmentMaster.findAll({ where: {deleteStatus: false }, include:[CategoryMaster, TypeMaster]    }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        EquipmentMaster.findAll({ where: {deleteStatus: false, id: req.params.id } , include:[CategoryMaster, TypeMaster]  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.put('/update/:id', (req, res) => { 
    return new Promise((resolve, reject) => {
        EquipmentMaster.update(req.body, { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})

// router.put('/delete/:id', (req, res) => { 
//     return new Promise((resolve, reject) => {
//         EquipmentMaster.update({deleteStatus: true}, { where: { id: req.params.id  } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })  
// })



// router.put('/delete/:id', (req, res) => { 
//     return new Promise((resolve, reject) => {
//         EquipmentMaster.destory( { where: { id: req.params.id  } }).then(function (result) {
//             sendSuccess(res, result);
//         }).catch(function (err) {
//             sendError(res, err);
//         });
//     })  
// })

router.delete('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        EquipmentMaster.destroy( { where: { id: req.params.id  } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })  
})



module.exports = router