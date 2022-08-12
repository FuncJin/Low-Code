import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Tooltip, Tag, Button, message } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import combineAsyncError from 'combine-async-error'

import store from '../../Store'
import context from '../../Context'
import req from '../../apis/req'

import './index.css'

const { Title } = Typography
const screen = { pc: '100%', ipad: '768px', iphone: '375px' }
const TooltipTemp = props => <Tooltip placement="bottom" {...props}></Tooltip>

const Tab = () => {
    const [curScreen, setCurScreen] = useState(screen.pc)
    const { setCanvasWidth, editor } = useContext(context)
    const [exportEditor, setExportEditor] = useState(false)
    const handleExport = () => {
        if (!editor.length) {
            message.error('您不能够导出一个空页面')
            return
        }
        message.success('正在进行导出，请耐心等待...')
        const args = ['http://localhost:9999/export', `editor=${JSON.stringify(editor)}`]
        const acc = data => {
            console.log('导出数据', data)
            setExportEditor(false)
            message.success('导出成功')
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
        message.success('已自动保存至本地')
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
                    <Button
                        type="primary"
                        disabled={exportEditor}
                        /*  disabled={true} */
                        onClick={handleExport}
                    >导出</Button>
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
