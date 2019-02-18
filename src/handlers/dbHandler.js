const applicationModel = require('../data/application.controller')
const licenseController = require('../data/license.controller')

exports.uploadApplication = async (formData, userId) => {
   /*
      This function receives an application that we know have all the information needed, 
      it's sanitized and ready to be saved in the db.
      Therefore it should:
      - Update the database for applications with the new status assigned to the application
      - If the application is approved it should update the database with driver's licenses 
         with the new data from the application and set new expiry date 10 years from now.
      - Return confirmation of that the process was a success
   */
   const objToSave = { ...formData, Status: 0, Korkortsnummer: userId }
   return {
      success: true,
      response: await applicationModel.create(objToSave)
   }
}

exports.fetchUser = async (userId) => {
   const result = await licenseController.read({ Korkortsnummer: userId })
   return result[0]
}

