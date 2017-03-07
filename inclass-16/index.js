
const express = require('express')
const bodyParser = require('body-parser')

let nextArticleNum = 4
let articles = [{id: 1, author: 'Dude', text: 'stuff'},{id: 2, author: 'Dude2', text: 'stuff2'},{id: 3, author: 'Dude3', text: 'stuff3'}]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
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
     res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/article', getArticles)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
