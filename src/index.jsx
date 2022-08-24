import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import NotFound from './components/NotFound'
import Preview from './components/Preview'

console.log('GitHub', 'https://github.com/FuncJin/Low-Code')

const _vm = (
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path="/preview" component={Preview} />
        <Route path="/" component={App} exact />
        <Route path="/*" component={NotFound} />
      </Switch>
    </HashRouter>
  </React.StrictMode>
)

ReactDOM.render(_vm, document.querySelector('#root'))
