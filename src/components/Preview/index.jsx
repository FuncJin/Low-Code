import { useRef, useState, useEffect } from 'react'

import store from '../../Store'
import { Slot, processEvents } from '../Libs/tool'

import './index.css'

const Preview = props => {
    const ref = useRef()
    const [wh, setWh] = useState({ width: '100%', height: '100%' })
    // editor的来源
    const editor = (props && props.location.state) || store.getItem()
    useEffect(() => {
        setWh({
            width: `${ref.current.scrollWidth}px`,
            height: `${ref.current.scrollHeight}px`,
        })
    }, [])
    return (
        <div
            className="main preview-bgc"
            ref={ref}
        >
            <div
                className="preview preview-bgc"
                style={{
                    width: wh.width,
                    height: wh.height
                }}
            >
                {
                    editor.map((v, i) => (
                        <Slot
                            key={i}
                            {...v.originStyle}
                            style={{ ...v.position, ...v.style }}
                            onClick={() => processEvents(editor, i, 'onClick')}
                            render={v.el}
                        ></Slot>
                    ))
                }
            </div>
        </div>
    )
}

export default Preview