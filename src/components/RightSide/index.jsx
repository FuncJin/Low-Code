import { useState, useContext, useEffect } from 'react'
import { Typography, Segmented, Button, Popconfirm } from 'antd'

import Property from './Property'
import Style from './Style'
import EventListener from './EventListener'
import NoneProp from './NoneProp'
import context from '../../Context'

import './index.css'

const { Title } = Typography
const belong = {
    '属性': {
        name: 'o-s-p',
        comp: Property
    },
    '样式': {
        name: 'o-s-s-l',
        comp: Style
    },
    '事件': {
        name: 'o-s-e',
        comp: EventListener
    }
}
const render = Comp => <Comp />

const RightSide = () => {
    const [curSegmented, setCurSegmented] = useState('属性')
    const { curSelectedEl, editor, setEditor, setCurSelectedEl, freshEl } = useContext(context)
    const { flag, key, options: { name } } = curSelectedEl
    const [preLeft, setPreLeft] = useState('o-s-p')
    const handleDel = () => {
        const newEditor = editor.filter(v => v.key !== key)
        setEditor(newEditor)
        setCurSelectedEl(false)
    }
    const handleCurSegmented = e => {
        const clasify = [['属性', 'o-s-s-l'], ['事件', 'o-s-s-r']]
        const cur = clasify.find(v => v[0] === curSegmented)
        setPreLeft(cur ? cur[1] : belong[e].name)
        setCurSegmented(e)
    }
    useEffect(() => {
        // 当出现新生成的组件时，自动恢复至属性选项卡
        return () => handleCurSegmented('属性')
        // eslint-disable-next-line
    }, [freshEl])
    return (
        <div className="right-side">
            {
                !flag ? <NoneProp /> : (
                    <>
                        <Title level={4} className="classify-title">『{name}』组件</Title>
                        <div className="classify">
                            <Segmented
                                block
                                options={['属性', '样式', '事件']}
                                defaultValue="属性"
                                value={curSegmented}
                                onChange={e => handleCurSegmented(e)}
                            />
                            <div className={`one-set ${preLeft}`}>
                                {render(belong[curSegmented].comp)}
                            </div>
                        </div>
                        <div className="c-del">
                            <Popconfirm
                                placement="top"
                                title="确定要删除当前组件吗？"
                                okText="删除"
                                showCancel={false}
                                onConfirm={handleDel}
                            >
                                <Button
                                    danger
                                    className="del-comp"
                                >删除</Button>
                            </Popconfirm>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default RightSide
