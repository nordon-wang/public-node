// 路由层
const express = require('express')
const indexCtrl = require('../controller/index')

const router = express.Router()

console.log(indexCtrl)

router
  .get('/test', indexCtrl.textCtrl)
  .get('/channels', indexCtrl.channelsCtrl)
  .get('/articles', indexCtrl.articleCtrl)
  .get('/userChannels', indexCtrl.userChannelsCtrl)
  .get('/allChannels', indexCtrl.allChannelsCtrl)
  .get('/userInfo', indexCtrl.userInfoCtrl)
  .get('/articleDetail', indexCtrl.articleDetailCtrl)


  module.exports = router