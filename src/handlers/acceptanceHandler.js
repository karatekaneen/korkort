const licenseController = require('../data/license.controller')
const applicationController = require('../data/application.controller')


exports.acceptedLicense = async (application) => {
   try {
      // Fetch the existing license:
      const existingLicense = (await licenseController.read({ Korkortsnummer: application.Korkortsnummer }))[0]
      const grantedApplication = (await applicationController.read({ _id: application.id }))[0]

      // merge the existing objects:
      let updatedLicense = merge(existingLicense, grantedApplication)


      const today = new Date()
      today.setFullYear(today.getFullYear() + 10)
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

const merge = (license, application) => {
   let clone = JSON.parse(JSON.stringify(license))
   clone.Namn = application.Namn
   clone.Efternamn = application.Efternamn
   clone.Email = application.Email
   clone.Portratt = application.Portratt
   clone.Signatur = application.Signatur
   clone.Korkortsnummer = application.Korkortsnummer


   return clone
}