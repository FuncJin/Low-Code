const fs = require('fs')
const exec = require('child_process').exec
const { combineAsyncError } = require('combine-async-error')

const { compress } = require('./compress')

// 处理写入文件的路径
const url = './src/components/Preview/editor.jsx'
const text = editor => `const editor = ${editor};export default editor;`
const downloadUrl = 'https://funcjin.cn/zip/lowcode.zip'

// 开启命令行 > npm run-script build
const go = () => new Promise(resolve => {
    const args = ['npm run-script build', ['../']]
    const stdout = async err => resolve(!err)
    exec(...args, stdout)
})

const sFai = { flag: false, text: '导出失败' }
const sWin = { flag: true, text: '导出成功' }

const handleExport = (req, res) => {
    const editor = req.body.editor.replace(/^'|'$/ig, '')
    const handle = async err => {
        if (err) return res.send(sFai)
        const flag = await go()
        if (!flag) return res.send(sFai)
        const queue = [{
            func: compress,
            args: ['lowcode.zip']
        }]
        const acc = ({ error }) => res.send(error ? sFai : { ...sWin, url: downloadUrl })
        combineAsyncError(queue, { acc })
    }
    fs.writeFile(url, text(editor), handle)
}

module.exports = { handleExport }