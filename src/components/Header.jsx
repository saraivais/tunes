import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      recoveredName: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const getUserResult = await getUser();
    this.updateName(getUserResult.name);
  }

  updateName(string) {
    this.setState({
      recoveredName: string,
      isLoading: false,
    });
  }

  render() {
    const { recoveredName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        { isLoading ? <LoadingPage />
          : (
            <p data-testid="header-user-name">
              {`Hello, ${recoveredName}`}
            </p>)}
      </header>);
  }
}

export default Header;
