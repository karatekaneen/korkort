const SECRET = 'r0B1nA3rB4ezt'
const jwt = require('jsonwebtoken');
const { reject } = require('../handlers/rejector')


exports.checkAuth = async (req, res, next) => {
   // Funktion för att kolla så att allting står rätt till med inloggning
   console.log(req.cookies)
   try {

      // Checking if the token is signed with the correct key
      const decoded = jwt.verify(
         req.cookies.auth,
         SECRET
      )

      // If the token was valid we save the user id locally:
      res.locals.auth = decoded

      next()

   } catch (err) {
      console.log(err)
      const rej = reject('unauthorized')
      res.status(rej.status).send(rej.message)
   }
}

exports.handleLogin = async (req, res, next) => {
   const { fetchUser } = require('../handlers/dbHandler')

   // Check if details provided
   const userId = req.body.userId


   // Fetch user
   const userData = fetchUser(userId)

   if (userData) {
      // Generate token with userId
      var token = jwt.sign({ userId }, SECRET);

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