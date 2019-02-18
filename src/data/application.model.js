const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ApplicationSchema = new Schema({
   Namn: { type: String, required: true },
   Efternamn: { type: String, required: true },
   Korkortsnummer: { type: Number, required: true },
   Email: { type: String, required: true },
   Status: { type: Number, required: true },
   Portratt: { type: String, required: true },
   Signatur: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Application', ApplicationSchema)

