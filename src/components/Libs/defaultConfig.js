// 默认的配置、颜色、图标等
const colors = ['#000000', '#003865', '#EF5B0C', '#D4F6CC', '#3CCF4E', '#1A4D2E', '#FF9F29', '#FAF3E3', '#753188', '#01937C']

const defaultOriginCssStyle = {
    marginTop: '',
    marginRight: '',
    marginBottom: '',
    marginLeft: '',
    paddingTop: '',
    paddingRight: '',
    paddingBottom: '',
    paddingLeft: '',
    fontSize: '',
    lineHeight: '',
    fontWeight: '',
    letterSpacing: '',
    borderColor: '',
    backgroundColor: '',
    color: '',
}

const defaultStyleConfig = {
    size: {
        alias: '宽高',
        values: {},
        inValues: { size: ['width', 'height'] },
    },
    border: {
        alias: '边框',
        values: { borderColor: [...colors], },
        inValues: {}
    },
    padding: {
        alias: '内边距',
        values: {},
        inValues: { padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] },
    },
    margin: {
        alias: '外边距',
        values: {},
        inValues: { margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] },
    },
    font: {
        alias: '字体',
        values: { color: [...colors], },
        inValues: { size: ['fontSize', 'lineHeight'] },
    },
    background: {
        alias: '背景',
        values: { backgroundColor: [...colors], },
        inValues: {},
    },
}

export {
    colors,
    defaultOriginCssStyle,
    defaultStyleConfig,
}