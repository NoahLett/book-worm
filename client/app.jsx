import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import FAQ from './pages/faq';
import { parseRoute } from './lib';

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
    const { route } = this.state;
    if (route.path === '') {
      return <Home/>;
    }
    if (route.path === 'faq') {
      return <FAQ/>;
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage}
      </>
    );
  }
}
