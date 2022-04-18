import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.enableButton = this.enableButton.bind(this);

    this.state = {
      IsButtonOff: true,
      NameInput: '',
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

  render() {
    const { IsButtonOff, NameInput } = this.state;

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
        >
          Entrar

        </button>
      </div>
    );
  }
}

export default Login;
