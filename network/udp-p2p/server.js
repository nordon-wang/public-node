const dgram = require('dgram')

// udp 单播实现
const server = dgram.createSocket('udp4')

// 绑定成功
server.on('listening', () => {
  const address = server.address()

  console.log(`server run ${address.address} -- ${address.port}`);
})

// 监听消息
// msg 消息内容
// remoteInfo 远程目标 表示与 服务器通信的相关信息
server.on('message', (msg, remoteInfo) => {
  console.log(`server get ${msg} from ${remoteInfo.address} -- ${remoteInfo.port}`);

  server.send('收到消息了', remoteInfo.port, remoteInfo.address)
  
})

server.on('error', err => {
  console.log(`server error ${err}`);
  
})

server.bind(9527)