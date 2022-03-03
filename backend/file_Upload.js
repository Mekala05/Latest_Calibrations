var multer = require('multer');

var storagead = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req);
        cb(null, './image')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadad = multer({ storage: storagead }).fields([{ name: "IMAGE", maxCount: 20 }]);


module.exports = {
    uploadad,
}