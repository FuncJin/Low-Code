import { useState, useContext } from 'react'
import { Button } from 'antd'
import combineAsyncError from 'combine-async-error'

import context from '../../../Context'
import { post } from '../../../apis/req'
import { antMsg, cutEditor } from '../../Libs/tool'

const Export = () => {
    const { editor, status, setStatus } = useContext(context)
    // 导出、预览按钮的状态
    const [exportEditor, setExportEditor] = useState(false)
    // 下载的地址
    const [downloadUrl, setDownloadUrl] = useState('')
    const handleExport = () => {
        if (!editor.length) return antMsg.error('您不能够导出一个空页面')
        antMsg.success('正在准备导出')
        setTimeout(antMsg.success, 4000, '这可能需要1-2分钟，请耐心等待')
        // 携带的参数
        const args = [`/export`, `editor=${JSON.stringify(cutEditor(editor))}`]
        // 导出完毕
        const acc = ({ error, result }) => {
            setExportEditor(false)
            if (error) return antMsg.error(error.msg)
            const { url } = result[0].data.msg
            setDownloadUrl(url)
            setStatus(false)
            antMsg.success('导出完毕，您现在可以下载资源了')
        }
        combineAsyncError([{ func: post, args }], { acc })
        setExportEditor(true)
    }
    return (
        <>
            {
                status ? (
                    <Button
                        type="link"
                        disabled={exportEditor}
                        onClick={handleExport}
                    >导出</Button>
                ) : (
                    <Button
                        type="link"
                        danger
                    >
                        <a href={downloadUrl} download="lowcode.zip">下载</a>
                    </Button>
                )
            }
        </>
    )
}

export default Export