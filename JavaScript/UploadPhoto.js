const path=require('path');
const multer= require ('multer');

var storate=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Pictures/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

var upload=multer({ storage: storate ,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
        )
        {
            callback(null, true);
        }
        else{
            console.log('only jpg& png');
            callback(null, false);
        }

    },
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    }
});
module.exports=upload;
