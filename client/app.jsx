import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import FAQ from './pages/faq';
import Registration from './pages/sign-up';
import parseRoute from './lib/parse-route';
import topics from './lib/data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.onhashchange = update => {
      const parsed = parseRoute(window.location.hash);
      this.setState({ route: parsed });
    };
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
  }

  render() {
    return (
      <div className='container'>
        <Header/>
        { this.renderPage() }
      </div>
    );
  }
}
