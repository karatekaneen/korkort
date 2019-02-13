const xss = require("xss");

exports.sanitize = (formData) => {

   // clone the object:
   let clone = JSON.parse(JSON.stringify(formData))

   // Get the keys of the form:
   const keys = Object.keys(clone)

   for (key of keys) {
      clone[key] = xss(clone[key])
   }


   return formData
}

exports.dataIsComplete = (formData) => {
   /*
   Method to check if the sanitized formdata is fulfilling the requirements
   */
   console.log('do not forget to fix dataIsComplete')

   return true
}

exports.parseImageData = (input) => {
   const base64Img = require('base64-img');
   const fs = require('mz/fs');


   let { formData, fileData } = input
   let clone = JSON.parse(JSON.stringify(formData))
   if (clone.hasOwnProperty('userSignature') && clone.hasOwnProperty('userPhoto')) {
      try {
         clone.Portratt = base64Img.base64Sync(fileData.userPhoto[0].path)
         clone.Signatur = base64Img.base64Sync(fileData.userSignature[0].path)

         fs.unlink(fileData.userPhoto[0].path, (err) => {
            if (err) throw err
            console.log('userPhoto deleted')
         })

         fs.unlink(fileData.userSignature[0].path, (err) => {
            if (err) throw err
            console.log('FuserSignatureile deleted')
         })
      } catch (err) {
         console.log(err)
      }
   }
   return clone
}
