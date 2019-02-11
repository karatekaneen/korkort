const SECRET = 'r0B1nA3rB4ezt'
const jwt = require('jsonwebtoken');
const { reject } = require('../handlers/rejector')


exports.checkAuth = async (req, res, next) => {
   // Funktion för att kolla så att allting står rätt till med inloggning
   try {

      // Checking if the token is signed with the correct key
      const decoded = jwt.verify(
         req.headers.auth,
         SECRET
      )

      // If the token was valid we save the user id locally:
      res.locals.auth = decoded
      console.log({ decoded })

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

      // Return token + user data
      res.header('Auth', token).send({ success: true, response: userData })
   } else {
      res.send({ success: false, response: 'No user data found' })
   }
}


exports.handleAdminLogin = async (req, res, next) => {

   // Check if details provided
   const { username, password } = req.body


   if (username && password) {
      if (username === 'admin' && password === 'admin') {

         // Generate token with userId
         const token = jwt.sign(
            {
               isAdmin: true
            },
            SECRET
         )

         console.log({ token })
         // Return token + user data
         res.header('Auth', token).send({ success: true, response: {} })
      } else {
         res.send({ success: false, response: 'Login failed' })
      }
   } else {
      res.send({ success: false, response: 'No credentials given' })
   }
}