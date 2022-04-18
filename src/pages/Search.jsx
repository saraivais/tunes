import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.enableButton = this.enableButton.bind(this);

    this.state = {
      IsButtonOff: true,
      NameToSearch: '',
    };
  }

  enableButton({ target }) {
    const minimumLengthAllowed = 2;
    const { value } = target;
    this.setState({
      NameToSearch: value,
      IsButtonOff: (value.length < minimumLengthAllowed),
    });
  }

  render() {
    const { IsButtonOff, NameToSearch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            value={ NameToSearch }
            data-testid="search-artist-input"
            onChange={ this.enableButton }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ IsButtonOff }
          >
            Pesquisar
          </button>
        </div>
      </>);
  }
}

export default Search;
