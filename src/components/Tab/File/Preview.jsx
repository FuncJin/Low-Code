import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import context from '../../../Context'
import store from '../../../Store'
import { antMsg } from '../../Libs/tool'

const Preview = () => {
    const { editor } = useContext(context)
    const autoSaveStore = () => {
        store.setItem(editor)
        antMsg.success('已自动保存至本地')
    }
    return (
        <Button
            type="text"
        >
            <Link
                to={{ pathname: "/preview", state: editor }}
                onClick={autoSaveStore}
            >预览</Link>
        </Button>
    )
}

export default Preview