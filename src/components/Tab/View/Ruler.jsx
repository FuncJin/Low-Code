import { useContext } from 'react'

import context from '../../../Context'

const Ruler = () => {
    const { rulerSwitch } = useContext(context)
    return (
        <span>{rulerSwitch ? '隐藏' : '显示'}标尺</span>
    )
}

export default Ruler