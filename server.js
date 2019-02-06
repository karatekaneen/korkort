const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
const upload = multer({ dest: 'uploads/' })

const { checkAuth, handleLogin } = require('./src/handlers/authHandler')
const { postApplication, getApplication } = require('./src/handlers/applicationHandler')
const { test, showUsers, showDiff } = require('./src/handlers/tester')
const { fetchAdmin, postAdmin } = require('./src/handlers/adminHandler')
const { updateUsers } = require('./src/data/fileHandler')


app.route('/application').get(checkAuth, getApplication) // TODO Fixa specifik användare
app.route('/application').post(checkAuth, upload.single('fileToUpload'), postApplication)

app.route('/admin').get(checkAuth, fetchAdmin)
app.route('/admin').post(checkAuth, postAdmin)

app.route('/login').post(handleLogin)



// Test routes: 
app.route('/test').get(test)
app.route('/users').get(showUsers) // Testing endpoint to see the registered users
app.route('/updateusers').get(updateUsers) // Testing endpoint to see the registered users
app.route('/diff').get(showDiff) // Testing endpoint to see the registered users


app.listen(3000)
console.log('server running on http://localhost:3000')