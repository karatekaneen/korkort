const { updatePerson } = require('../data/fileHandler')

exports.uploadApplication = async (formData) => {
   console.log('fix database integration')
   const testForm = {
      Korkortsnummer: 67621,
      woop: 'POOOP'
   }
   return {
      success: true,
      response: await updatePerson(testForm)
   }
}

exports.fetchUser = (userId) => {
   /* 
   This SHOULD be a proper database connection but due to the limitations
   of the webserver at HV we use mock data and write to JSON file instead.
   */
   const data = require('../data/Personer.json')

   return userData = data.find(user => {
      return user.Korkortsnummer == userId
   })

}