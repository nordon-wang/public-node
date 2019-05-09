const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const router = require('./router')

const app = express()

// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

//设置允许跨域访问该服务.
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// 接受 解析客户端提交的 json 格式数据
// 能解析 application/json
// {key:value, key:value}
app.use(express.json())

// 能解析 application/x-www-form-urlencoded  key=value&key=value
app.use(express.urlencoded({
  extended: true
}))

nunjucks.configure(path.join(__dirname, './view/'), {
  autoescape: true,
  express: app,
  watch: true // 禁用模板引擎缓存, 启用模板文件监视, 文件改变,重新预编译
})

app.use(router)

// app.get('/', (req, res, next) => {
//   // res.status(200).send('nordon.wang test')
//   res.render('index.html')
// })

app.listen(8980, () => {
  console.log('--------- service start -----')
}) 