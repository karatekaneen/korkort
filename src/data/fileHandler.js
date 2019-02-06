const fs = require('mz/fs');

// Standardized function to fetch a file and parse it:
const getFile = async (fileName) => {
   try {
      return JSON.parse(await fs.readFile(`${__dirname}/${fileName}.json`, 'utf8'))

   } catch (err) {
      console.log(err)
   }
}

// Standardized function to update file:
const writeFile = async (fileName, newFile) => {
   try {
      await fs.writeFile(`${__dirname}/${fileName}.json`, JSON.stringify(newFile, null, 3), 'utf8')
   } catch (err) {
      console.log(err)
   }
}

exports.updatePerson = async (person) => {
   try {
      const list = await getFile('Personer')
      const updatedList = list.map(oldPerson => {
         if (oldPerson.Korkortsnummer === person.Korkortsnummer) {
            oldPerson = person
         }
         return oldPerson
      })
      await writeFile('Personer', updatedList)
      return 'Uppdatering utförd'

   } catch (err) {
      console.log(err)
   }

}

exports.updateApplication = async (application) => {
   try {
      const list = await getFile('Ansokningar')
      const updatedList = list.map(oldApplication => {
         if (oldApplication.Ansokan_ID === application.Ansokan_ID) {
            oldApplication = { ...oldApplication, ...application }
         }
         return oldApplication
      })
      await writeFile('Ansokningar', updatedList)
      return 'Uppdatering utförd'

   } catch (err) {
      console.log(err)
   }
}

exports.createApplication = async (application) => {
   try {

      let list = await getFile('Ansokningar')
      list.push(application)
      await writeFile('Ansokningar', list)
      return 'Ansökan skapad'

   } catch (err) {
      console.log(err)
   }
}

exports.updateUsers = async (req, res) => {
   try {
      const personer = await getFile('Personer')

      const available = personer.map(user => {
         return user.Korkortsnummer
      })

      const list = await getFile('Ansokningar')
      const updatedList = list.map(oldApplication => {

         oldApplication.Korkortsnummer = available[Math.floor(Math.random() * available.length)]
         return oldApplication
      })
      await writeFile('Ansokningar', updatedList)
      res.send(available)

   } catch (err) {
      console.log(err)
   }

}
