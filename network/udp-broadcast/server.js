const dgram = require('dgram')

// 实现 udp 广播
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  server.setBroadcast(true)  // 开启广播模式
  const address = server.address()
  console.log(`server run ${address.address} -- ${address.port}`);

  let count = 0;
  
  setInterval(() => {
    count++

    // 直接地址 192.168.1.xxx(将最后一位改成255) 可以经过路由转发 跨网段转发
    // 受限地址 255.255.255.255 不会经过路由转发
    // server.send(count+'', 8000, '255.255.255.255', err => {
    server.send(count+'', 8000, '192.168.1.255', err => {
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


server.bind(9528)