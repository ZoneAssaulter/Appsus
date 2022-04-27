import { Home } from './pages/home.jsx'

import {BookApp} from './pages/book-app.jsx'
import { MailApp } from './pages/mail-app.jsx'
import { KeepApp } from './pages/keep-app.jsx'

import { AppHeader } from './cmps/app-header.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <main>
          <Switch>
            <Route component={BookApp} path='/bookapp' />
            <Route component={KeepApp} path='/keepapp' />
            <Route component={MailApp} path='/mailapp' />
            <Route component={Home} path='/' />
          </Switch>
        </main>
      </section>
    </Router>
  )
}
