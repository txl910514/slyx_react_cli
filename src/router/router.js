import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

import App from '@/views/Layout/Index'
import LoadingComponent from '@/components/Common/LoadingComponent'

const routers = [
  {
    path: '/loading',
    component: () => import('@/views/Forbidden/Loading')
  }
]

class RouteMap extends React.Component {
  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/loading" />)} />
            {
              routers.map(({ path, component }, key) => (
                <Route
                  key={key}
                  exact
                  path={path}
                  component={Loadable({
                    loader: component,
                    loading: LoadingComponent
                  })}
                />
              ))
            }
          </Switch>
        </App>
      </Router>
    )
  }
}

export default RouteMap
