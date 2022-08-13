import { message } from 'antd'

const Slot = props => <>{props.render({ ...props, render: null })}</>
// 事件处理
const processEvents = (editor, key, name, e = {}, fn = Function.prototype) => {
    const handle = editor.find(v => v.key === key)
    const eventFn = handle?.events[name]?.fn || toEvent(handle?.events[name]?.code)
    eventFn && eventFn()
    fn(e, key)
}
const toEvent = code => {
    return () => {
        try {
            // eslint-disable-next-line
            const r = eval(code)
            return r
        } catch (e) {
            return alert(e.message)
        }
    }
}
const checkBool = value => [
    [/^true$/, true],
    [/^false$/, false],
    [/.*/g, value]
]
const transformType = value => checkBool(value).find(([reg]) => reg.test(value))[1]

const antMsg = {
    success: (text, flag) => {
        if (flag) return message.success(text)
        message.success(text)
    },
    error: (text, flag) => {
        if (flag) return message.error(text)
        message.error(text)
    },
    warning: (text, flag) => {
        if (flag) return message.warning(text)
        message.warning(text)
    },
}

export { Slot, processEvents, toEvent, transformType, antMsg }