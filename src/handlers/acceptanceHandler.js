const licenses = require('../data/Personer.json')
const { updateApplication, updatePerson } = require('../data/fileHandler')
const { fetchUser } = require('../handlers/dbHandler')



exports.acceptedLicense = async (application) => {
   try {
      // Fetch the existing license:
      const existingLicense = await fetchUser(application.Korkortsnummer)

      // merge the existing objects:
      let updatedLicense = { ...existingLicense, ...application }

      const today = new Date()
      // Add expiry date in 10 yrs:
      const newExpiryDate = today.setFullYear(today.getFullYear + 10)

      // Apply expiry date to new license:
      updatedLicense.UpphorGalla = newExpiryDate

      // Update the person's license: 
      const personResp = await updatePerson(updatedLicense)

      // Update the application object:
      const applicationResp = await updateApplication(application)

      return {
         success: true,
         response: 'Ansökan godkänd, körkort uppdaterat'
      }

   } catch (err) {
      console.log(err)
   }
}

exports.rejectedLicense = async (application) => {
   const applicationResp = await updateApplication(application)
   return {
      success: true,
      response: 'Ansökan nekad'
   }
}
