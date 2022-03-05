const path = require("path");
const router = express.Router();
var multer = require('multer');
const { appendFile } = require("fs");

var storagead = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './image')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "--"+file.originalname);
    },
});

var upload = multer({ storage: storage }).single('userPhoto');

router.post("/single", async(req,res) => {
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
        } else {
            var Filename = req.file.Filename;
            res.status(200).send(Filename);
        }
    })
})

// router.post("/single", upload.single("image"),)(req,res=> {
//     console.log(req.file);
//     res.send("created");
 
//  });

// app.get("/",(req,res)=>{
//   res.sendfile(path.join(__dirname,"calibrationmaster.component.html"))
// });


const uploadad = multer({ storage: storagead });

// app.listen(3000)
module.exports = {
    uploadad,
}