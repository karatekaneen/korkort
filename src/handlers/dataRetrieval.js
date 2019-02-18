// Hämta personID från en ansökan för att hitta gamla data från personen för jämföran
// Skapa en lista på ansökan och ta första ID i kön?
const applicationController = require('../data/application.controller')
const licenseController = require('../data/license.controller')

exports.getQueue = async () => {
   // Get the number of applications in queue: 
   const queue = await applicationController.readAll()
   return queue.length
}

exports.idLookUp = async () => {

   // Check for next application in queue
   const newUserData = await retrieveNewData()
   // If we have an application
   if (newUserData) {
      // Fetch the old data for that person:
      return {
         oldUserData: await retrieveOldData(newUserData.Korkortsnummer),
         newUserData
      }
   } else {
      // If no application are in queue
      return { oldUserData: 'No application in queueue', newUserData: 'No application in quueue' }
   }
}

// Hämta den gamla data som finns i databasen med personID och returnera data
retrieveOldData = async (personId) => {
   // Fetching the existing drivers' license: 
   return await licenseController.read({ Korkortsnummer: personId })
}

// Hämta den första ansökningen i kön:
retrieveNewData = async () => {
   // Basically mocking: 'SELECT * FROM ansokan WHERE status = 0 LIMIT 1'
   return (await applicationController.getNext())[0]
}
