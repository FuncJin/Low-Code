import { useState, useContext } from 'react'
import { Divider, Input, Button } from 'antd'

import context from '../../../Context'
import { toEvent,antMsg } from '../../Libs/tool'

import './index.css'

const { TextArea } = Input

const ComponentCode = ({ handleContent }) => {
    const { editor, setEditor, curSelectedEl, setCurSelectedEl } = useContext(context)
    // 如果某个组件的事件代码已经被添加过了，则获取它
    const getPreCode = () => {
        const preEvent = Object.keys(curSelectedEl.events)[0]
        const defaultCode = curSelectedEl.events[preEvent]?.code
        return defaultCode
    }
    const [code, setCode] = useState((curSelectedEl && getPreCode()) || "例如 alert('hello Events')")
    const handleEvents = () => {
        const { key, events } = curSelectedEl
        const eventName = Object.keys(events)[0]
        const next = v => ({
            ...v,
            // 指定当前组件的事件处理函数代码(字符串的形式)
            events: { [eventName]: { fn: toEvent(code), code } }
        })
        setEditor(editor.map(v => v.key === key ? next(v) : v))
        setCurSelectedEl(next(curSelectedEl))
        antMsg.success('提交成功')
        handleContent('code')
    }
    return (
        <>
            <Divider orientation="left">编写事件处理</Divider>
            <div className="code-text">
                <p>在此处键入您的事件处理代码：</p>
                <TextArea
                    disabled={!curSelectedEl.flag}
                    bordered={false}
                    className="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                >
                </TextArea>
                <Button
                    ghost
                    block
                    disabled={!curSelectedEl.flag}
                    type="primary"
                    className="del-comp"
                    onClick={handleEvents}
                >完成</Button>
            </div>
        </>
    )
}

export default ComponentCode
