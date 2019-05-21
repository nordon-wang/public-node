const net = require('net')


const client = net.createConnection({
  host:'127.0.0.1',
  port:9999
})


client.on('connect', () => {
  console.log('成功链接服务器');

  // 当客户端与服务端简历链接成功以后，客户端就可以给服务端发送数据
  client.write('客户端 to 服务端')

  // 1.当客户端与服务端建立链接成功以后，可以监听终端的输入
  // 2.获取终端的输入发送给服务端
  process.stdin.on('data', data => {
    client.write(data.toString().trim())
  })
  
})

// 客户端监听 data 时间
// 当服务端发送消息过来时就会触发
client.on('data', data => {
  console.log(data.toString());
  
})