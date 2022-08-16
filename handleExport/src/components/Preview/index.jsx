import { useRef, useState, useEffect } from 'react'

import libs from '../Libs'
import { Slot, processEvents } from '../Libs/tool'

import editor from './editor'

// 用于接收导出时，为每个组件添加el
const map = new Map(libs)
const result = editor.map(v => {
    const [classify, comp] = v.afterRender.split(' ')
    const el = map.get(classify)[comp].el
    v.el = el
    return v
})

const Preview = () => {
    const ref = useRef()
    const [wh, setWh] = useState({ width: '100%', height: '100%' })
    useEffect(() => {
        setWh({
            width: `${ref.current.scrollWidth}px`,
            height: `${ref.current.scrollHeight}px`,
        })
    }, [])
    return (
        <div
            className="main"
            ref={ref}
        >
            <div
                className="preview"
                style={{
                    width: wh.width,
                    height: wh.height
                }}
            >
                {
                    result.map((v, i) => (
                        <Slot
                            className="static"
                            key={i}
                            {...v.originStyle}
                            style={{ ...v.position, ...v.style }}
                            onClick={() => processEvents(result, i, 'onClick')}
                            render={v.el}
                        ></Slot>
                    ))
                }
            </div>
        </div>
    )
}

export default Preview
