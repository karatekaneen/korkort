const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LicenseSchema = new Schema({
   Namn: { type: String, required: true },
   Efternamn: { type: String, required: true },
   Korkortsnummer: { type: Number, required: true },
   Fodelsedatum: { type: Date, required: true },
   DatumForUtforande: { type: Date, required: true },
   UpphorGalla: { type: Date, required: true },
   Referensnummer: { type: Number, required: true },
   Villkor: { type: String, required: true },
   Portratt: { type: String, required: true },
   Signatur: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('License', LicenseSchema)
