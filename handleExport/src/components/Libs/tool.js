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
export { Slot, processEvents, toEvent }
