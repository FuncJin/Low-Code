// 尚未添加组件的输入及处理多层组件的情况，此文件作为备份存在(基本包含了所有的组件)
// 是 ./index.jsx 的超集

/**
 * 通用：
 *    按钮、标题
 * 导航：
 *    固钉、下拉菜单、分页
 * 数据录入：
 *    输入框、滑动输入条、开关、日期选择器、
 * 数据展示：
 *    头像、徽标、标签、日历、走马灯、空状态、图片、文字提示
 * 反馈：
 *    进度条、结果、加载
 */
 import {
    Button,
    Typography,
    Tag,
    DatePicker,
    Affix,
    Dropdown,
    Pagination,
    Input,
    Slider,
    Switch,
    Avatar,
    Badge,
    Calendar,
    Carousel,
    Empty,
    Image,
    Popover,
    Progress,
    Result,
    Spin,
} from 'antd'

import { defaultStyleConfig, colors } from './defaultConfig'

const { Title } = Typography
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
            })
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
        Affix: {
            el: processOriginComp(Affix, '固钉'),
            options: options('固钉组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('固钉')) })
            }),
        },
        Dropdown: {
            el: processOriginComp(Dropdown, '下拉菜单'),
            options: options('下拉菜单组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('下拉菜单')) })
            }, {
                originStyle: {
                    arrow: {
                        alias: '下拉箭头',
                        values: {
                            arrow: ['false', 'true'],
                        }
                    },
                    autoFocus: {
                        alias: '打开后自动聚焦下拉框',
                        values: {
                            autoFocus: ['false', 'true'],
                        }
                    },
                    disabled: {
                        alias: '菜单是否禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    destroyPopupOnHide: {
                        alias: '关闭后是否销毁下拉菜单',
                        values: {
                            destroyPopupOnHide: ['false', 'true'],
                        }
                    },
                    placement: {
                        alias: '菜单弹出位置',
                        values: {
                            placement: ['bottomLeft', 'bottom', 'bottomRight', 'top', 'topLeft', 'topRight'],
                        }
                    },
                }
            }),
        },
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
        Input: {
            el: processOriginComp(Input, '输入框'),
            options: options('输入框组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('输入框')) })
            }, {
                originStyle: {
                    allowClear: {
                        alias: '点击清除图标删除内容',
                        values: {
                            allowClear: ['true', 'false'],
                        }
                    },
                    bordered: {
                        alias: '边框',
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
                    status: {
                        alias: '校验状态',
                        values: {
                            status: ['error', 'warning'],
                        }
                    },
                    size: {
                        alias: '控件大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                }
            }),
        },
        Slider: {
            el: processOriginComp(Slider, '滑动输入条'),
            options: options('滑动输入条组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('滑动输入条')) })
            }, {
                originStyle: {
                    allowClear: {
                        alias: '支持清除(单选模式有效)',
                        values: {
                            allowClear: ['false', 'true'],
                        }
                    },
                    disabled: {
                        alias: '值为true时禁用滑块',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    dots: {
                        alias: '是否只能拖拽到刻度上',
                        values: {
                            dots: ['false', 'true'],
                        }
                    },
                    reverse: {
                        alias: '反向坐标轴',
                        values: {
                            reverse: ['false', 'true'],
                        }
                    },
                    vertical: {
                        alias: '垂直方向',
                        values: {
                            vertical: ['false', 'true'],
                        }
                    },
                }
            }),
        },
        Switch: {
            el: processOriginComp(Switch, '开关'),
            options: options('开关组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('开关')) })
            }, {
                originStyle: {
                    autoFocus: {
                        alias: '组件自动获取焦点',
                        values: {
                            autoFocus: ['false', 'true'],
                        }
                    },
                    checked: {
                        alias: '指定当前是否选中',
                        values: {
                            checked: ['false', 'true'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    loading: {
                        alias: '加载中的开关',
                        values: {
                            loading: ['false', 'true'],
                        }
                    },
                    size: {
                        alias: '控件大小',
                        values: {
                            size: ['default', 'small'],
                        }
                    },
                }
            }),
        },
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
        Badge: {
            el: processOriginComp(Badge, '徽标'),
            options: options('徽标组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('徽标')) })
            }, {
                originStyle: {
                    color: {
                        alias: '圆点颜色',
                        values: {
                            color: colors,
                        }
                    },
                    dot: {
                        alias: '不展示数字，只有一个圆点',
                        values: {
                            dot: ['false', 'true'],
                        }
                    },
                    showZero: {
                        alias: '当数值为 0 时，是否展示 Badge',
                        values: {
                            showZero: ['false', 'true'],
                        }
                    },
                    status: {
                        alias: '设置 Badge 为状态点',
                        values: {
                            status: ['default', 'success', 'processing', 'error', 'warning'],
                        }
                    },
                }
            }),
        },
        Calendar: {
            el: processOriginComp(Calendar, '日历'),
            options: options('日历组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('日历')) })
            }),
        },
        Carousel: {
            el: processOriginComp(Carousel, '走马灯组件'),
            options: options('走马灯组件组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('走马灯组件')) })
            }, {
                originStyle: {
                    autoplay: {
                        alias: '是否自动切换',
                        values: {
                            autoplay: ['false', 'true'],
                        }
                    },
                    dotPosition: {
                        alias: '面板指示点位置',
                        values: {
                            dotPosition: ['bottom', 'top', 'left', 'right'],
                        }
                    },
                }
            }),
        },
        Empty: {
            el: processOriginComp(Empty, '空状态'),
            options: options('空状态组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('空状态')) })
            })
        },
        Image: {
            el: processOriginComp(Image, '图片'),
            options: options('图片组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('图片')) })
            }, {
                originStyle: {
                    preview: {
                        alias: '预览参数',
                        values: {
                            preview: ['false', 'true'],
                        }
                    },
                }
            }),
        },
        Popover: {
            el: processOriginComp(Popover, '气泡卡片'),
            options: options('气泡卡片组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('气泡卡片')) })
            })
        },
    },
    feedback: {
        Progress: {
            el: processOriginComp(Progress, '进度条'),
            options: options('进度条组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('进度条')) })
            }, {
                originStyle: {
                    showInfo: {
                        alias: '是否显示进度数值或状态图标',
                        values: {
                            showInfo: ['false', 'true'],
                        }
                    },
                    status: {
                        alias: '状态',
                        values: {
                            status: ['success', 'exception', 'normal', 'active'],
                        }
                    },
                    stroke: {
                        alias: '进度条色彩',
                        values: {
                            stroke: colors,
                        }
                    },
                    strokeLinecap: {
                        alias: '进度条样式',
                        values: {
                            strokeLinecap: ['round', 'butt', 'square'],
                        }
                    },
                    trailColor: {
                        alias: '未完成的分段的颜色',
                        values: {
                            trailColor: colors,
                        }
                    },
                    type: {
                        alias: '类型',
                        values: {
                            type: ['line', 'circle', 'dashboard'],
                        }
                    },
                }
            }),
        },
        Result: {
            el: processOriginComp(Result, '结果'),
            options: options('结果组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('结果')) })
            }, {
                originStyle: {
                    status: {
                        alias: '状态',
                        values: {
                            status: ['info', 'success', 'error', 'warning', '404', '403', '500'],
                        }
                    },
                }
            }),
        },
        Spin: {
            el: processOriginComp(Spin, '加载'),
            options: options('加载组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('加载')) })
            }, {
                originStyle: {
                    size: {
                        alias: '组件大小',
                        values: {
                            size: ['default', 'large', 'small'],
                        }
                    },
                    spinning: {
                        alias: '是否为加载中',
                        values: {
                            spinning: ['true', 'false'],
                        }
                    },
                }
            }),
        },
    },
}

const libs = [
    ['通用', definedProps.basisEl],
    ['导航', definedProps.navigation],
    ['数据录入', definedProps.dataEntry],
    ['数据展示', definedProps.dataShow],
    ['反馈', definedProps.feedback],
]

export default libs
