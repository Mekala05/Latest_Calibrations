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
    console.log("req", req.files);
    // req.files.uploads[0].originalFilename
    // return res.json({
    //     'message': res
    // });
    return res.json({
        'message': req.files
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))