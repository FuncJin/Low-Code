const express = require('express')
const cors = require('cors')

const { handleExport } = require('./compress/handleExport')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/zip', express.static('./zip'))

// 解决跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "content-type")
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
	if (req.method === 'OPTIONS') res.send(200)
	else next()
})

// 注册路由
app.post('/export', handleExport)

app.listen(9999, () => console.log('Low-Code-Depend服务器启动了，端口是9999'))