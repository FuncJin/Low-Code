import React, { useState, useContext } from 'react'
import { Divider, Collapse } from 'antd'

import libs from '../../Libs'
import { defaultOriginCssStyle } from '../../Libs/defaultConfig'
import context from '../../../Context'

import './index.css'

const { Panel } = Collapse

const ComponentLib = ({ handleContent }) => {
    const { editor, setFreshEl } = useContext(context)
    const [move, setMove] = useState(false)
    const handleMouseDown = () => setMove(true)
    const handleMouseMove = (comp, v, C) => {
        if (!move) return
        const style = { width: '', height: '', ...defaultOriginCssStyle }
        const afterRender = `${v} ${C}`
        const { el, options } = comp
        // 代表新生成的组件(从组件区派发至画布区)
        setFreshEl({
            flag: true,
            el,
            afterRender,
            key: editor.length,
            style,
            originStyle: {
                children: options.moreProps.text.alias,
            },
            options,
            events: { [options.events[0]]: null },
        })
        setMove(false)
        handleContent('lib')
    }
    return (
        <>
            <Divider orientation="left">组件库</Divider>
            <Collapse
                className="one-set"
                ghost={true}
                bordered={false}
                activeKey={[...Object.keys(libs)]}
            >
                {
                    libs.map((v, classifyIndex) => (
                        <Panel header={v[0]} key={classifyIndex}>
                            <div className="libs-container">
                                {
                                    Object.keys(v[1]).map((Comp, oneIndex) => (
                                        <div
                                            className="el-comp"
                                            key={oneIndex}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={(e) => handleMouseMove(v[1][Comp], v[0], Comp)}
                                        >
                                            <div>{v[1][Comp].el()}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Panel>
                    ))
                }
            </Collapse>
        </>
    )
}

export default ComponentLib
