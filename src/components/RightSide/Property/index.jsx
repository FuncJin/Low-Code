import { useContext } from 'react'
import { Select, Empty, Collapse } from 'antd'

import context from '../../../Context'
import { transformType } from '../../Libs/tool'

const { Panel } = Collapse
const { Option } = Select

const Property = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options, originStyle } = curSelectedEl
    const originStyleKey = Object.keys(options.originStyle)
    const selectChange = (value, prop) => {
        const next = (v, f) => ({
            ...v,
            originStyle: {
                ...v.originStyle,
                [prop]: f ? transformType(value) : value,
            }
        })
        const newEditor = editor.map(v => v.key === key ? next(v, true) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl, false))
    }
    return <>
        {
            !originStyleKey.length ? <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                description={<span>当前组件暂无内置属性</span>}
            /> : null
        }
        <Collapse
            defaultActiveKey={[0]}
            ghost
        >
            {
                originStyleKey.map((v, i) => {
                    const { alias, values } = options.originStyle[v]
                    const valuesKey = Object.keys(values)
                    return (
                        <Panel
                            className="classify-props"
                            header={alias}
                            key={i}
                        >
                            <div className="props-module">
                                {
                                    valuesKey.map((v, i) => (
                                        <div className="props-single" key={i}>
                                            <span className="props-title">{valuesKey[i]}:</span>
                                            <Select className="input"
                                                size="middle"
                                                key={originStyle[v] || values[valuesKey[i]]}
                                                defaultValue={originStyle[v] || values[valuesKey[i]]}
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
                        </Panel>
                    )
                })
            }
        </Collapse>
    </>
}

export default Property
