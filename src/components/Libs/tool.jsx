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

// 用于导出时对editor进行处理
const needDelKeys = ['flag', 'key', 'options']
const needCheckKeys = ['style', 'events']
const delKeys = obj => {
    const objKeys = Object.keys(obj)
    objKeys.forEach(k => { if (!obj[k]) delete obj[k] })
}
const cutEditor = editor => {
    const genuineData = []
    editor.forEach(preObj => {
        const nextObj = { ...preObj }
        needDelKeys.forEach(k => delete nextObj[k])
        needCheckKeys.forEach(k => delKeys(nextObj[k]))
        genuineData.push(nextObj)
    })
    return genuineData
}

export { Slot, processEvents, toEvent, transformType, antMsg, cutEditor }