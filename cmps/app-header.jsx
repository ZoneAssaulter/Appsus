const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isShowMenu: false,
    filterText: '',
    nameApp: '',
  }

  getNameApp = () => {
    const path = this.props.location.pathname
    const removeAfterIdx = path.indexOf('app')
    this.setState({ nameApp: path.substring(1, removeAfterIdx) })
  }

  render() {
    return (
      <header className='app-header'>
        <nav className='main-nav'>
          <Link to='/' className='logo'>
            <h1>Appsus</h1>
          </Link>
          <NavLink to='/keepapp' onClick={this.onToggleAppsMenu}>
            <div></div>
          </NavLink>
          <NavLink to='/mailapp' onClick={this.onToggleAppsMenu}>
            mail app
          </NavLink>
          <NavLink to='/bookapp' onClick={this.onToggleAppsMenu}>
            book app
          </NavLink>
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
