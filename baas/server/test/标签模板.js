

// 标签模板测试
// 标签模板：可以作为函数调用的参数 
function test(params) {
  console.log(params);
}

// test('hello1') // hello1
// 打印的是一个数组
// test`hello2`  //[ 'hello2' ] 
test`
  <div>hi</div>
  <div>hello</div>
`
