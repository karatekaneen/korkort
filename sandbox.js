const licenseController = require('./src/data/license.controller')

exports.createLicense = async (req, res, next) => {
   console.log(req.body)
   const resp = await licenseController.create(req.body)
   res.send(resp)
}


const d = new Date()

console.log(d.toGMTString())