import { useContext } from 'react'
import { Divider, InputNumber, Input, Select } from 'antd'

import context from '../../../Context'

const { Option } = Select
const timer = { id: 0 }

const Style = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options: { moreProps }, originStyle, style } = curSelectedEl
    const morePropsKey = Object.keys(moreProps)
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
    return <>
        {
            morePropsKey.map((v, i) => {
                const { alias, values, inValues } = moreProps[v]
                const valuesKey = Object.keys(values)
                const inValuesKey = Object.keys(inValues)
                return (
                    <div className="classify-props" key={i}>
                        <Divider className="prop-divider" orientation={i % 2 !== 0 ? 'right' : 'left'} plain>{alias}</Divider>
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
                                        <Select className="input"
                                            size="middle"
                                            key={style[v] || values[valuesKey[i]]}
                                            defaultValue={style[v] || values[valuesKey[i]]}
                                            onChange={e => selectChange(values[v][e], v)}
                                        >
                                            {
                                                values[valuesKey[i]].map((v2, i2) => {
                                                    return <Option key={i2}>{v2}</Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            })
        }
    </>
}

export default Style
