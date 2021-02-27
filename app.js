/** configuration */

const auth = require('./auth.json')
const config = require('./config.json')

const port =  process.env.PORT || config.port
const host =  process.env.HOST || config.host



/** modules */

const http = require('http')
const express = require('express')
const express_session = require('express-session')



/** functions */

const UUID = require('uuid')

const path = require('path')
const dir = (fileName) => path.join(__dirname, fileName)
const log = (module, msg) => {console.log(`\t:: ${module} :: ${msg}`)}



/** server init */

let app = express()
let server = http.Server(app)

server.listen(port, host, () => {
	log('Express', `Listening on port ${port}`)
})



/** session middleware */

let session = express_session({
	secret: auth.session_secret,
	resave: true,
	saveUninitialized: true
})



/** express */

app.use(session)

app.use('/public', express.static(dir('public')))
//app.use('/assets', express.static(dir('public/assets')))


app.get('/', (req, res) => {
	res.sendFile(dir('public/index.html'))
})