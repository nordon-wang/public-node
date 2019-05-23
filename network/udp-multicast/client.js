const dgram = require('dgram')

const client = dgram.createSocket('udp4')

client.on('listening', () => {
  const address = client.address()
  console.log(`client run ${address.address} -- ${address.port}`);

  client.addMembership('224.0.1.100') // 加入指定的组播组
})

client.on('message', (msg, remoteInfo) => {
  console.log(`client get ${msg} from ${remoteInfo.address} -- ${remoteInfo.port}`);
})

client.on('error', err => {
  console.log(`client error ${err}`);
})


client.bind(8000)