import http from 'http'
import fs from 'fs'
import path from 'path'
import util from 'util'
import url from 'url'
import zlib from 'zlib' // 压缩
import crypto from 'crypto'

import mime from 'mime'
import chalk from 'chalk'
import ejs from 'ejs'

const {
  stat,
  readdir,
} = fs.promises

let temp = fs.readFileSync(path.resolve(__dirname, '../temp.html'), 'utf8')

class Server {
  constructor(config) {
    this.port = config.port
    this.temp = temp
  }

  start() {
    const server = http.createServer(this.handlerRequest.bind(this))

    server.listen(this.port, () => {
      console.log(`
        ${chalk.yellow('Starting up http-server, serving')} ${chalk.blue('./public')}
        Available on:
          http://127.0.0.1:${chalk.green(this.port)}
        Hit CTRL-C to stop the server
      `);
    })
  }

  async handlerRequest(req, res) {
    let {
      pathname
    } = url.parse(req.url, true)
    pathname = decodeURIComponent(pathname)
    let filePath = path.join(process.cwd(), pathname)

    try {
      const statObj = await stat(filePath)
      if (statObj.isDirectory()) { // 目录
        let dirs = await readdir(filePath)
        const tempStr = ejs.render(this.temp, {
          dirs,
          path: pathname === '/' ? '' : pathname
         })
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(tempStr)

      } else { // 文件
        this.sendFile(filePath,statObj, req, res)
      }
    } catch (error) {
      this.sendError(error, res)
    }
  }

  // 缓存相关
  cache(filePath,statObj, req, res){
    // 强缓存
    // res.setHeader('Cache-Control', 'max-age=60') 
    // res.setHeader('Expires', new Date(Date.now() + 60 * 1000).toGMTString() ) // 优先使用 cache-control
    res.setHeader('Cache-control', 'no-cache') // 每次都会访问服务器，但是缓存，走协商缓存
    // res.setHeader('Cache-control', 'no-store') // 不缓存

    /** 
     * 协商缓存 
     *  Last-Modified -- If-Modified-Since
     *    问题：1) 文件可能没有发生变化，但是修改时间变了
     *         2) 时间精确度不够，只能到秒，会导致同一时间改变了很多次判断不准确，导致缓存失败
     *         3) cnd 分发时间不同，导致缓存失败
    */
    // statObj.ctime 是一个时间类型，代表上次文件修改的时间
    // const lastModified = statObj.ctime.toGMTString()
    // res.setHeader('Last-Modified', lastModified) 
    // const ifModifiedSince = req.headers['if-modified-since'] // 获取浏览器带过来的
    // if(ifModifiedSince && ifModifiedSince === lastModified){
    //   return true
    // }

    /** 
     * Etag -- If-None-Match
     *  Etag 就是一个md5
     *  若是文件比较大，进行md5的时候非常浪费资源和时间，一般截取部分内容进行md5
     *  
    */
    const file = fs.readFileSync(filePath)
    const etag = crypto.createHash('md5').update(file).digest('base64')
    res.setHeader('Etag', etag)
    const ifNoneMatch = req.headers['if-none-match']
    if(ifNoneMatch && ifNoneMatch === etag){
      return true
    }

    return false
  }

  // 成功处理
  sendFile(filePath,statObj, req, res) {
    // 在文件发送过程中，如果浏览器支持gzip，需要对内容进行压缩 然后再返回
    const flag = this.gzip(filePath,statObj, req, res)
    const contentType = mime.getType(filePath) || 'text/plain'
    res.setHeader('Content-Type', `${contentType}; charset=utf-8`)

    const cache = this.cache(filePath,statObj, req, res)
    if(cache){ // 有缓存
      res.statusCode = 304
      return res.end()
    }

    console.log('filePath', filePath);

    if(!flag){
      fs.createReadStream(filePath).pipe(res)
    }else {
      fs.createReadStream(filePath).pipe(flag).pipe(res)
    }
  }

  // 处理压缩
  gzip(filePath,statObj, req, res){
    const encoding = req.headers['accept-encoding']
    if(encoding){ // 浏览器支持压缩
      if(encoding.match(/gzip/ig)){
        //不告诉浏览器 可能会乱码，浏览器不知道你怎么压缩的，怎么解压
        // 不设置的时候 t.txt 点击会下载压缩包
        res.setHeader('Content-Encoding', 'gzip') 
        return zlib.createGzip()
      } else if(encoding.match(/deflate/)){
        res.setHeader('Content-Encoding', 'deflate')
        return zlib.createDeflate()
      }
      return false
    }

    return false
  }

  // 错误处理
  sendError(e, res) {
    console.log('e', e);
    res.statusCode = 404
    res.end('not found')
  }
}


export default Server

/** 
 * http优化策略 -- 压缩、缓存
 *  压缩 
 *    客户端告诉服务端支持哪些压缩方式 - Accept-Encoding: gzip, deflate, br
 *    服务器处理返回 - Content-Encoding: gzip
 *  缓存
 *    强缓存 
 *      首页index.html不会被缓存，访问的页面如果有强制缓存则不会再发送请求
 *      强缓存优先级高于协商缓存
 *      Cache-Control 高于 Expires
 *    协商缓存
 *      Last-Modified -- If-Modified-Since
 *      Etag -- If-None-Match
*/
