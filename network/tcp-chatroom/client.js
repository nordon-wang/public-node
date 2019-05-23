const net = require('net')
const types = require('./types')

let nickname = null


const client = net.createConnection({
  host:'127.0.0.1',
  port:9090
})

client.on('connect', () => {

  process.stdout.write('请输入昵称:')

  process.stdin.on('data', data => {
    const msg = data.toString().trim()

    // 不存在昵称
    if(!nickname){
      return client.write(JSON.stringify({
        type:types.login,
        nickname:msg
      }))
    }

    // 使用正则判断是否为私聊
    const matches = /^@(\w+)\s(.+)$/.exec(msg)

    if(matches){ // 符合 @xx xxx 格式， 是私聊
      return client.write(JSON.stringify({
        type:types.p2p,
        to:matches[1],
        from:nickname,
        msg:matches[2]
      }))
    }

    // 存在昵称 群聊
    client.write(JSON.stringify({
      type:types.broadcast,
      from:nickname,
      msg
    }))

  })
})


client.on('data', data => {
  const {
    type = null,
    success = false,
    msg = '',
    sumUsers = 0,
    username = ''
  } = JSON.parse(data.toString().trim())

  switch (type) {
    case types.login:
      if(success){ // 注册成功
        console.log(`登陆成功，当前在线用户 ${sumUsers} 人`);
        nickname = username
      }else{
        console.log(`登陆失败：${msg}`);
        process.stdout.write('请输入昵称:')
      }
      break;
    case types.broadcast:
      console.log(`${username} 说: ${msg}`);
      break;
    case types.p2p:
      if(!success){
        return console.log(`发送失败：${msg}`);
      }
      console.log(`${username}悄悄对你说：${msg}`);
      break;
    case types.log:
      console.log(msg);
      break;
    default:
      break;
  }
})