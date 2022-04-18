import React from 'react';
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
        { isLoading ? <LoadingPage />
          : (
            <p data-testid="header-user-name">
              Hello,
              {' '}
              {recoveredName}
            </p>)}
      </header>);
  }
}

export default Header;
