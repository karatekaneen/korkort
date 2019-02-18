const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const corsOptions = {
   exposedHeaders: 'Auth'
}

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(corsOptions))

const { checkAuth, handleLogin, handleAdminLogin } = require('./src/middleware/authHandler')
const { postApplication, getApplication } = require('./src/handlers/applicationHandler')
const { showUsers } = require('./src/handlers/tester')
const { fetchAdmin, postAdmin } = require('./src/handlers/adminHandler')
const { upload } = require('./src/middleware/formParser')
const { createLicense } = require('./sandbox')

let url = 'mongodb://transportstyrelsen:MyPassword@cluster0-shard-00-00-36jy2.mongodb.net:27017,cluster0-shard-00-01-36jy2.mongodb.net:27017,cluster0-shard-00-02-36jy2.mongodb.net:27017/korkort?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
})



app.route('/application').get(checkAuth, getApplication) // TODO Fixa specifik användare
app.route('/application').post(checkAuth, upload, postApplication)

app.route('/admin').get(checkAuth, fetchAdmin)
app.route('/admin').post(checkAuth, postAdmin)

app.route('/login').post(handleLogin)
app.route('/adminlogin').post(handleAdminLogin)



// Test routes: 
app.route('/users').get(showUsers) // Testing endpoint to see the registered users
app.route('/createlicense').post(createLicense) // Test endpoint to quickly add new licenses

app.listen(3000)
console.log('server running on http://localhost:3000')