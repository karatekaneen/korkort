
// Kollar om admin har accepterat ansökan eller inte
exports.applyResult = (adminDecision) => {
   console.log(adminDecision)
   console.log('Checks if the admin has accepted the application')
   if (adminDecision.applicationStatus === 'Godkänd') {
      adminDecision.approved === true;
      return adminDecision;
   } else {
      adminDecision.approved === false;
      return adminDecision;
   }
}

exports.acceptedLicense = (applicationResult) => {
   console.log('Accepted license, update data')
   return {
      success: true,
      response: 'OH HAPPY DAY'
   }
}

exports.rejectedLicense = (applicationResult) => {
   console.log('Rejected license, update status to denied')
   return {
      success: true,
      response: ':( :( :( :('
   }
}