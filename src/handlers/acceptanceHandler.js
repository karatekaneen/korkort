const licenseController = require('../data/license.controller')
const applicationController = require('../data/application.controller')


exports.acceptedLicense = async (application) => {
   try {
      // Fetch the existing license:
      const existingLicense = await licenseController.read({ Korkortsnummer: application.Korkortsnummer })

      // merge the existing objects:
      let updatedLicense = { ...existingLicense, ...application }

      const today = new Date()
      today.setFullYear(today.getFullYear + 10)
      // Add expiry date in 10 yrs:

      // Apply expiry date to new license:
      updatedLicense.UpphorGalla = today
      delete updatedLicense.Status
      delete updatedLicense.Ansokan_ID

      // Update the person's license: 
      const personResp = await licenseController.update(updatedLicense)

      // Update the application object:
      let updatedApplication = application
      updatedApplication.Status = 2
      const applicationResp = await applicationController.update(updatedApplication)

      return {
         success: true,
         response: 'Ansökan godkänd, körkort uppdaterat'
      }

   } catch (err) {
      console.log(err)
   }
}

exports.rejectedLicense = async (application, adminDecision) => {
   let updatedApplication = application
   updatedApplication.Status = adminDecision
   const applicationResp = await applicationController.update(updatedApplication)
   return {
      success: true,
      response: 'Ansökan nekad'
   }
}
