const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express()
const port = 3001
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: '../uploads'
});

const { ImageAttachment } = require('../models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        'message': 'hello'
    });
});

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


app.post('/header/upload', multipartMiddleware, (req, res) => {
    // form.append('file', fileStream, req)
    // console.log("form", form);
    console.log("req", req.body);
    // req.files.uploads[0].originalFilename
    // return req.files.uploads

    return res.json({
        'message': req.files
    });
    // return res;
    // return req.body.bb;
});

app.post('/attachment/upload', multipartMiddleware, (req, res) => {
    // console.log("req", req.files);
    // req.files.uploads[0].originalFilename
    // return res.json({
    //     'message': res
    // });
    // console.log('req.body', req.body);
    // console.log('req.param', req.param);
    // console.log(req);
    // console.log('body', req.body.instrumentCode);
    // console.log('param', req.param.filename);
    // console.log('instr', req.params.instrumentCode);

    // return new Promise((resolve, reject) => {
    //     ImageAttachment.create(req.body).then(function (result) {
    //         sendSuccess(res, result);
    //     }).catch(function (err) {
    //         sendError(res, err);
    //     });
    // })
    return res.json({
        'message': req.files
    });
});

app.post('/attachment/insert', multipartMiddleware, (req, res) => {
    return new Promise((resolve, reject) => {
        ImageAttachment.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
    // return res.json({
    //     'message': req.files
    // });
});

app.get('/attachment/view/:instrumentCode', (req, res) => {
    return new Promise((resolve, reject) => {
        ImageAttachment.findAll({ where: { deleteStatus: false, ids: req.params.instrumentCode, active: true } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })

})

app.put('/attachment/update/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        ImageAttachment.update(req.body, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))