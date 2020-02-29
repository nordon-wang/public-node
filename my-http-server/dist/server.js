"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _url = _interopRequireDefault(require("url"));

var _zlib = _interopRequireDefault(require("zlib"));

var _crypto = _interopRequireDefault(require("crypto"));

var _mime = _interopRequireDefault(require("mime"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ejs = _interopRequireDefault(require("ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const {
  stat,
  readdir
} = _fs.default.promises;

let temp = _fs.default.readFileSync(_path.default.resolve(__dirname, '../temp.html'), 'utf8');

let Server = /*#__PURE__*/function () {
  function Server(config) {
    _classCallCheck(this, Server);

    this.port = config.port;
    this.temp = temp;
  }

  _createClass(Server, [{
    key: "start",
    value: function start() {
      const server = _http.default.createServer(this.handlerRequest.bind(this));

      server.listen(this.port, () => {
        console.log(`
        ${_chalk.default.yellow('Starting up http-server, serving')} ${_chalk.default.blue('./public')}
        Available on:
          http://127.0.0.1:${_chalk.default.green(this.port)}
        Hit CTRL-C to stop the server
      `);
      });
    }
  }, {
    key: "handlerRequest",
    value: async function handlerRequest(req, res) {
      let {
        pathname
      } = _url.default.parse(req.url, true);

      pathname = decodeURIComponent(pathname);

      let filePath = _path.default.join(process.cwd(), pathname);

      try {
        const statObj = await stat(filePath);

        if (statObj.isDirectory()) {
          // 目录
          let dirs = await readdir(filePath);

          const tempStr = _ejs.default.render(this.temp, {
            dirs,
            path: pathname === '/' ? '' : pathname
          });

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(tempStr);
        } else {
          // 文件
          this.sendFile(filePath, statObj, req, res);
        }
      } catch (error) {
        this.sendError(error, res);
      }
    } // 缓存相关

  }, {
    key: "cache",
    value: function cache(filePath, statObj, req, res) {
      // 强缓存
      // res.setHeader('Cache-Control', 'max-age=60') 
      // res.setHeader('Expires', new Date(Date.now() + 60 * 1000).toGMTString() ) // 优先使用 cache-control
      res.setHeader('Cache-control', 'no-cache'); // 每次都会访问服务器，但是缓存，走协商缓存
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

      const file = _fs.default.readFileSync(filePath);

      const etag = _crypto.default.createHash('md5').update(file).digest('base64');

      res.setHeader('Etag', etag);
      const ifNoneMatch = req.headers['if-none-match'];

      if (ifNoneMatch && ifNoneMatch === etag) {
        return true;
      }

      return false;
    } // 成功处理

  }, {
    key: "sendFile",
    value: function sendFile(filePath, statObj, req, res) {
      // 在文件发送过程中，如果浏览器支持gzip，需要对内容进行压缩 然后再返回
      const flag = this.gzip(filePath, statObj, req, res);
      const contentType = _mime.default.getType(filePath) || 'text/plain';
      res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
      const cache = this.cache(filePath, statObj, req, res);

      if (cache) {
        // 有缓存
        res.statusCode = 304;
        return res.end();
      }

      console.log('filePath', filePath);

      if (!flag) {
        _fs.default.createReadStream(filePath).pipe(res);
      } else {
        _fs.default.createReadStream(filePath).pipe(flag).pipe(res);
      }
    } // 处理压缩

  }, {
    key: "gzip",
    value: function gzip(filePath, statObj, req, res) {
      const encoding = req.headers['accept-encoding'];

      if (encoding) {
        // 浏览器支持压缩
        if (encoding.match(/gzip/ig)) {
          //不告诉浏览器 可能会乱码，浏览器不知道你怎么压缩的，怎么解压
          // 不设置的时候 t.txt 点击会下载压缩包
          res.setHeader('Content-Encoding', 'gzip');
          return _zlib.default.createGzip();
        } else if (encoding.match(/deflate/)) {
          res.setHeader('Content-Encoding', 'deflate');
          return _zlib.default.createDeflate();
        }

        return false;
      }

      return false;
    } // 错误处理

  }, {
    key: "sendError",
    value: function sendError(e, res) {
      console.log('e', e);
      res.statusCode = 404;
      res.end('not found');
    }
  }]);

  return Server;
}();

var _default = Server;
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

exports.default = _default;