
exports.showUsers = async (req, res) => {
   const licenseController = require('../data/license.controller')
   res.send((await licenseController.readAll()).map(license => {
      return license.Korkortsnummer
   }))
}
