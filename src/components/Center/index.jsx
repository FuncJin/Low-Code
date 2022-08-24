import { useState, useContext, useRef } from 'react'

import context from '../../Context'
import { Slot, processEvents, antMsg, screenDefaultWidth } from '../Libs/tool'
import LookMe from './LookMe'

import './index.css'

const Center = () => {
    const { editor, freshEl, setEditor, setFreshEl, setCurSelectedEl, canvasWidth } = useContext(context)
    // 记录最后的位置，防止发生位置错乱的情况
    const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 })
    // 存储将要获取的浮层相关方法
    const [handOver, setHandOver] = useState(null)
    // 是否选中
    const [selected, setSelected] = useState(false)
    const canvasRef = useRef()
    const { flag, key, originStyle } = freshEl
    // 鼠标在画布中被按下时，根据预先指定好的data-key，找出当前被按下的元素
    const handleMouseDown = e => {
        const path = e.nativeEvent.path
        const el = path.find(v => v.getAttribute && v.getAttribute('data-key'))
        if (!el) return
        const key = el.getAttribute('data-key')
        setFreshEl(editor.find(v => v.key === Number(key)))
    }
    // 改变浮层位置
    const handleMouseMove = e => {
        if (!flag) return
        const top = e.nativeEvent.offsetY
        const left = e.nativeEvent.offsetX
        handOver.top(top)
        handOver.left(left)
        setSelected(true)
    }
    document.onmouseup = () => {
        if (!flag && !selected) return
        changePosition(lastPosition)
        antMsg.warning('超出有效移动范围')
    }
    // 改变当前被拖拽组件的位置
    const changePosition = (position, require) => {
        handOver.top(0)
        handOver.left(-201)
        setSelected(false)
        setFreshEl({})
        // canvasRef用于获取当前选中元素的自带样式
        setCurSelectedEl({ ...freshEl, canvasRef: canvasRef.current.children })
        if (require) return
        const isHave = editor.find(v => v.key === key)
        if (!isHave) return setEditor([...editor, { ...freshEl, position }])
        const arrs = editor.map(v => v.key === key ? { ...v, position } : v)
        setEditor(arrs)
    }
    const handleMouseUp = e => {
        if (!flag) return
        e.preventDefault()
        e.stopPropagation()
        const top = parseFloat(handOver.ref.style.top)
        const left = parseFloat(handOver.ref.style.left)
        const curPosition = { top, left }
        // 自带事件被触发(发出了位置错乱)
        if (top <= -10 && left <= -101) {
            const { top, left } = lastPosition
            curPosition.top = top
            curPosition.left = left
            changePosition(true, true)
            return
        } else {
            // 否则记录当前位置
            setLastPosition({ top, left })
        }
        const position = { top: curPosition.top, left: curPosition.left }
        changePosition(position)
    }
    const handleOnclick = e => {
        e.preventDefault()
        e.stopPropagation()
        setSelected(false)
    }
    return (
        <div
            className="center"
            style={{
                width: `${screenDefaultWidth.pc + 13}px`
            }}
        >
            <div
                className="canvas"
                ref={canvasRef}
                style={{ width: `${canvasWidth}px` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <LookMe
                    setHandOver={setHandOver}
                    text={originStyle?.children}
                />
                {
                    selected ? (
                        <div
                            className="shield"
                            style={{
                                width: `${canvasRef.current.scrollWidth}px`,
                                height: `${canvasRef.current.scrollHeight}px`
                            }}
                        ></div>
                    ) : null
                }
                {
                    editor.map((v, i) => (
                        <Slot
                            className="static"
                            key={i}
                            data-key={i}
                            {...v.originStyle}
                            style={{ ...v.position, ...v.style }}
                            render={v.el}
                            onClick={e => processEvents(editor, i, 'onClick', e, handleOnclick)}
                        ></Slot>
                    ))
                }
            </div>
        </div>
    )
}

export default Center
