import { useState } from 'react'
import {
    BuildOutlined,
    BugOutlined,
} from '@ant-design/icons'

import ComponentLib from './ComponentLib'
import ComponentCode from './ComponentCode'

import './index.css'

// 存储左栏的选项卡
const moreContent = [
    { lib: ComponentLib },
    { code: ComponentCode },
]
const render = (Comp, f) => <Comp showComp={!!Comp} handleContent={f} />

const LeftSide = () => {
    const [showComp, setShowComp] = useState(null)
    // 切换选项卡的动画效果
    const handleContent = area => {
        const whoComp = moreContent.find(v => v[area])
        if (showComp === whoComp[area]) return setShowComp(null)
        setShowComp(!whoComp ? null : () => whoComp[area])
    }
    return (
        <div className="left-side">
            <ul className="components">
                <li onClick={() => handleContent('lib')}>
                    <BuildOutlined />
                </li>
                <li onClick={() => handleContent('code')}>
                    <BugOutlined />
                </li>
            </ul>
            <div className={`component-lib ${!!showComp ? 'active' : ''}`}>
                {!!showComp ? render(showComp, handleContent) : showComp}
            </div>
        </div>
    )
}

export default LeftSide
