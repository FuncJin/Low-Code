// 所有组件的配置(自带的组件属性、css样式、绑定事件等)
import {
    Button,
    Typography,
    Tag,
    DatePicker,
    Pagination,
    Avatar,
    Empty,
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
const onMorePropsConfig = (v = {}) => ({ ...defaultStyleConfig, ...v })
const defaultCompName = alias => ({ alias, inValues: { text: ['children'] } })
const inMorePropsConfig = (v = {}) => ({ values: {}, inValues: {}, ...v })
const backOriginStyle = (v = {}) => ({ ...v })

const definedProps = {
    basisEl: {
        Button: {
            el: processOriginComp(Button, '按钮'),
            options: options('按钮组件', {
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
            }, ['onClick', 'onMouseMove'])
        },
        Title: {
            el: processOriginComp(Title, '标题'),
            options: options('标题组件', {
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
    navigation: {
        Pagination: {
            el: processOriginComp(Pagination, '分页'),
            options: options('分页组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('分页')) })
            }, {
                originStyle: {
                    disabled: {
                        alias: '禁用分页',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    hideOnSinglePage: {
                        alias: '只有一页时是否隐藏分页器',
                        values: {
                            hideOnSinglePage: ['false', 'true'],
                        }
                    },
                }
            }),
        },
    },
    dataEntry: {
        DatePicker: {
            el: processOriginComp(DatePicker, '选择框'),
            options: options('选择框组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('选择框')) })
            }, {
                originStyle: {
                    allowClear: {
                        alias: '清除按钮',
                        values: {
                            allowClear: ['true', 'false'],
                        }
                    },
                    bordered: {
                        alias: '显示边框',
                        values: {
                            bordered: ['true', 'false'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    inputReadOnly: {
                        alias: '只读',
                        values: {
                            inputReadOnly: ['false', 'true'],
                        }
                    },
                    mode: {
                        alias: '日期面板状态',
                        values: {
                            mode: ['time', 'date', 'month', 'year', 'decade'],
                        }
                    },
                    open: {
                        alias: '控制弹层是否展开',
                        values: {
                            open: ['true', 'false'],
                        }
                    },
                    picker: {
                        alias: '设置选择器类型',
                        values: {
                            picker: ['date', 'week', 'month', 'quarter', 'year'],
                        }
                    },
                    placement: {
                        alias: '选择框弹出的位置',
                        values: {
                            placement: ['topLeft', 'bottomLeft', 'bottomRight', 'topRight'],
                        }
                    },
                    size: {
                        alias: '输入框大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                    status: {
                        alias: '校验状态',
                        values: {
                            status: ['error', 'warning'],
                        }
                    },
                }
            }),
        },
    },
    dataShow: {
        Tag: {
            el: processOriginComp(Tag, 'tag'),
            options: options('Tag组件', {
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
            options: options('头像组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('头像')) })
            }),
        },
        Empty: {
            el: processOriginComp(Empty, '空状态'),
            options: options('空状态组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('空状态')) })
            })
        },
    },
    icons: processIcons()
}

const libs = [
    ['通用', definedProps.basisEl],
    ['导航', definedProps.navigation],
    ['数据录入', definedProps.dataEntry],
    ['数据展示', definedProps.dataShow],
    ['图标', definedProps.icons],
]

export default libs
