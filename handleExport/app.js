const express = require('express')
const cors = require('cors')
const { handleExport } = require('./compress/handleExport')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/export', handleExport)

app.listen(9999, () => console.log('服务器启动了，端口是9999'))