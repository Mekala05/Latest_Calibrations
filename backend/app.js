var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var path = require('path')
var config = require('./config')
var passport = require('passport');
const mv = require('express-fileupload');
var sequelize = require('sequelize');
// var nodemailer = require('nodemailer')
var http = require('http');
const multer = require('multer')
// var upload = multer({ storage: storage })

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(multer({dest:'./image'}).single('image'));

const aa = multer({ dest: './image' });

// app.post("/bbb",aa.single('image'),function(req,res){
//   console.log(req.file);
// })  




app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(errorHandler);
app.use(mv());

//app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(require('path').join(__dirname, 'uploads')));
app.use(express.static(require('path').join(__dirname, 'breakage')));
app.use(express.static(require('path').join(__dirname, 'entry')));


function errorHandler(err, req, res, next) {
  // if (!isProd)
  console.log(err);
  res.status(err.status || 500)
  res.json({
    success: false,
    message: err.message,
    // error: isProd ? err.name : err.stack
    error: err.name

  })
}


const localSignupStrategy = require('./middleware/passport/local-signup')
const localLoginStrategy = require('./middleware/passport/local-login')

passport.use('local-login', localLoginStrategy)
passport.use('local-signup', localSignupStrategy)

app.set('port', config.port)

app.use('/api', require('./routes'))

// app.get('/test',(req,res)=>{
// console.log("11111111");
// res.send({name:"test"});
// console.log("2222222");

// })

// var storage = multer.diskStorage({
//   destination: 'image/',
//   filename: function(req, file, callback) {
//     callback(null, file.originalname);
//   }
// });


// app.post('/single', upload.single('image'), function (req, res, next) {
//     console.log(req.file);
//     res.send("created");
// })

// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, 'uploads')
//   },
//   filename: (req, file, callBack) => {
//       callBack(null, `FunOfHeuristic_${file.originalname}`)
//   }
// })

// const upload = multer({ storage: storage })

// var upload = multer({ storage: storage, limits: {fileSize: 1000000}}); 

// app.post('/single', upload.single('image'), (req, res, next) => {
//   const file = req.file;
//   console.log(file);
//   if (!file) {
//     const error = new Error('No File')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send("Created",file);
// })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req);
    cb(null, './image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage })

app.post('/file', upload.single('image'), function (req, res, next) {
  console.log(req.file);
  //loadUserPage(req, res);
})

app.listen(app.get('port'), () => {
  console.log('Listening on port :' + app.get('port'));
  console.log("Test");
})
// var upload_test = require("./file_Upload");

// app.post("/image_upload",upload_test.uploadad),function(req,res){
//   console.log(req);
// }

// const multer = require('multer');
// const app = express();


//file upload


// // // const  express  =  require('express')
// // // const  app  =  express()
// // const  port  =  3000

// app.get('/api/upload', (req, res) => {
//     res.json({
//         'message': 'hello'
//     });
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/api/upload', (req, res) => {
  res.json({
    'message': 'hello'
  });
});

app.get('/api/breakage', (req, res) => {
  res.json({
    'message': 'hello'
  });
});
app.get('/api/entry', (req, res) => {
  res.json({
    'message': 'hello'
  });
});









// module.export = app;
module.export = { app, upload }