const express = require('express')
let app = express()
const { checkAuth } = require('./src/handlers/authHandler')
const { apply } = require('./src/handlers/applicationHandler')



app.route('/application').get(checkAuth, apply)
app.route('/application').post(checkAuth, apply)


app.listen(3000)