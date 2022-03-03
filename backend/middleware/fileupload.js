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

router.post("/single", upload.single("image"),)(req,res=> {
    console.log(req.file);
    res.send("created");
 
 });

// app.get("/",(req,res)=>{
//   res.sendfile(path.join(__dirname,"calibrationmaster.component.html"))
// });


const uploadad = multer({ storage: storagead });

// app.listen(3000)
module.exports = {
    uploadad,
}