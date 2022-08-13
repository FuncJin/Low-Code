import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Tooltip, Tag, Button } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import combineAsyncError from 'combine-async-error'

import store from '../../Store'
import context from '../../Context'
import req from '../../apis/req'
import { antMsg, cutEditor } from '../Libs/tool'

import './index.css'

const { Title } = Typography
const screen = { pc: '100%', ipad: '768px', iphone: '375px' }
const TooltipTemp = props => <Tooltip placement="bottom" {...props}></Tooltip>

const Tab = () => {
    const [curScreen, setCurScreen] = useState(screen.pc)
    const { setCanvasWidth, editor, status, setStatus } = useContext(context)
    const [exportEditor, setExportEditor] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState('')
    const handleExport = () => {
        if (!editor.length) return antMsg.error('您不能够导出一个空页面')
        antMsg.success('正在准备导出')
        setTimeout(antMsg.success, 4000, '这可能会需要几分钟，请耐心等待');
        const args = [`editor=${JSON.stringify(cutEditor(editor))}`]
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
    const change = s => {
        return () => {
            setCanvasWidth(screen[s])
            setCurScreen(screen[s])
        }
    }
    const autoSaveStore = () => {
        store.setItem(editor)
        antMsg.success('已自动保存至本地')
    }
    return (
        <div className="tab">
            <Title>low-code</Title>
            <ul className="device"
            >
                <li className="high" onClick={change('pc')}>
                    <TooltipTemp title="pc">
                        <DesktopOutlined />
                    </TooltipTemp>
                </li>
                <li className="high ipad" onClick={change('ipad')}>
                    <TooltipTemp title="ipad">
                        <MobileOutlined />
                    </TooltipTemp>
                </li>
                <li className="high" onClick={change('iphone')}>
                    <TooltipTemp title="iphone">
                        <MobileOutlined />
                    </TooltipTemp>
                </li>
                <li>
                    <Tag className="cur-screen">{curScreen}</Tag>
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
