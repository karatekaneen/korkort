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


   let { formData, fileData } = input
   let clone = JSON.parse(JSON.stringify(formData))
   if (fileData.userPhoto.length > 0 && fileData.userSignature.length > 0) {
      try {
         clone.Portratt = base64Img.base64Sync(fileData.userPhoto[0].path)
         clone.Signatur = base64Img.base64Sync(fileData.userSignature[0].path)

      } catch (err) {
         console.log(err)
      }
   }
   console.log({ clone })
   return clone
}
