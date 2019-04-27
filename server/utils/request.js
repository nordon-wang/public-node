const axios = require('axios')
const config = require('../config/config.default')

//  配置一些 axios 请求的 基准路径
const instace = axios.create({
  baseURL:config.baseURL,
  timeout:2000
})

// 预留请求 响应的拦截器

module.exports = instace