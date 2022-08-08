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
    return (
        <div className="preview">
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
    )
}

export default Preview
