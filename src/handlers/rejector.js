exports.reject = (rejectType) => {
   switch (rejectType) {
      case 'notAllowed':
         return { status: 403, message: 'Du är inte tillåten att göra en ansökan' }
      case 'insufficientData':
         return { status: 400, message: 'Ansökan är ej komplett' }
      case 'unknown':
         return { status: 500, message: 'Ett okänt fel uppstod' }
   }
}