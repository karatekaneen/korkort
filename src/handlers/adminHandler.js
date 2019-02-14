const { idLookUp, getQueue } = require('./dataRetrieval')
const { applyResult, acceptedLicense, rejectedLicense } = require('./acceptanceHandler')
/* 
Någon slags funktion som hämtar personid på personen som står i kö med sin ansökan för att 
veta vilken person och ansökan man ska titta på.
Första steget, Hämta gammal data och ny data. 
Presentera data till frontenden?
Beslut-> Acceptera den nya data eller slänga den
OM data är accepterad, uppdatera databasen med ny information och statusen på ansökan till godkänd.
ANNARS släng den skiten
*/

exports.fetchAdmin = async (req, res, next) => {
   try {
      if (res.locals.auth.isAdmin) {
         // Fetching old and new data to get approval

         res.send({
            success: true,
            response: {
               ...await idLookUp(),
               inQueue: await getQueue()
            }
         })
      } else {
         console.error(err)
         const rejection = reject('unauthorized')
         res.status(rejection.status).send({
            success: false,
            response: rejection.message
         })

      }
   } catch (err) {
      console.error(err)
      const rejection = reject('unknown')
      res.status(rejection.status).send({
         success: false,
         response: rejection.message
      })
   }
}

exports.postAdmin = async (req, res, next) => {
   try {
      if (res.locals.auth.isAdmin) {
         console.log({ input: req.body })

         const { adminDecision, application } = req.body

         // If the application is granted, update drivers' license:
         if (adminDecision == 2) {
            const resp = await acceptedLicense(application)
            res.send({ success: true, response: resp })
         } else {
            const resp = await rejectedLicense(application, adminDecision)
            res.send({ success: true, response: resp })
         }

      } else {
         console.error(err)
         const rejection = reject('unauthorized')
         res.status(rejection.status).send({
            success: false,
            response: rejection.message
         })
      }

   } catch (err) {
      console.error(err)
      const rejection = reject('unknown')
      res.status(rejection.status).send({
         success: false,
         response: rejection.message
      })
   }
}
