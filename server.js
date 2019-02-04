const express = require('express')
const cors = require('cors')
const multer = require('multer')
let app = express()
app.use(cors())
const upload = multer({ dest: 'uploads/' })


const { checkAuth, handleLogin } = require('./src/handlers/authHandler')
const { apply } = require('./src/handlers/applicationHandler')
const { test } = require('./src/handlers/tester')


app.route('/application').get(checkAuth) // TODO Fixa specifik användare


app.route('/application').post(checkAuth, upload.single('fileToUpload'), apply)

// app.route('/admin').get(checkAuth, adminEntry)
// app.route('/admin').post(checkAuth, adminPost)

app.route('/login').post(handleLogin)

app.route('/picture').post(checkAuth, apply)

app.route('/test').get(test)


app.listen(3000)
console.log('server running on http://localhost:3000')