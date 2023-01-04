import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import Header from './components/header';
import Home from './pages/home';
import FAQ from './pages/faq';
import Registration from './pages/sign-up';
import Authentication from './pages/sign-in';
import parseRoute from './lib/parse-route';
import topics from './lib/data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.onhashchange = update => {
      const parsed = parseRoute(window.location.hash);
      this.setState({ route: parsed });
    };
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home/>;
    }
    if (path === 'faq') {
      return <FAQ topics={topics}/>;
    }
    if (path === 'sign-up') {
      return <Registration/>;
    }
    if (path === 'sign-in') {
      return <Authentication/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };
    return (
      <AppContext.Provider value={contextValue}>
        <div className='main-container'>
          <Header/>
          { this.renderPage() }
        </div>
      </AppContext.Provider>
    );
  }
}
