import { useState } from 'react'
import { message } from 'antd'

import context from './Context'
import store from './Store'
import Tab from './components/Tab'
import LeftSide from './components/LeftSide'
import Center from './components/Center'
import RightSide from './components/RightSide'

// 存储前进与后退的历史数据
const backEditor = []
const forwardEditor = []
const defaultCurSideDrag = { flag: false, options: { moreProps: {}, originStyle: {} }, style: {}, originStyle: {}, events: [] }
const { success, warning, error } = message

const toSaveStore = editor => {
  store.setItem(editor)
  success('保存成功')
}
const handleClearStore = () => {
  store.remove()
  success('已清空')
}
const handleReadme = () => {
  warning('请F12自行查看GitHub仓库，内有详细说明文档')
  setTimeout(() => {
    success('我相信你能看明白README.md')
  }, 1000 * 2)
}

const App = () => {
  // editor表示画布中的所有组件
  const [editor, handleEditor] = useState(store.getItem())
  // freshEl代表要新生成的组件
  const [freshEl, setFreshEl] = useState({})
  const [canvasWidth, setCanvasWidth] = useState('100%')
  const [curSelectedEl, handleCurSelectedEl] = useState(defaultCurSideDrag)
  const { Provider } = context
  // 拦截所有修改editor的操作，并追加至历史记录
  const setEditor = oneSet => {
    backEditor.push(oneSet[oneSet.length - 1])
    handleEditor(oneSet)
  }
  const setCurSelectedEl = oneSet => {
    if (!oneSet) oneSet = defaultCurSideDrag
    handleCurSelectedEl(oneSet)
  }
  // 后退
  const handleBackEditor = () => {
    if (!backEditor.length) {
      error('暂时没有要后退的操作')
      return
    }
    forwardEditor.push(backEditor.pop())
    const discard = backEditor[backEditor.length - 1]
    const newData = backEditor.filter(v => v.key !== discard?.key)
    setCurSelectedEl((!discard) ? false : discard)
    handleEditor((!discard) ? [] : [...newData, discard])
    success('已后退一次操作')
  }
  // 前进
  const handleForwardEditor = () => {
    if (!forwardEditor.length) {
      error('暂时没有要前进的操作')
      return
    }
    const discard = forwardEditor.pop()
    backEditor.push(discard)
    const newData = forwardEditor.filter(v => v.key !== discard?.key)
    handleEditor((!editor.length) ? [discard] : [...newData, discard])
    setCurSelectedEl(discard)
    success('已前进一次操作')
  }
  const handleSaveStore = () => toSaveStore(editor)
  const topOperations = {
    editor, setEditor, freshEl, setFreshEl, canvasWidth, setCanvasWidth, curSelectedEl, setCurSelectedEl,
    handleBackEditor, handleForwardEditor, handleSaveStore, handleClearStore, handleReadme,
  }
  return (
    <section className="app">
      <Provider value={{ ...topOperations }}>
        <Tab />
        <div className="content">
          <LeftSide />
          <Center />
          <RightSide />
        </div>
      </Provider>
    </section >
  )
}

export default App
