const path = require('path')
const fs = require('fs')

// 读取文件数据
const getData = () => {
  // 读取文件
  const filePath = path.join(__dirname, 'data.json')

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err){
        reject(err)
      }

      resolve(data.toString())
    })
  })
}


// 设置文件数据
const setData = async (username, content) => {
  const filePath = path.join(__dirname, 'data.json')
  let file = await getData()
  let arr = JSON.parse(file)

  // 添加心得留言数据
  arr.unshift({
    username,
    content,
    date: Date.now()
  })

  return new Promise((resolve, reject) => {
    // 将添加完成的数据重新写入文件
    const str = JSON.stringify(arr)

    fs.writeFile(filePath, str, (err) => {
      if(err){
        reject('写文件失败了')
      }
      resolve('success')
    })
  })
}

module.exports = {
  getData,
  setData
}

// 效果同上
// module.exports.getData = getData
// module.exports.setData = setData