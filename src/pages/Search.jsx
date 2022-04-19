import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingPage from '../components/LoadingPage';
import AlbumDeck from '../components/AlbumDeck';

class Search extends React.Component {
  constructor() {
    super();

    this.enableButton = this.enableButton.bind(this);
    this.searchArtist = this.searchArtist.bind(this);

    this.state = {
      IsButtonOff: true,
      NameToSearch: '',
      IsSearching: false,
      SearchResults: '',
      LastNameSearched: '',
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

  async searchArtist() {
    const { NameToSearch } = this.state;
    const artistToSearch = NameToSearch;
    this.setState({ NameToSearch: '', IsSearching: true });
    const artistResults = await searchAlbumsAPI(artistToSearch);
    this.setState({
      SearchResults: artistResults,
      IsSearching: false,
      LastNameSearched: artistToSearch });
  }

  render() {
    const {
      IsButtonOff,
      NameToSearch,
      IsSearching,
      SearchResults,
      LastNameSearched,
    } = this.state;
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
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
        </div>
        { IsSearching ? <LoadingPage />
          : <AlbumDeck albumArray={ SearchResults } artistName={ LastNameSearched } />}
      </>);
  }
}

export default Search;
