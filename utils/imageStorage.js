const path = require('path')
const multer = require('multer')

//@desc storage for single image file
const singleFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "photo_" + req.params.id + path.extname(file.originalname))
  },
})



module.exports.singleFileStorage = singleFileStorage