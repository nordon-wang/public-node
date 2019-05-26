const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 9999

const server = http.createServer((req, res) => {
  const {url} = req
  if(url === '/'){
    fs.readFile('./test.html', (err, data) => {
      if(err){
        throw err
      }else{
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  }else if(url.startsWith('/assets')){
    fs.readFile(`.${url}`, (err, data) => {
      if(err){
        throw err
      }else{
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        res.end(data)
      }
    })
  }else{
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('404')
  }


})

server.listen(port, hostname, () => {
  console.log('server 9999');
  
})