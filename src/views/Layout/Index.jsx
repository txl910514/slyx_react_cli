// import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, LocaleProvider, Tooltip } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
// import queryString from 'query-string'
// import axios from 'axios'
// const confirm = Modal.confirm

const { Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  render () {
    const menus = []

    menus.push(
      <Menu.Item key="omtool">
        <Icon type="medicine-box" />
        <span>运营工具</span>
        <Link to={`/injector/omtool`} />
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="dashboard">
        <Icon type="pie-chart" />
        <span>我的工作台</span>
        <Link to={`/dashboard`} />
        {/* <Link to={`/injector/dashboard`} /> */}
      </Menu.Item>
    )
    // <Menu.Item key="system-custom-fields"><Link onClick={() => this.pageNavigate('/system/custom-fields')} to={`/nop`} >字段自定义</Link></Menu.Item> : null

    menus.push(
      <Menu.Item key="edw">
        <Icon type="switcher" />
        <span>医信精盘</span>
        <Link to={`/edw`} />
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="prep">
        <Link onClick={() => this.pageNavigate('/injector/prep')} to={`/nop`} ><Icon type="api" /><span>医院实施</span></Link>
        {/* <Link to={`/injector/prep`} /> */}
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="house">
        <Icon type="switcher" />
        <span>房屋档案</span>
        <Link to={`/house`} />
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="item">
        <Icon type="paper-clip" />
        <span>设备档案</span>
        <Link to={`/item`} />
        {/* <Link to={`/injector/item`} /> */}
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="ticket">
        <Icon type="tool" />
        <span>维修管理</span>
        <Link to={`/ticket`} />
        {/* <Link to={`/injector/ticket`} /> */}
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="quality">
        <Icon type="safety" />
        <span>质控管理</span>
        <Link to={`/injector/quality`} />
      </Menu.Item>
    )

    menus.push(
      <SubMenu
        key="document"
        title={<span><Icon type="folder" /><span>文档管理</span></span>}
      >
        <Menu.Item key="document-contract">
          <Link to={`/document/contract`}>合同</Link>
        </Menu.Item>
        <Menu.Item key="document-invoice">
          <Link to={`/document/invoice`}>发票</Link>
        </Menu.Item>
        <Menu.Item key="document-bill">
          <Link to={`/document/bill`}>单据</Link>
        </Menu.Item>
        <Menu.Item key="document-instructions">
          <Link to={`/document/instructions`}>使用说明</Link>
        </Menu.Item>
        <Menu.Item key="document-quality">
          <Link to={`/document/quality`}>强检</Link>
        </Menu.Item>
        <Menu.Item key="document-other">
          <Link to={`/document/other`}>其他</Link>
        </Menu.Item>
      </SubMenu>
    )
    // menus.push(
    //   <Menu.Item key="document">
    //     <Icon type="folder" />
    //     <span>文档管</span>
    //     <Link to={`/injector/document`} />
    //   </Menu.Item>
    // )

    menus.push(
      <Menu.Item key="idle">
        <Icon type="notification" />
        <span>闲置设备平台</span>
        <Link to={`/idle`} />
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="supplier">
        <Icon type="solution" />
        <span>供应商管理</span>
        <Link to={`/supplier`} />
      </Menu.Item>
    )

    menus.push(
      <Menu.Item key="user-list">
        <Icon type="user" />
        <span>人员管理</span>
        <Link to={`/user/list`} />
      </Menu.Item>
    )

    menus.push(
      <SubMenu
        key="system"
        title={<span><Icon type="setting" /><span>系统配置</span></span>}
      >
        <Menu.Item key="document-contract">
          <Link to={`/document/contract`}>合同</Link>
        </Menu.Item>
        <Menu.Item key="document-invoice">
          <Link to={`/document/invoice`}>发票</Link>
        </Menu.Item>
        <Menu.Item key="document-bill">
          <Link to={`/document/bill`}>单据</Link>
        </Menu.Item>
        <Menu.Item key="document-instructions">
          <Link to={`/document/instructions`}>使用说明</Link>
        </Menu.Item>
        <Menu.Item key="document-quality">
          <Link to={`/document/quality`}>强检</Link>
        </Menu.Item>
        <Menu.Item key="document-other">
          <Link to={`/document/other`}>其他</Link>
        </Menu.Item>
      </SubMenu>
    )

    return (
      <LocaleProvider locale={zhCN}>
        <Layout className="app-layout">
          <Sider collapsedWidth={64}>
            <div className="logo">
              1
            </div>
            <div className="member-at-bottom">
              <div className="wrapper">
                <span className="btn-logout">
                  <Icon type="logout" />
                </span>
                <Tooltip visible placement="rightBottom" title={() => {
                  return (<div>
                    <p>新功能上线了啦~</p>
                    <hr />
                    <p>点击这里进入【个人中心】</p>
                  </div>)
                }}>
                  <span className="member-name">
                    <Link style={{color: 'rgba(255, 255, 255, 0.67)'}} to={`/member-center`}>1</Link>
                  </span>
                </Tooltip>
              </div>
            </div>
            <Menu
              style={{marginBottom: 30}}
              theme="dark"
              mode="inline"
            >
              { menus }
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px', height: '100%' }}>
              { this.props.children || null }
            </Content>
            <Footer style={{ textAlign: 'center', display: 'none' }} />
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default withRouter(App)
