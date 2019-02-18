const fs = require('mz/fs')

exports.cleanUpFiles = async (files) => {
   const keys = Object.keys(files)

   for (const key of keys) {
      const img = files[key]
      const path = img[0].path.split('\\').join('/')
      fs.unlink(path, (err) => {
         if (err) {
            throw err
         }
      })
   }
}