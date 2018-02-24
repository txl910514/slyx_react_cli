import React from 'react'

import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

class ForbiddenIndex extends React.Component {
  state= {
    loading: false
  }
  componentDidMount = () => {
  }
  render () {
    return (
      <div className="forbidden-index">
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>
            <Link to={`/dashboard`}><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>无权限</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ width: 500, margin: '90px auto auto auto', padding: 15, background: '#fff', boxShadow: '0 0 10px 2px #ddd' }}>
          <div className="box">
            <header
              style={{ textAlign: 'center', color: '#c00', marginBottom: 20, fontSize: 18 }}
            >
              拒绝访问该页面
            </header>
            <section style={{ textAlign: 'center', fontSize: 14 }}>
              请确认您已经登录该系统，并且具有访问此页面的权限。<br />
              或者联系系统管理员并报告此错误。
            </section>
            <footer style={{ padding: '15px 0', textAlign: 'right', paddingBottom: 0 }}>
              ---医信云服
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default ForbiddenIndex
