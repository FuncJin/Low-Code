import { useContext, useState } from 'react'
import { Tooltip, Popconfirm } from 'antd'
import {
    BuildOutlined,
    ExclamationCircleOutlined,
    BugOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DownloadOutlined,
    ClearOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons'

import context from '../../Context'
import ComponentLib from './ComponentLib'
import ComponentCode from './ComponentCode'

import './index.css'

const moreContent = [
    { lib: ComponentLib },
    { code: ComponentCode },
]
const render = (Comp, f) => <Comp showComp={!!Comp} handleContent={f} />
const TooltipTemp = props => <Tooltip placement="right" {...props}></Tooltip>
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
        handleClearStore,
        handleReadme
    } = useContext(context)
    const handleContent = area => {
        const whoComp = moreContent.find(v => v[area])
        if (showComp === whoComp[area]) return setShowComp(null)
        setShowComp(!whoComp ? null : () => whoComp[area])
    }
    return (
        <div className="left-side">
            <ul className="components">
                <TooltipTemp title="组件">
                    <li onClick={() => handleContent('lib')}>
                        <BuildOutlined />
                    </li>
                </TooltipTemp>
                <TooltipTemp title="代码">
                    <li onClick={() => handleContent('code')}>
                        <BugOutlined />
                    </li>
                </TooltipTemp>
            </ul>
            <ul className="other-operations">
                <li>
                    <PopconfirmTemp
                        title={'您确定要后退一次操作吗？'}
                        onConfirm={handleBackEditor}
                    >
                        <ArrowLeftOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'您确定要前进一次操作吗？'}
                        onConfirm={handleForwardEditor}
                    >
                        <ArrowRightOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'是否将现有的设计布局及样式保存至本地？'}
                        onConfirm={handleSaveStore}
                        icon={<CheckCircleOutlined style={{ color: "green" }} />}
                        okText="立即保存"
                    >
                        <DownloadOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'是否清空本地所保存的内容？'}
                        onConfirm={handleClearStore}
                        icon={<CheckCircleOutlined style={{ color: "green" }} />}
                        okText="清空"
                    >
                        <ClearOutlined />
                    </PopconfirmTemp>
                </li>
                <li>
                    <PopconfirmTemp
                        title={'点击确定查看使用说明'}
                        onConfirm={handleReadme}
                        okText="确定"
                        icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                    >
                        <ExclamationCircleOutlined />
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
