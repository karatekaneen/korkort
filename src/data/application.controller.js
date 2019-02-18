const Application = require('./application.model')

exports.create = async (inApplication) => {

   // Create new object:
   let application = new Application(inApplication)

   // Save to db
   application.save(err => {

      // if error, return it
      if (err) {
         return err
      }

      // else return true 
      return true
   })
}

exports.readAll = async () => {
   return await Application.find()
}

exports.read = async (filter) => {
   // Filter is expected to have a property and a value ie. {Namn: 'Anna'}
   return await Application.find(filter)
}

exports.getNext = async () => {
   return await Application.findOne({ Status: 0 })
}

exports.update = async (inApplication) => {
   // Called with updated application. Find the old one by the ID and updates it:
   console.log({ inApplication })
   Application.findOneAndUpdate({ _id: inApplication.id }, inApplication, (err) => {
      if (err) {
         throw err
      }
   })

}

exports.delete = async (id) => {
   return await Application.findByIdAndDelete(id)
}
