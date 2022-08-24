import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, InputNumber, Button } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import combineAsyncError from 'combine-async-error'

import store from '../../Store'
import context from '../../Context'
import req from '../../apis/req'
import { antMsg, cutEditor, screenDefaultWidth } from '../Libs/tool'

import './index.css'

const { Title } = Typography

const Tab = () => {
    const { canvasWidth, setCanvasWidth, editor, status, setStatus } = useContext(context)
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
        combineAsyncError([{ func: req.get, args }], { acc })
        setExportEditor(true)
    }
    const changeDevice = s => () => setCanvasWidth(screenDefaultWidth[s])
    const handleScreen = value => setCanvasWidth(value)
    const autoSaveStore = () => {
        store.setItem(editor)
        antMsg.success('已自动保存至本地')
    }
    return (
        <div className="tab">
            <Title level={4}>Low-Code</Title>
            <ul className="device"
            >
                <li className="high" onClick={changeDevice('pc')}>
                    <DesktopOutlined />
                </li>
                <li className="high ipad" onClick={changeDevice('ipad')}>
                    <MobileOutlined />
                </li>
                <li className="high" onClick={changeDevice('iphone')}>
                    <MobileOutlined />
                </li>
                <li>
                    <InputNumber
                        className="cur-screen"
                        addonAfter="px"
                        value={canvasWidth}
                        onChange={handleScreen}
                    />
                </li>
            </ul>
            <ul>
                <li>
                    {
                        status ? (
                            <Button
                                type="primary"
                                disabled={exportEditor}
                                onClick={handleExport}
                            >导出</Button>
                        ) : (
                            <Button
                                type="primary"
                                danger
                            >
                                <a href={downloadUrl} download="lowcode.zip">下载</a>
                            </Button>
                        )
                    }
                </li>
                <li>
                    <Button
                        type="primary"
                        disabled={exportEditor}
                    >
                        <Link
                            to={{ pathname: "/preview", state: editor }}
                            onClick={autoSaveStore}
                        >预览</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default Tab
