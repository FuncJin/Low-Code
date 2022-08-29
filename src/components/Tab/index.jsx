import { useContext } from 'react'
import { Typography, InputNumber } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'

import File from './File'
import Operations from './Operations'
import context from '../../Context'
import { screenDefaultWidth } from '../Libs/tool'

import './index.css'

const { Title } = Typography

const Tab = () => {
    const { canvasWidth, setCanvasWidth } = useContext(context)
    const changeDevice = s => () => setCanvasWidth(screenDefaultWidth[s])
    const handleScreen = value => setCanvasWidth(value)
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
                    <Operations />
                </li>
                <li>
                    <File />
                </li>
            </ul>
        </div>
    )
}

export default Tab
