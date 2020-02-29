/** 
 * 流分类
 *  可读流 _read
 *  可写流 _write
 *  双工流 _read _write
*/

// 转化流， 压缩就是依赖转化流实现的
const { Transform } = require('stream')

// process.stdin 监听终端输入 
// process.stdin.on('data', data => {
//   // 标准输出
//   process.stdout.write(data)
// })

// 利用流的方式 直接重复输出输入的内容
// process.stdin.pipe(process.stdout)

//
class MyTransform extends Transform {
  // 调用pipe方法的时候 会自动调用_transform
  _transform(chunk, encoding, callback){ //需要手动实现 _transform
    chunk = chunk.toString().toUpperCase()
    this.push(chunk) // 将读入的内容进行处理，然后放回去
    callback() // 每次都需要清缓存
  }
}

/** 
 * 将输入的字母变为大写
 *  process.stdin.pipe(process.stdout) 不能满足需求
 *  需要再加一层转化流
*/
// const myTransform = new MyTransform()
// process.stdin.pipe(myTransform).pipe(process.stdout)


/** 
 * gzip压缩 
 *  原理就是将资源内重复的东西进行处理
 *    比如一个文本里，一段出现了10次的内容，就会被处理，将重复的内容替换掉
 *    像视频这种内容不一样，gzip就没鸟用了
 */
const zlib = require('zlib') // 专门做压缩 gzip
const fs = require('fs')
const path = require('path')

const tPath = path.resolve(__dirname, './t.txt')
const wPath = path.resolve(__dirname, './t.txt.gz')

// 1. 基础版本
// const file = fs.readFileSync(tPath, 'utf-8')
// zlib.gzip(file, (err, data) => {
//   fs.writeFileSync(wPath, data)  
// })

// 2. 流版本
fs.createReadStream(tPath).pipe(zlib.createGzip()).pipe(fs.createWriteStream(wPath))

