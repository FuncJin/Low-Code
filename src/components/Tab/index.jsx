import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Tooltip, Tag, Button, message } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'

import store from '../../Store'
import context from '../../Context'

import './index.css'

const { Title } = Typography
const screen = { pc: '100%', ipad: '768px', iphone: '375px' }
const TooltipTemp = props => <Tooltip placement="bottom" {...props}></Tooltip>

const Tab = () => {
    const [curScreen, setCurScreen] = useState(screen.pc)
    const { setCanvasWidth, editor } = useContext(context)
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
            <Title level={4}>Low-Code</Title>
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
                <Button type="primary">
                    <Link
                        to={{ pathname: "/preview", state: editor }}
                        onClick={autoSaveStore}
                    >预览</Link>
                </Button>
            </ul>
        </div>
    )
}

export default Tab
