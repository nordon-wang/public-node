const path = require('path')
const fs = require('fs')

module.exports.getData = () => {
  const dataPath = path.join(__dirname, 'data.json')

  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err, data) => {
      if(err){
        reject(err)
      }

      resolve(data.toString())
    })
  })
}