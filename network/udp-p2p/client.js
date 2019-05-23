const dgram = require('dgram')

const client = dgram.createSocket('udp4')

// 如果没有绑定端口号 可以直接在这里发送消息
// 如果绑定了端口号 需要在 listening 中发送消息
client.send('hello word', 9527, 'localhost')

// 绑定成功
client.on('listening', () => {
  const address = client.address()
  console.log(`client run ${address.address} -- ${address.port}`);
})

// 监听消息
// msg 消息内容
// remoteInfo 远程目标 表示与 服务器通信的相关信息
client.on('message', (msg, remoteInfo) => {
  console.log(`client get ${msg} from ${remoteInfo.address} -- ${remoteInfo.port}`);
})

client.on('error', err => {
  console.log(`client error ${err}`);
})

// 不绑定端口号 系统会随机分配一个
// client.bind(9527)