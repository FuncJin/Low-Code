import store from '../../Store'
import { Slot, processEvents } from '../Libs/tool'

import './index.css'

const Preview = props => {
    // 通过跳转路径携带的参数/本地中拿到editor
    const editor = (props && props.location.state) || store.getItem()
    return (
        <div
            className="preview"
            style={{
                width: window.innerWidth,
                height: window.innerHeight,
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
    )
}

export default Preview
