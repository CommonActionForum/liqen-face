import React from 'react'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import Dumb from './components/Dumb'
import Facts from './containers/Facts'
import SingleFact from './containers/SingleFact'

const Root = ({store}) => (
  <Provider store={store}>
    <div>
      <nav className='navbar navbar-inverse bg-inverse'>
        <a className='navbar-brand' href="/">Liqen Dashboard</a>
      </nav>
      <Switch>
        <Route exact path="/" component={Dumb} />
        <Route exact path='/facts' component={Facts} />
        <Route path='/facts/:id' component={SingleFact} />
    </Switch>
    </div>
  </Provider>
)

export default Root