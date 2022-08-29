import { useRef, useEffect } from 'react'

// 在画布中拖拽组件时，跟随鼠标移动的浮层
const LookMe = ({ setHandOver, text }) => {
    const ref = useRef()
    // 修改浮层位置的方法
    const changePosition = {
        top: v => ref.current.style.top = `${v - 30}px`,
        left: v => ref.current.style.left = `${v - 10}px`,
    }
    // 当鼠标移动至浮层时，如何处理
    const handleMouseMove = e => {
        e.stopPropagation()
        const top = e.nativeEvent.target.style.top
        const left = e.nativeEvent.target.style.left
        changePosition.top(parseFloat(top) + e.nativeEvent.offsetY)
        changePosition.left(parseFloat(left) + e.nativeEvent.offsetX)
    }
    // 向上传递浮层的相关方法
    useEffect(() => {
        setHandOver({ ...changePosition, ref: ref.current })
        // eslint-disable-next-line
    }, [])
    return (
        <div
            className="look-me"
            onMouseMove={handleMouseMove}
            ref={ref}
        >
            {text}
        </div>
    )
}

export default LookMe