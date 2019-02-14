const licenses = require('../data/Personer.json')
const { updateApplication, updatePerson } = require('../data/fileHandler')
const { fetchUser } = require('../handlers/dbHandler')



exports.acceptedLicense = async (application) => {
   console.log({ accepted: application })
   try {
      // Fetch the existing license:
      const existingLicense = await fetchUser(application.Korkortsnummer)

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
      const personResp = await updatePerson(updatedLicense)

      // Update the application object:
      let updatedApplication = application
      updatedApplication.Status = 2
      const applicationResp = await updateApplication(updatedApplication)

      return {
         success: true,
         response: 'Ansökan godkänd, körkort uppdaterat'
      }

   } catch (err) {
      console.log(err)
   }
}

exports.rejectedLicense = async (application, adminDecision) => {
   console.log({ rejected: application })
   let updatedApplication = application
   updatedApplication.Status = adminDecision
   const applicationResp = await updateApplication(updatedApplication)
   return {
      success: true,
      response: 'Ansökan nekad'
   }
}
