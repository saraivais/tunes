import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingPage from '../components/LoadingPage';
import FavoriteListing from '../components/FavoriteListing';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      AllFavs: [],
      IsLoadingFavs: false,
      AreThereFavsYet: false,
    };
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  async updateSongs() {
    const newFavs = await getFavoriteSongs();
    this.setState({ AllFavs: newFavs });
  }

  async recoverFavorites() {
    this.setState({
      IsLoadingFavs: true,
      AreThereFavsYet: false,
    });
    const recoveredSongs = await getFavoriteSongs();
    this.setState({
      AllFavs: recoveredSongs,
      IsLoadingFavs: false,
      AreThereFavsYet: true,
    });
  }

  render() {
    const { IsLoadingFavs, AllFavs, AreThereFavsYet } = this.state;
    return (
      <>
        <Header />
        {IsLoadingFavs ? <LoadingPage />
          : (AreThereFavsYet
            && (
              <div data-testid="page-favorites">
                <h1>Músicas Favoritas</h1>
                <FavoriteListing
                  FavSongs={ AllFavs }
                  ClickFunc={ () => this.updateSongs() }
                />
              </div>))}
      </>);
  }
}

export default Favorites;
