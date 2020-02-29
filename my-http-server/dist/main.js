"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _server = _interopRequireDefault(require("./server.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.option('-d, --debug', 'output extra debugging').option('-s, --small', 'small pizza size').option('-c, --cheese <type>', 'add the specified type of cheese', 'blue').option('-p, --port <type>', 'set server post', '3000');

_commander.default.parse(process.argv);
/** 
 * 解析用户参数
*/
// 1. 通过解析的参数启动一个服务


const server = new _server.default({
  port: _commander.default.port
});
server.start(); // console.log(`port: ${program.port}, cheese: ${program.cheese}`);