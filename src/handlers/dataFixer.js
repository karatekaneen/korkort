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
    const {formData, fileData} = input
    formData.Portratt = fileData.userPhoto[0].path
    formData.Signatur = fileData.userSignature[0].path
   let clone = JSON.parse(JSON.stringify(formData))
   console.log('fix the imageparser')

   return clone
}
