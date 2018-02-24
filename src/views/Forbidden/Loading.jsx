import React from 'react'
import './Loading.less'

class Loading extends React.Component {
  state= {
    timeid: 0
  }
  componentDidMount = () => {
  }
  componentWillReceiveProps (nextProps) {
  }
  render () {
    return (
      <div className="app-loading">
        <div className="loading">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
        <center>加载中...</center>
      </div>
    )
  }
}

export default Loading
