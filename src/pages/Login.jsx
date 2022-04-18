import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from '../components/LoadingPage';

class Login extends React.Component {
  constructor() {
    super();

    this.submitName = this.submitName.bind(this);
    this.enableButton = this.enableButton.bind(this);

    this.state = {
      IsButtonOff: true,
      NameInput: '',
      IsLoading: false,
      isFunctionDone: false,
    };
  }

  enableButton({ target }) {
    const mininumAcceptedLength = 3;
    const { value } = target;
    this.setState({
      NameInput: value,
      IsButtonOff: (value.length < mininumAcceptedLength),
    });
  }

  async submitName() {
    this.setState({ IsLoading: true, isFunctionDone: false });
    const { NameInput } = this.state;
    await createUser({ name: NameInput });
    this.setState({
      IsLoading: false,
      isFunctionDone: true,
    });
  }

  render() {
    const { IsButtonOff, NameInput, IsLoading, isFunctionDone } = this.state;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          value={ NameInput }
          data-testid="login-name-input"
          onChange={ this.enableButton }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ IsButtonOff }
          onClick={ this.submitName }
        >
          Entrar

        </button>
        { IsLoading && <LoadingPage /> }
        { isFunctionDone && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
