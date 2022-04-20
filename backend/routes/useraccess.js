const express = require('express');
const router = express.Router()
var env = require('../env');

const { useraccess, ohem, Olct, OUDP } = require('../models');

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


    return new Promise((resolve, reject) => {
        useraccess.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        useraccess.findAll({ where: { deleteStatus: false } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.get('/view/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        useraccess.findAll({ where: { deleteStatus: false, employeeid: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

router.put('/update/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        useraccess.update(req.body, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.put('/delete/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        useraccess.update({ deleteStatus: true }, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})



router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    return new Promise((resolve, reject) => {
        useraccess.destroy({ where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

var sql = require("mssql");


router.get('/viewuserData', function (req, res) {
    var selectQuery = "select a.empID,b.U_empName,c.Location'Location',d.Name'Department',a.dept 'DeptCode' from OHEM a left join [@INPR_OECI] b on a.empID=U_empID inner join OLCT c on c.code=b.U_Location left join OUDP d on b.u_dept=d.Code where c.code='1'";
    sql.connect(env.getConnection(), function (err) {
        var request = new sql.Request();
        request.query(selectQuery, function (err, data) {
            if (err) console.log(err);
            // console.log(data);
            res.send(data);
        })
    });
});


module.exports = router