const multer = require('multer')
const { singleFileStorage } = require('../utils/imageStorage')


function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image')) {
    cb('not a image type file', false);
  } else {
    cb(null, true);
  }
}

const singleUpload = multer(
  {
    storage: singleFileStorage,
    limits: {
      files: 1, // allow up to 5 files per request,
      fileSize: process.env.MAX_IMAGE_SIZE * 1024 * 1024  // 2 MB (max file size)
    },
    fileFilter: fileFilter
  }
).single('file')





function mySingleUpload(req, res, next) {
  singleUpload(req, res, function (err) {
    console.log(req.file)
    if (!req.file && !err) {
      return res.status(400).send({ success: false, code: 400, message: 'please add a image file' })
    }
    if (err) {
      console.log(err)
      return res.status(400).send({
        success: false,
        code: 400,
        maxSize: `${process.env.MAX_IMAGE_SIZE}MB`,
        message: err.message || err
      })
    }
    next();
  })
}


module.exports.mySingleUpload = mySingleUpload