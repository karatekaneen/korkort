exports.uploadApplication = (formData) => {
   console.log('fix database integration')
   return {
      success: true,
      response: 'OH HAPPY DAY'
   }
}

exports.fetchUser = (userId) => {
   /* 
   This SHOULD be a proper database connection but due to the limitations
   of the webserver at HV we use mock data and write to JSON file instead.
   */
   const data = require('../data/mock.json')

   return userData = data.find(user => {
      return user.Korkortsnummer == userId
   })

}