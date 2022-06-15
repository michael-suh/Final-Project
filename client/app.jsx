import React from 'react';
import Home from './pages/home';
import Catalog from './pages/catalog';
import parseRoute from './lib/parse-route';
import SellForm from './pages/sell-form';
import ItemDetails from './pages/item-details';
import SignUpForm from './pages/sign-up';
import LoginForm from './pages/log-in';
import jwtDecode from 'jwt-decode';
import Logout from './pages/log-out';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    }, false);
    const token = window.localStorage.getItem('jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Catalog items={this.state.items}/>;
    }

    if (route.path === 'sell') {
      return <SellForm />;
    }

    if (route.path === 'items') {
      const itemId = route.params.get('itemId');
      return <ItemDetails itemId={itemId} />;
    }

    if (route.path === 'user') {
      return <SignUpForm />;
    }

    if (route.path === 'login') {
      return <LoginForm />;
    }

    if (route.path === 'user') {
      return <Logout />;
    }
  }

  render() {
    return (
      <>
        <Home />
        {this.renderPage()}
      </>
    );
  }
}
