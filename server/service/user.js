const request = require('../utils/request')

exports.findByNickname = async (nickname) => {
  const {data} = await request({
    url:'/users',
    method:'GET',
    params:{
      nickname
    }
  })

  return data
}

exports.findByUsername = async (username) => {
  const {data} = await request({
    url:'/users',
    method:'GET',
    params:{
      username
    }
  })

  return data
}

exports.createUser = async (obj) => {
  const {data} = await request({
    url:'/users',
    method:'GET',
    data:obj
  })

  return data
}