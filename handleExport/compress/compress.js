const fs = require('fs')
const archiver = require('archiver')

// 压缩后的输出路径
const outputDir = './zip'

// 压缩文件
const compress = fileName => new Promise((resolve, rejected) => {
    // 如果没有输出到的文件夹，则创建一个
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)
    const output = fs.createWriteStream(`${outputDir}/${fileName}`)
    // 开始压缩
    const archive = archiver('zip', { zlib: { level: 9 } })
    output.on('close', resolve).on('error', rejected)
    archive.pipe(output)
    archive.directory('./build', false)
    archive.finalize()
})

module.exports = { compress }