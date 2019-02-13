const { sanitize, dataIsComplete, parseImageData } = require('./dataFixer')
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
   console.log(JSON.stringify(req.files, null, 3))
   let formData = req.body
   delete formData.cookie



   try {
      // Check if the person is allowed to make an application. If not, reject it with 403.
      if (await conditionsFulfilled({ id: res.locals.auth.userId })) {

         // Sanitize user input to minimize risk of injection attacks:
         let cleanData = sanitize(formData)

         // Check if data is complete: 
         if (!dataIsComplete(cleanData)) {
            // TODO If the data is incomplete we should remove the images that got uploaded, if there were any. 
            const rejection = reject('insufficientData')
            res.status(rejection.status).send({
               success: false,
               response: rejection.message
            })
         }

         // Parse the image data:
         cleanData = await parseImageData({ formData: cleanData, fileData: req.files })

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