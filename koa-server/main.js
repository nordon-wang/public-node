const Koa = require('koa')

const app = new Koa()

app.use( async (req, res) => {
	req.body = 'koa demo'
})

app.listen(3033)

console.log('server start')