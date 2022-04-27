

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return (
        <Router>
            <section className = "app">
            {/* <AppHeader/> */}
            <Switch>
               <Route component={Home} path="/home"/>
            </Switch>
            </section>
        </Router>
    )
}