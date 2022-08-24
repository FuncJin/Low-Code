import { useContext } from 'react'
import { InputNumber, Input, Select, Collapse } from 'antd'

import context from '../../../Context'
import ShowColor from './ShowColor'

const { Option } = Select
const { Panel } = Collapse
const timer = { id: 0 }

// 获取某个dom身上的属性
const getCurProps = (HTMLCollection, style, key) => {
    const canvasChildren = [...HTMLCollection]
    // 从画布中找出当前被选中的组件的dom节点
    const el = canvasChildren.find(v => v.getAttribute('data-key') === String(key))
    // 获取当前dom节点的css样式
    const props = getComputedStyle(el)
    const obj = {}
    Object.keys(style).forEach(v => {
        const value = props[v]
        // 暂时只处理px
        const r = /px/ig.test(value)
        obj[v] = r ? parseFloat(value) : value
    })
    return obj
}

const Style = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options: { moreProps }, originStyle, style, canvasRef } = curSelectedEl
    const morePropsKey = Object.keys(moreProps)
    // 更改文字
    const handleChangeText = (e, prop) => {
        const { value } = e.target
        const next = v => ({
            ...v,
            originStyle: {
                ...v.originStyle,
                [prop]: value,
            }
        })
        const newEditor = editor.map(v => v.key === key ? next(v) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl))
    }
    // 处理数字
    const numberChange = (value, prop) => {
        clearTimeout(timer.id)
        timer.id = setTimeout(() => {
            const next = v => ({
                ...v,
                style: {
                    ...style,
                    [prop]: value,
                }
            })
            const newEditor = editor.map(v => v.key === key ? next(v) : v)
            setEditor(newEditor)
            setCurSelectedEl(next(curSelectedEl))
        }, 300)
    }
    // 多选框
    const selectChange = (value, prop) => {
        const next = v => ({
            ...v,
            style: {
                ...style,
                [prop]: value,
            }
        })
        const newEditor = editor.map(v => v.key === key ? next(v) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl))
    }
    // 得到当前组件的css属性
    const curProps = getCurProps(canvasRef, style, key)
    return (
        <Collapse
            defaultActiveKey={[0]}
            ghost
        >
            {
                morePropsKey.map((v, i) => {
                    const { alias, values, inValues } = moreProps[v]
                    const valuesKey = Object.keys(values)
                    const inValuesKey = Object.keys(inValues)
                    return (
                        <Panel
                            className="classify-props"
                            header={alias}
                            key={i}
                        >
                            <div className="props-module">
                                {
                                    inValuesKey.map(v => inValues[v].map((v2, i2) => (
                                        <div className="props-single" key={i2}>
                                            {
                                                v2 === 'children' ? (
                                                    <>
                                                        <span className="props-title">文字:</span>
                                                        <Input
                                                            className="input"
                                                            value={originStyle.children}
                                                            onChange={e => handleChangeText(e, v2)}
                                                        ></Input></>
                                                ) :
                                                    (
                                                        <>
                                                            <span className="props-title">{v2}:</span>
                                                            <InputNumber
                                                                className="input"
                                                                value={curSelectedEl.style[v2]}
                                                                defaultValue={curProps[v2]}
                                                                onChange={e => numberChange(e, v2)}
                                                            ></InputNumber>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    )))
                                }
                            </div>
                            <div className="props-module">
                                {
                                    valuesKey.map((v, i) => (
                                        <div className="props-single" key={i}>
                                            <span className="props-title">{valuesKey[i]}:</span>
                                            <Select
                                                className="input"
                                                size="middle"
                                                key={style[v] || values[valuesKey[i]]}
                                                defaultValue={curProps[v]}
                                                onChange={e => selectChange(values[v][e], v)}
                                            >
                                                {
                                                    values[valuesKey[i]].map((v2, i2) => (
                                                        <Option key={i2}>
                                                            {/color/ig.test(v) ? <ShowColor color={v2} /> : { v2 }}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    ))
                                }
                            </div>
                        </Panel>
                    )
                })
            }
        </Collapse>
    )
}

export default Style
