import program from "commander";
import Server from './server.js'
 
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
  .option('-p, --port <type>', 'set server post', '3000')
 
program.parse(process.argv);


/** 
 * 解析用户参数
*/
// 1. 通过解析的参数启动一个服务
const server = new Server({
  port: program.port
})

server.start()
// console.log(`port: ${program.port}, cheese: ${program.cheese}`);

