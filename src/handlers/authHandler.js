exports.checkAuth = async (req, res, next) => {
   // Funktion för att kolla så att allting står rätt till med inloggning
   // TODO Fixa så att den faktiskt gör något
   console.log('auth success')

   next()
}

exports.handleLogin = async (req, res, next) => {
   const { fetchUser } = require('./dbHandler')
   const jwt = require('jsonwebtoken');

   // Check if details provided
   const userId = req.body.userId


   // Fetch user
   const userData = fetchUser(userId)

   if (userData) {
      // Generate token with userId
      var token = jwt.sign({ userId }, 'r0B1nA3rB4ezt');

      // Add cookie to save session:
      res.cookie(
         'auth',
         token,
         {
            httpOnly: true,
            maxAge: 3600000 // One hour expiry
         }
      )

      // Return token + user data
      res.send({ success: true, response: userData })
   } else {
      res.send({ success: false, response: 'No user data found' })
   }
}