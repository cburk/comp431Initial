const express = require('express')
const bodyParser = require('body-parser')

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')	
        res.setHeader('Access-Control-Allow-Credentials','true')
        res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type')
	if(req.method == 'OPTIONS'){
		res.sendStatus(200)
		return
	}
	next()
})
app.get('/', index)
require('./src/profile')(app)
require('./src/auth')(app)
require('./src/articles')(app)
require('./src/following')(app)
require('./oath_ex')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
