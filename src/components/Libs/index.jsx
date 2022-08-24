// 所有组件的配置(自带的组件属性、css样式、绑定事件等)
import {
    Button,
    Typography,
    Tag,
    Avatar,
} from 'antd'

import { defaultStyleConfig, colors } from './defaultConfig'
import defaultIcons from './defaultIcons'

const { Title } = Typography
const processIcons = () => {
    const icons = {}
    const defaultIconsKey = Object.keys(defaultIcons)
    defaultIconsKey.forEach(v => {
        icons[v] = {
            el: processOriginComp(defaultIcons[v], v),
            options: options(`${v}图标`, {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName(v)) })
            })
        }
    })
    return icons
}
const processOriginComp = (Comp, text = '') => {
    return props => <Comp {...props} >{props?.children ? props?.children : text}</Comp>
}
const options = (name, more, origin, e) => {
    const moreProps = (more && { ...more }) || { ...onMorePropsConfig() }
    const originStyle = (origin && { ...origin }) || { originStyle: {} }
    const events = e || ['onClick']
    return {
        name,
        ...moreProps,
        ...originStyle,
        events
    }
}
const onMorePropsConfig = (v = {}) => ({ ...v, ...defaultStyleConfig, })
const defaultCompName = alias => ({ alias, inValues: { text: ['children'] } })
const inMorePropsConfig = (v = {}) => ({ values: {}, inValues: {}, ...v })
const backOriginStyle = (v = {}) => ({ ...v })

const definedProps = {
    basisEl: {
        Button: {
            el: processOriginComp(Button, '按钮'),
            options: options('按钮', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('按钮')) })
            }, {
                originStyle: backOriginStyle({
                    type: {
                        alias: '类型',
                        values: {
                            type: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
                        }
                    },
                    size: {
                        alias: '大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                    shape: {
                        alias: '形状',
                        values: {
                            shape: ['default', 'circle', 'round'],
                        }
                    },
                })
            }, ['onClick'])
        },
        Title: {
            el: processOriginComp(Title, '标题'),
            options: options('标题', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('标题')) })
            }, {
                originStyle: backOriginStyle({
                    type: {
                        alias: '文本类型',
                        values: {
                            type: ['secondary', 'success', 'warning', 'danger'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    mark: {
                        alias: '标记',
                        values: {
                            mark: ['false', 'true'],
                        }
                    },
                    delete: {
                        alias: '删除线',
                        values: {
                            delete: ['false', 'true'],
                        }
                    },
                    underline: {
                        alias: '下划线',
                        values: {
                            underline: ['false', 'true'],
                        }
                    },
                    strong: {
                        alias: '加粗',
                        values: {
                            strong: ['false', 'true'],
                        }
                    },
                })
            }),
        },
    },
    dataShow: {
        Tag: {
            el: processOriginComp(Tag, 'tag'),
            options: options('Tag', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('tag')) })
            }, {
                originStyle: {
                    closable: {
                        alias: '是否可关闭',
                        values: {
                            closable: ['false', 'true'],
                        }
                    },
                    color: {
                        alias: '标签色',
                        values: {
                            color: colors,
                        }
                    }
                }
            }),
        },
        Avatar: {
            el: processOriginComp(Avatar, '头像'),
            options: options('头像', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('头像')) })
            }),
        },
    },
    icons: processIcons()
}

const libs = [
    ['通用', definedProps.basisEl],
    ['数据展示', definedProps.dataShow],
    ['图标', definedProps.icons],
]

export default libs
