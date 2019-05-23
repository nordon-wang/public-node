const dgram = require('dgram')

// 实现 udp 组播
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  const address = server.address()
  console.log(`server run ${address.address} -- ${address.port}`);

  let count = 0;
  
  setInterval(() => {
    count++

    server.send(count+'', 8000, '224.0.1.100', err => {
      if(err){
        console.log('失败');
      }else{
        console.log('成功');
      }
    })
  }, 1000)
})


server.on('message', (msg, remoteInfo) => {
  console.log(`server get ${msg} from ${remoteInfo.address} -- ${remoteInfo.port}`);

  server.send('收到消息了', remoteInfo.port, remoteInfo.address)
})

server.on('error', err => {
})


server.bind(9529)