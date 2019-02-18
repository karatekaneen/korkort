exports.conditionsFulfilled = async (input) => {
   /* Method to check if the person DOES have a drivers' licence in the first place and 
   DOES NOT have an application waiting for review.
   */
   const applicationController = require('../data/application.controller')
   const licenseController = require('../data/license.controller')

   // Check that the person HAVE a driver's license
   const personIndex = await licenseController.read({
      Korkortsnummer: input.id
   })

   const hasLicense = (personIndex.length === 1)

   // Checks that person DOES NOT already have application pending:

   const applicationIndex = await applicationController.read({
      Korkortsnummer: input.id
   })


   const canApply = (applicationIndex.length === 0)
   const conditionFulfilled = (canApply && hasLicense)
   return conditionFulfilled
}