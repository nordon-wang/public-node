const http = require('http')

const hostname = '127.0.0.1'
const port = 9999

const server = http.createServer((req, res) => {
  const {url} = req
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/plain')

  if(url === '/'){
    res.end('hello')
  } else if(url === '/a'){
    res.end('aaa')
  }else if(url === '/b'){
    res.end('bbb')
  }else{
    res.statusCode = 404
    res.end('404')
  }

})

server.listen(port, hostname, () => {
  console.log('server 9999');
  
})