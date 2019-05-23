const net = require('net')
const types = require('./types')

const server = net.createServer()

const users = []

server.on('connection', clientSocket => {
  
  clientSocket.on('data', data => {
    const {
      type = null,
      nickname = '',
      msg = '',
      to = '',
      from = ''
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
        
        // 有人登陆成功 通知其他人
        users.forEach(socket => {
          if(socket !== clientSocket){
            socket.write(JSON.stringify({
              type:types.log,
              msg:`${nickname} 进入了聊天室, 当前在线用户:${users.length}`
            }))
          }
        })

        break;
      case types.broadcast: // 广播
        // 每次收到客户端数据时，把消息发给其他的所有客户端
        users.forEach(socket => {
          if(socket !== clientSocket){
            socket.write(JSON.stringify({
              type:types.broadcast,
              username: from,
              msg
            }))
          }
        })
        break;
      case types.p2p: // 点对点
        const user = users.find(item => item.username === to)
        if(!user){
          return clientSocket.write(JSON.stringify({
            type:types.p2p,
            success:false,
            msg:'用户不存在或者已经下线'
          }))
        }

        user.write(JSON.stringify({
          type:types.p2p,
          success:true,
          username:from,
          msg
        }))
        break;
      default:
        break;
    } 
  })

  // 监听用户离开, 将其移除
  clientSocket.on('end', () => {
    const index = users.findIndex(user => user.username === clientSocket.username)

    if(index !== -1){
      users.splice(index, 1)
      // 有人离开 通知其他人
      users.forEach(socket => {
        socket.write(JSON.stringify({
          type:types.log,
          msg:`${clientSocket.username} 离开聊天室, 当前剩余用户:${users.length}`
        }))
      })
    }

  })
})


server.listen(9090, () => {
  console.log('server start 9090');
})