import store from '../../Store'
import { Slot, processEvents } from '../Libs/tool'

import './index.css'

/**
 * 预览有两种情况：
 * 1. 通过Link进行路由跳转
 *      此时会拿到画布中所有组件及各自的事件处理函数，所以这种情况下可以在预览时触发事件
 * 2. 手动输入路由进行跳转
 *      由于是本次存储的缘故，所以只会拿到画布中所有的组件，不包含它们各自的事件处理函数，所以这种情况下不会在预览时触发事件
 */

const Preview = props => {
    const editor = (props && props.location.state) || store.getItem()
    return (
        <div className="preview">
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
