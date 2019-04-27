const axios = require('axios')

// 控制层  控制路由的页面显示的具体函数实现
exports.showIndex = async (req, res, next) => {
  res.render('index.html')
}

exports.showPeopleHome = async (req, res, next) => {
  res.render('people-home.html')
}

exports.showLogin = (req, res, next) => {
  res.render('login.html')
}


exports.signup = async(req, res, next) => {
  // 1. 获取表单数据
  console.log('获取表单数据', req.body)
  let {username, password, nickname, verify_code} = req.body
  // 2. 表单数据验证
  // 3. 业务处理
  // a. 校验用户名是否被占用
  const usernameRes = await axios({
    url:'http://localhost:8000/api/v1/users',
    method:'GET',
    params:{
      username
    }
  })
  if(!usernameRes.data.length){
    res.status(200).json({
      code:101,
      msg:'username 存在'
    })
  }

  // b. 校验昵称是否被占用
  const nicknameRes = await axios({
    url:'http://localhost:8000/api/v1/users',
    method:'GET',
    params:{
      nickname
    }
  })
  if(!nicknameRes.data.length){
    res.status(200).json({
      code:102,
      msg:'nickname 存在'
    })
  }

  // c. 创建用户
  const createUserRes = await axios({
    url:'http://localhost:8000/api/v1/users',
    method:'POST',
    data:{
      username, 
      password, 
      nickname
    }
  })
  console.log('createUserRes',createUserRes)

  // 4. 发送结果响应
  if(!createUserRes.data.length){
    res.status(200).json({
      code:200,
      msg:'创建成功'
    })
  }
}