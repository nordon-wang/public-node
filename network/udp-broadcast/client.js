const dgram = require('dgram')

const client = dgram.createSocket('udp4')

client.on('message', (msg, remoteInfo) => {
  console.log(`client get ${msg} from ${remoteInfo.address} -- ${remoteInfo.port}`);
})

client.on('error', err => {
  console.log(`client error ${err}`);
})


client.bind(8000)