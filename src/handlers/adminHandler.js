const express = require('express');
const app = express();
const { idLookUp } = require('./dataRetrieval')
const { applyResult, acceptedLicense, rejectedLicense } = require('./acceptanceHandler')
/* 
Någon slags funktion som hämtar personid på personen som står i kö med sin ansökan för att veta vilken person och ansökan man ska titta på
Första steget, Hämta gammal data och ny data. 
Presentera data till frontenden?
Beslut-> Acceptera den nya data eller slänga den
OM data är accepterad, uppdatera databasen med ny information och statusen på ansökan till godkänd.
ANNARS släng den skiten
*/

exports.fetchAdmin = async (req, res, next) => {

   // 
   const acceptedData = true // Req input
   /*const newUserData = { // Req input
       name: 'Varg Vikernes',
       birthDate: 197011124692,
       image: 'aske59vmsiegnosf0232gdfaf3fafggdsxxcz',
       signature: 'mgla015713bnvmn8fah0feaiofjea0n'
   } */ //

   try {
      // Fetching old and new data to get approval
      res.send({ success: true, response: await idLookUp() });
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

      const adminDecision = { applicationStatus: 'Godkänd' } //req.body.adminDecision

      // Kollar om admin har accepterat det nya körkortet(true) eller nekat(false)
      const applicationResult = applyResult(adminDecision);

      // Funktionen ska kolla om ansökan är godkänd eller ej. (Denna funktion kanske funkar så?) Innehållet är copy paste från applicationHandler.js
      if (!applicationResult.approved) {
         const resp = await rejectedLicense(applicationResult)
         res.send({ success: true, response: resp })
      } else if (applicationResult.approved) {

         //Ladda upp det nya körkortet i databasen || Ersätta den gamla data?
         const resp = await acceptedLicense(applicationResult)
         res.send({ success: true, response: resp })
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
