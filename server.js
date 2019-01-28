const express = require('express')
const cors = require('cors')
let app = express()
app.use(cors())
const { checkAuth } = require('./src/handlers/authHandler')
const { apply } = require('./src/handlers/applicationHandler')
const { test } = require('./src/handlers/tester')



app.route('/application').get(checkAuth, apply)
app.route('/application').post(checkAuth, apply)

app.route('/test').get(test)


app.listen(3000)
console.log('server running on http://localhost:3000')