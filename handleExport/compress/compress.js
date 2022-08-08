const fs = require('fs')
const archiver = require('archiver')

const outputDir = './zip'

const compress = fileName => new Promise((resolve, rejected) => {
    const output = fs.createWriteStream(`${outputDir}/${fileName}`)
    const archive = archiver('zip', { zlib: { level: 9 } })
    output.on('close', resolve).on('error', rejected)
    archive.pipe(output)
    archive.directory('./build', false)
    archive.finalize()
})

module.exports = { compress }