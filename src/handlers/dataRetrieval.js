// Hämta personID från en ansökan för att hitta gamla data från personen för jämföran
// Skapa en lista på ansökan och ta första ID i kön?
exports.idLookUp = () => {
   console.log('Search the database for person ID')
   /*
   TODO:
   - Hämta första ansökan i kö som inte är behandlad.
   - Hämta den personens befintliga körkort
   'SELECT * FROM ansokan WHERE status = 0 LIMIT 1'
   */
   const oldUserData = retrieveOldData()
   const newUserData = retrieveNewData(oldUserData.Korkortsnummer)
   return { oldUserData, newUserData }
}

// Hämta den gamla data som finns i databasen med personID och returnera data
retrieveOldData = () => {
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
retrieveNewData = (personId) => {
   console.log('Retrieve new userdata from the database')

   //Tillfällig data
   newUserData = { // Req input
      name: 'Varg Vikernes',
      birthDate: 197011124692,
      image: 'aske59vmsiegnosf0232gdfaf3fafggdsxxcz',
      signature: 'mgla015713bnvmn8fah0feaiofjea0n'
   }
   return newUserData
}
