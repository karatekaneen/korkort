const License = require('./license.model')

exports.create = async (inLicense) => {

   // Create new object:
   let license = new License(inLicense)

   // Save to db
   await license.save((err, license) => {

      // if error, return it
      if (err) {

         return err
      }

      // else return true 
      return license
   })
   return true
}

exports.readAll = async () => {
   return await License.find()
}

exports.read = async (filter) => {
   // Filter is expected to have a property and a value ie. {Namn: 'Anna'}
   return await License.find(filter)
}



exports.update = async (newLicense) => {
   // Called with a new license that's granted, finds the old license and updates it. Find the old one by the ID and updates it:
   License.findOne({ Korkortsnummer: newLicense.Korkortsnummer }, (err, license) => {
      license = { ...license, ...newLicense }

      license.save((err) => {
         if (err) return next(err)
      })
   })
}

exports.delete = async (id) => {
   return await License.findByIdAndDelete(id)
}
