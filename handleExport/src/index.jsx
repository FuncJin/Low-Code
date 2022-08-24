import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const _vm = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(_vm, document.querySelector('#root'))
