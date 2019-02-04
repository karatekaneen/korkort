// Hämta personID från en ansökan för att hitta gamla data från personen för jämföran
// Skapa en lista på ansökan och ta första ID i kön?
exports.idLookUp = async () => {
   console.log('Search the database for person ID')

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
   console.log('Retrieve old userdata from the database')

   // Tillfällig data
   const oldUserData = { // Req input
      name: 'Varg Vikernes',
      birthDate: 197011124692,
      image: 'aske59vmsiegnosf0232gdfaf3fafggdsxxcz',
      signature: 'mgla015713bnvmn8fah0feaiofjea0n'
   }
   return oldUserData
}

// Hämta den nya data som finns i databasen med personID och returnera data
retrieveNewData = async () => {
   console.log('Retrieve new userdata from the database')
   const applications = [ // TODO Fix mock data for this one
      {
         Korkortsnummer: 123456,
         status: 0,
         Bild: '',
         Signatur: ''
      },
      {
         Korkortsnummer: 234567,
         status: 1,
         Bild: '',
         Signatur: ''
      },
      {
         Korkortsnummer: 345678,
         status: 0,
         Bild: '',
         Signatur: ''
      }
   ]
   // Basically mocking: 'SELECT * FROM ansokan WHERE status = 0 LIMIT 1'
   return firstApplication = applications.find(application => { return application.status === 0 })
}
