const net = require('net')


const server = net.createServer()


server.on('connection', clientSocket => {
  console.log('有新的连接进来');

  // 通过 clientSocket 给当前链接的客户端发送消息
  clientSocket.write('给客户端发消息')

  // 监听 clientSocket 的 data 事件
  clientSocket.on('data', data => {
    // data 是二进制数据 需要 toString
    console.log('客户端发送的消息:',data.toString());
    
  })
  
})

server.listen(9999, () => {
  console.log('server start 9999');
  
})