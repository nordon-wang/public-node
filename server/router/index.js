// 路由层
const express = require('express')
const indexCtrl = require('../controller/index')

const router = express.Router()

console.log(indexCtrl)

router
  .get('/', indexCtrl.showIndex)
  .get('/login', indexCtrl.showLogin)
  .post('/signup', indexCtrl.signup)
  .get('/people/home', indexCtrl.showPeopleHome)
  .get('/test', (req, res, next) => {
    res.status(200).send({data: [
      {
          "id": 10,
          "btitle": "BLOCK_HEIGHT",
          "bread": "558708.0000000000",
          "bcomment": 0
      },
      {
          "id": 11,
          "btitle": "HUSD_AMOUNT",
          "bread": "212.3278000000",
          "bcomment": 0
      },
      {
          "id": 12,
          "btitle": "BTC_AMOUNT",
          "bread": "0.0141508200",
          "bcomment": 0
      }
  ]})
  })


  module.exports = router