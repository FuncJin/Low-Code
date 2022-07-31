import { useRef, useEffect } from 'react'

const LookMe = ({ setHandOver, text }) => {
    const ref = useRef()
    const changePosition = {
        top: v => ref.current.style.top = `${v - 30}px`,
        left: v => ref.current.style.left = `${v - 10}px`,
    }
    const handleMouseMove = e => {
        e.stopPropagation()
        const top = e.nativeEvent.target.style.top
        const left = e.nativeEvent.target.style.left
        changePosition.top(parseFloat(top) + e.nativeEvent.offsetY)
        changePosition.left(parseFloat(left) + e.nativeEvent.offsetX)
    }
    useEffect(() => {
        setHandOver({ ...changePosition, ref: ref.current })
        // eslint-disable-next-line
    }, [])
    return (
        <div
            className="look-me"
            onMouseMove={handleMouseMove}
            ref={ref}
        >{text}</div>
    )
}

export default LookMe