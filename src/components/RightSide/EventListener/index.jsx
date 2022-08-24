import { useContext } from 'react'
import { Select, Collapse } from 'antd'

import context from '../../../Context'

const { Option } = Select
const { Panel } = Collapse

const EventListener = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options, events } = curSelectedEl
    const selectChange = (_, { children }) => {
        const next = v => ({
            ...v,
            events: { [children]: null }
        })
        const newEditor = editor.map(v => v.key === key ? next(v) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl))
    }
    return (
        <Collapse
            className="classify-props"
            defaultActiveKey={[1]}
            ghost
        >
            <Panel
                header="添加事件"
                key={1}
            >
                <div className="props-module">
                    <Select
                        className="event-select"
                        key={events[0] || options.events[0]}
                        defaultValue={events[0] || options.events[0]}
                        onChange={selectChange}
                    >
                        {options.events.map((v, i) => <Option key={i}>{v}</Option>)}
                    </Select>
                </div>
            </Panel>
        </Collapse>
    )
}

export default EventListener
