const axios = require('axios')

// http://www.weather.com.cn/data/cityinfo/101020100.html  上海
// http://www.weather.com.cn/data/cityinfo/101010100.html  北京

module.exports.getData= async() => {
  const {
    data:{
      weatherinfo:{
        weather,
        temp1
      }
    }
  } = await axios.get('http://www.weather.com.cn/data/cityinfo/101020100.html')
  
  return {
    weather,
    temp1
  }
}