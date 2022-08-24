import { useState } from 'react'

import context from './Context'
import store from './Store'
import Tab from './components/Tab'
import LeftSide from './components/LeftSide'
import Center from './components/Center'
import RightSide from './components/RightSide'
import { antMsg, screenDefaultWidth } from './components/Libs/tool'

// 存储前进与后退的历史数据
const backEditor = []
const forwardEditor = []
const defaultCurSideDrag = { flag: false, options: { moreProps: {}, originStyle: {} }, style: {}, originStyle: {}, events: [] }
const { success, error } = antMsg

const toSaveStore = editor => {
  store.setItem(editor)
  success('保存成功')
}

const App = () => {
  // editor表示画布中的所有组件
  const [editor, handleEditor] = useState(store.getItem())
  // freshEl代表要新生成的组件
  const [freshEl, setFreshEl] = useState({})
  // 画布区域的宽度
  const [canvasWidth, setCanvasWidth] = useState(screenDefaultWidth.pc)
  // 当前选中的组件
  const [curSelectedEl, handleCurSelectedEl] = useState(defaultCurSideDrag)
  // 导出与下载，true代表导出；false代表下载
  const [status, setStatus] = useState(true)
  const { Provider } = context
  // 拦截所有修改editor的操作，并追加至历史记录
  const setEditor = oneSet => {
    setStatus(true)
    backEditor.push(oneSet[oneSet.length - 1])
    handleEditor(oneSet)
  }
  const setCurSelectedEl = oneSet => {
    if (!oneSet) oneSet = defaultCurSideDrag
    handleCurSelectedEl(oneSet)
  }
  // 后退
  const handleBackEditor = () => {
    if (!backEditor.length) return error('暂时没有要后退的操作')
    forwardEditor.push(backEditor.pop())
    const discard = backEditor[backEditor.length - 1]
    const newData = backEditor.filter(v => v.key !== discard?.key)
    setCurSelectedEl((!discard) ? false : discard)
    handleEditor((!discard) ? [] : [...newData, discard])
    success('已后退一次操作')
  }
  // 前进
  const handleForwardEditor = () => {
    if (!forwardEditor.length) return error('暂时没有要前进的操作')
    const discard = forwardEditor.pop()
    backEditor.push(discard)
    const newData = editor.filter(v => v.key !== discard?.key)
    handleEditor((!editor.length) ? [discard] : [...newData, discard])
    setCurSelectedEl(discard)
    success('已前进一次操作')
  }
  // 清空内容
  const handleClearContent = (flag) => {
    store.remove()
    if (flag) {
      handleEditor([])
      backEditor.splice(0, backEditor.length)
      forwardEditor.splice(0, forwardEditor.length)
    }
    success('已清空')
  }
  const handleSaveStore = () => toSaveStore(editor)
  const topOperations = {
    status, setStatus,
    editor, setEditor, freshEl, setFreshEl, canvasWidth, setCanvasWidth, curSelectedEl, setCurSelectedEl,
    handleBackEditor, handleForwardEditor, handleSaveStore, handleClearContent,
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
