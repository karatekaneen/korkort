const { sanitize, dataIsComplete, parseImageData, parseDates } = require('./dataFixer')
const { reject } = require('./rejector')
const { conditionsFulfilled } = require('./rightsChecker')
const { uploadApplication } = require('./dbHandler')
const { fetchUser } = require('./dbHandler')



exports.getApplication = async (req, res, next) => {
   /*
   Endpoint to show the old application data before the new application is made.
   */
   try {
      // Fetch the old application data and return it:
      const applicationData = fetchUser(res.locals.auth.userId)
      res.send({ success: true, response: applicationData })
   } catch (err) {
      console.log(err)
      const rejection = reject('unknown')
      res.status(rejection.status).send({
         success: false,
         response: rejection.message
      })
   }
}

exports.postApplication = async (req, res, next) => {
   /*
   Main function for handle applications.
   It should reveive the form-data from the frontend and do the following:
   x Check if the person is allowed to make an application in the first place
   x Sanitize the data to minimize risk of injection attacks
   x Convert the image data (if needed) to the correct format to store in the database
   x Standardize all dates to make sure they are following the database standards
   - Upload the application to database
   - Notify the user of errors or that the process was a success
   */

   console.log('Needed:')
   console.log({
      Namn: 'Kalle',
      Efternamn: 'Anka',
      Korkortsnummer: 19890203 - 1234,
      Ansokan_ID: 54,
      Email: 'Kalle@ankeborg.com',
      Status: 0,
      Portratt: '*BILD*',
      Signatur: '*BILD*'
   })
   console.log('Received:')
   console.log(JSON.stringify(req.body, null, 3))



   const formData = {
      "Ansokan_ID": 1,
      "Korkortsnummer": 249625,
      "Namn": "Palmer",
      "Efternamn": "McGrey",
      "Email": "pmcgrey0@com.com",
      "Status": 1,
      "Portratt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVDjLlZNbSBRRGMe/2XRWZ2/D7G4sSuYaKVurhMZaIRbm6iaGERSSbz0EPfTSQ4j0ZNRLQq8WPaQgPfQaIWmUJWwrSYolkW2ul7S0Rrbcy+zM7vQ/EovJ2uXAj/+c833nu5xzhtN1nXKN+h6Jc1Sqma/fhPHn574cpG2GYTuDt9quHbe0U0vRiZrqXvHZfwXoHqnTfaZWg8ceII90jPy7mo5W9Vjv5fLltrZwa6RJLzbVkstWQys/FiiakEng7TQ6N0iD7x4vhK+mSjb7522NmFb56PRqKF+OyYLbcQQlFtCT8H0aW5ygHUTiX1uYX75WL690C/PRScwyZDDoNCtPU1vlKB0ueGBpvXy76o8BTpUmu1x5CpGWT6Rn0CMrk6fIdIQcXJwaSjMXfjuDqampXk3T6gGpqsqDMq/Xy918eoaUtEJriSjF1QQdiHcmTjYcKhweHo6nUqk5RVEIumrARs3pdHoQzIOFKzzPc8Fg8GWj2EW1+qX209IN8lPn2d0OoXBoaOiuyWQSksnk9YqKCg+ClHGhUGgPx3EfYrFYMQLIYB9YgnEnywTc+I5Ai6CfoS6wZjQal2RZfmTw+Xzh9fX176jgExxaYBhHBr8gCJPQgNlsfg1thr6FPWCz2Zg2ut1u1sKLjXcwiIHJeRhYBeXQZWgJ9COrAMyyOWDrTpyTDCLovm3jFpDhzqYKJlkGq9X6imUURZFVFJAkaQLzJugbBGlGgCUwln2J/f39KgwWOJWy04WWQ2fAXvAezm6wCFzIvB9c7Ovrq8u+RGzIAwk4068ryoJNWdh149ApnU4/zPkv/Mvo6OjgmQ4MDKR+Apt6owU5Oz7IAAAAAElFTkSuQmCC",
      "Signatur": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVDjLfZKxa5NBGMZ/35dEamtFMkgGpaAVQcTRLp1LoYubi6MOgqiTZOrQxYKjOIh/gIuim5YqdChKl4KbQ0XESoPYaGq+fHff3fu+DklM2lRfeLg7uOd3z929iZnRL7l9y7hwkbi6isWIiaAhoL2xMj+PvVlj4u1K0veUGaphkw0ZNcbuOkasCMOWA4AQsRhR79EYu6AY/87LhwDSfYAiYN7D1BTiPeo94j3iHMn0NNrJsaL4T4IiLNH+sFhZ2KFy9Qcc8aga0knR3S/oWrO751+A8p332+bSNmfuHmP8PEZKqjlJaKF7HynGHrZ1wW0Pe5L+L8R3p2YwXjL9qGal42hsQvyNSYaJgyQBCbQ36w0puFK7Zhv73sAk1Dl9r2blE1j8BZJj4nrKUP8d04yxczdrYY/6yBU0FrOliUtY3MPU9eR7cph20PCTdPwkIWN25BdUpWppGdMc1PfkBhIH0gYLxILqKEAULIIWg+j902WQCPPE4pA+0ChNCy3MwoHobgBBkaJDyGmOAoJbl90NkqS0P770Rguk6VHyna90WqyPAMSx3N6831C3C6UxzCImvSQoSXmS6BI+PX/VyDOWR/oAYOdxckMCS5OXr9cq1bOQGBYzpGiRfdti6+nrRp6xOPfMnhwKAPj8IJkpWtSjY1Yi1eDBdWi6jHURludedBuoX38Av56vLTwJJBoAAAAASUVORK5CYII="
   }
   try {
      // Check if the person is allowed to make an application. If not, reject it with 403.
      if (await conditionsFulfilled({ id: 12345 })) { //{ id: res.locals.auth.userId })) {

         // Sanitize user input to minimize risk of injection attacks:
         let cleanData = sanitize(formData)

         // Check if data is complete: 
         if (!dataIsComplete(cleanData)) {
            const rejection = reject('insufficientData')
            res.status(rejection.status).send({
               success: false,
               response: rejection.message
            })
         }

         // Parse the image data:
         cleanData = parseImageData(cleanData)

         // Upload to database
         const resp = await uploadApplication(cleanData)

         res.send(resp)


      } else {
         const rejection = reject('notAllowed')
         res.status(rejection.status).send({
            success: false,
            response: rejection.message
         })
      }

   } catch (err) {
      console.log(err)
      const rejection = reject('unknown')
      res.status(rejection.status).send({
         success: false,
         response: rejection.message
      })
   }
}