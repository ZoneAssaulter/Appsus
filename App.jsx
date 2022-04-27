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
              <Home />
            {/* <Route component={Home} path='/' /> */}
          </Switch>
        </main>
      </section>
    </Router>
  )
}
