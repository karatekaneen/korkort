exports.conditionsFulfilled = (input) => {
   /* Method to check if the person DOES have a drivers' licence in the first place and 
   DOES NOT have an application waiting for review.
   */
   const licenses = require('../data/Personer.json')
   const applications = require('../data/Ansokningar.json')

   // Check that the person HAVE a driver's license
   const personIndex = licenses.filter(license => {
      return license.Korkortsnummer == input.id
   })
   const hasLicense = (personIndex.length === 1)

   // Checks that person DOES NOT already have application pending:
   const applicationIndex = applications.filter(application => {
      return (application.Korkortsnummer == input.id && (application.Status == 0))
   })
   const canApply = (applicationIndex.length === 0)
   const conditionFulfilled = (canApply && hasLicense)
   return conditionFulfilled
}