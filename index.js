const http = require('http');
const port = process.env.PUBLIC_PORT;

const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello from Next Innovate!')
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`)
})
