const { updatePerson } = require('../data/fileHandler')

exports.uploadApplication = async (formData) => {
   /*
      This function receives an application that we know have all the information needed, 
      it's sanitized and ready to be saved in the db.
      Therefore it should:
      - Update the database for applications with the new status assigned to the application
      - If the application is approved it should update the database with driver's licenses 
         with the new data from the application and set new expiry date 10 years from now.
      - Return confirmation of that the process was a success
   */
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

   return data.find(user => {
      return user.Korkortsnummer == userId
   })

}