const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5')
const randomstring = require("randomstring")

//Sample POST for testing:
//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"memes"}' http://localhost:3000/register
//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"memes"}' http://localhost:3000/login -i

let nextArticleNum = 4
let articles = [{id: 1, author: 'Dude', text: 'stuff'},{id: 2, author: 'Dude2', text: 'stuff2'},{id: 3, author: 'Dude3', text: 'stuff3'}]
let uRecords = {}

const addArticle = (req, res) => {
     console.log('add articel, Payload received', req.body)
     let newArticle = {id: nextArticleNum}
     newArticle.author = req.body.author
     newArticle.text = req.body.text
     articles.push(newArticle)
     nextArticleNum += 1
	console.log(articles)
     res.send(newArticle)
}

const getArticles = (req, res) => {
     console.log('Payload received', req.body)
	console.log(req.params)
	if(req.params.id==undefined){
	     res.send(articles)
		console.log("empty case")
	}
	else{
		//console.log()
		res.send(articles.filter((art) => {return art.id == req.params.id}))
	}
}

const register = (req, res) => {
     console.log('register, Payload received', req.body)
     const password = req.body.password
     const username = req.body.username
	console.log("Username: ", username)
     const salt = randomstring.generate(4)
     const hash = md5(password + salt)
     uRecords[username] = {salt, hash}
     console.log("added user record: ", uRecords)

     res.send('ok\n')
}

const login = (req, res) => {
     console.log("login w/ object: ", req.body)
	const username = req.body.username
	const password = req.body.password
	if(!password || !username){
		res.sendStatus(400)
		return
	}
	const userObj = uRecords[username]
	console.log("Found record for user? ", userObj)
	if(!userObj){
		res.sendStatus(400)
		return
	}
	hashWithSent = md5(password + userObj.salt)
	if(hashWithSent != userObj.hash){
		console.log("Bad hash found, erase for prod")
		res.sendStatus(400)
		return
	}

	//Success, set cookie and respond
	//TODO: Unsure if a good idea (probs not from sec standpoint, but sid is just hash
	res.cookie('cookieName', userObj.hash, {maxAge: 3600*1000})
	res.send({username, result: 'success'})
}

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles/:id?', getArticles)
app.post('/register', register)
app.post('/login', login)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

