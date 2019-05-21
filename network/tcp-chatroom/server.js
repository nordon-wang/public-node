const net = require('net')
const types = require('./types')

const server = net.createServer()

const users = []

server.on('connection', clientSocket => {
  
  clientSocket.on('data', data => {
    const {
      type = null,
      nickname = '',
      msg = ''
    } = JSON.parse(data.toString().trim())

    switch (type) {
      case types.login: // 登陆
        // 用户名是否存在
        const nicknameIsExit = users.find(item => item.username === nickname)
        
        if(nicknameIsExit){ // 存在
          return clientSocket.write(JSON.stringify({
            type:types.login,
            success:false,
            msg:'昵称已存在'
          }))
        }
        
        // 不存在
        clientSocket.username = nickname
        // 把当前链接的客户端通信接口存储到 clients 中 
        users.push(clientSocket)
        clientSocket.write(JSON.stringify({
          type:types.login,
          success:true,
          msg:'注册成功',
          sumUsers:users.length,
          username: nickname
        }))

        break;
      case types.broadcast: // 广播
        // 每次收到客户端数据时，把消息发给其他的所有客户端
        users.forEach(socket => {
          if(socket !== clientSocket){
            socket.write(JSON.stringify({
              type:types.broadcast,
              username: socket.username,
              msg
            }))
          }
        })
        break;
      case types.p2p: // 点对点
        
        break;
      default:
        break;
    }
    

    
  })
})


server.listen(9090, () => {
  console.log('server start 9090');
  
})