// main.js
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import RouterMap from './router/router'
import '@/assets/styles/theme.less'
import '@/assets/styles/common.less'

/* eslint-disable no-new */
ReactDOM.render(
  <RouterMap />,
  document.getElementById('root')
)
