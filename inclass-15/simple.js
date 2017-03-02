const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

	let payload;

	switch(req.method){
		case 'GET':
			console.log('get switch')
			res.setHeader('Content-Type', 'application/json')
			if(req.url == '/articles'){
				payload = {articles: [{id: 1, author: "Steve", body: "Stuff"}, {id: 1, author: "Steve", body: "Stuff"}, {id: 1, author: "Steve", body: "Stuff"}]}
			}else{
				payload = {hello: "world"}
			}
			break;
		case 'POST':
			res.setHeader('Content-Type', 'application/json')
			payload = {username: req.body, result: 'success'}
			console.log('Post switch')
                        break;
		case 'PUT':
			res.setHeader('Content-Type', 'text')
			console.log('put switch')
			payload = 'OK'
                        break;
		default:
			console.log('found none of the accepted req types')
                        break;
	}

     //const payload = { 'hello': 'world' }
     //res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
