import { useContext, useState } from 'react'
import { Popconfirm } from 'antd'
import {
    BuildOutlined,
    BugOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DownloadOutlined,
    ClearOutlined,
} from '@ant-design/icons'

import context from '../../Context'
import ComponentLib from './ComponentLib'
import ComponentCode from './ComponentCode'

import './index.css'

// 存储左栏的选项卡
const moreContent = [
    { lib: ComponentLib },
    { code: ComponentCode },
]
const render = (Comp, f) => <Comp showComp={!!Comp} handleContent={f} />
const PopconfirmTemp = props => (
    <Popconfirm
        placement="rightBottom"
        showCancel={false}
        okText="Yes"
        cancelText="No"
        {...props}
    ></Popconfirm>
)

const LeftSide = () => {
    const [showComp, setShowComp] = useState(null)
    const {
        handleBackEditor,
        handleForwardEditor,
        handleSaveStore,
        handleClearContent,
    } = useContext(context)
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
            <ul className="other-operations">
                <li>
                    <PopconfirmTemp
                        title={'确定后退一次操作吗？'}
                        onConfirm={handleBackEditor}
                    >
                        <ArrowLeftOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'确定前进一次操作吗？'}
                        onConfirm={handleForwardEditor}
                    >
                        <ArrowRightOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'是否将现有的画布内容保存至本地？'}
                        onConfirm={handleSaveStore}
                        okText="保存"
                    >
                        <DownloadOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'要清空所保存的哪项内容？'}
                        showCancel={true}
                        onConfirm={() => handleClearContent(true)}
                        onCancel={() => handleClearContent()}
                        okText="全部"
                        cancelText="仅本地缓存"
                    >
                        <ClearOutlined />
                    </PopconfirmTemp>
                </li>
            </ul>
            <div className={`component-lib ${!!showComp ? 'active' : ''}`}>
                {!!showComp ? render(showComp, handleContent) : showComp}
            </div>
        </div>
    )
}

export default LeftSide
