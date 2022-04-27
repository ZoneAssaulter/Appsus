const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {}

  

  render() {
    return (
      <header className='app-header'>
        <Link to='/' className='logo'>
          <h1>Appsus</h1>
        </Link>
        <NavLink to='/keepapp'>keep app</NavLink>
        <NavLink to='/mailapp'>mail app</NavLink>
        <NavLink to='/bookapp'>book app</NavLink>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
