import { useState, useContext } from 'react'
import { Typography, Segmented, Button } from 'antd'

import Property from './Property'
import Style from './Style'
import EventListener from './EventListener'
import NoneProp from './NoneProp'
import context from '../../Context'

import './index.css'

const { Title } = Typography
const belong = { '属性': Property, '样式': Style, '事件': EventListener }
const render = Comp => <Comp />

const RightSide = () => {
    const [curSegmented, setCurSegmented] = useState('属性')
    const { curSelectedEl, editor, setEditor, setCurSelectedEl } = useContext(context)
    const { flag, key, options: { name } } = curSelectedEl
    const handleDel = () => {
        const newEditor = editor.filter(v => v.key !== key)
        setEditor(newEditor)
        setCurSelectedEl(false)
    }
    return (
        <div className="right-side">
            {
                !flag ? <NoneProp /> : (
                    <>
                        <div className="classify">
                            <Title level={4}>{name}</Title>
                            <Segmented block
                                options={['属性', '样式', '事件']}
                                onChange={e => setCurSegmented(e)}
                            />
                            <div className="one-set">
                                {render(belong[curSegmented])}
                            </div>
                        </div>
                        <Button
                            danger
                            className="del-comp"
                            onClick={handleDel}
                        >删除</Button>
                    </>
                )
            }
        </div >
    )
}

export default RightSide
