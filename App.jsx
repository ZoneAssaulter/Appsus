import { Home } from './pages/home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <section className='app'>
        {/* <AppHeader/> */}
        <main>
          <Switch>
            <Route component={Home} path='/' />
          </Switch>
        </main>
      </section>
    </Router>
  )
}
