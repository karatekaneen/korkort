const multer = require('multer')

// TODO Add file type filters
const storage = (dateTag) => {
   const outputStorage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, `./uploads/${file.fieldname}`);
      },
      filename: function (req, file, cb) {
         const name = `${file.fieldname}-${dateTag}.png`
         cb(null, name);
      }
   })
   return outputStorage
}
//const upload = multer({ storage : storage }).array('fileToUpload', 2);
exports.upload = multer({ storage: storage(Date.now()) })
   .fields([{
      name: 'userPhoto',
      maxCount: 1
   }, {
      name: 'userSignature',
      maxCount: 1
   }
   ])