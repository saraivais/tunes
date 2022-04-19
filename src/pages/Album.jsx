import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.getSongs = this.getSongs.bind(this);

    this.state = {
      MusicSearchResult: '',
      AlbumSongs: '',
      AlbumName: '',
      ArtistName: '',
      IsSearchDone: false,
      IsGettingFavs: true,
      AllFavSongs: '',
    };
  }

  async componentDidMount() {
    await this.getSongs();
    this.separateArray();
    this.recoverFavs();
  }

  async getSongs() {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    this.setState({ MusicSearchResult: results });
  }

  separateArray() {
    const { MusicSearchResult } = this.state;
    const AlbumInfo = MusicSearchResult
      .filter(({ wrapperType }) => wrapperType !== 'track');
    this.setState({
      AlbumSongs: MusicSearchResult
        .filter(({ kind }) => kind === 'song'),
      AlbumName: AlbumInfo[0].collectionName,
      ArtistName: AlbumInfo[0].artistName,
      IsSearchDone: true,
    });
  }

  async recoverFavs() {
    this.setState({ IsGettingFavs: true });
    const FavSongsArray = await getFavoriteSongs();
    this.setState({
      IsGettingFavs: false,
      AllFavSongs: FavSongsArray,
    });
  }

  render() {
    const {
      IsSearchDone,
      AlbumSongs,
      AlbumName,
      ArtistName,
      IsGettingFavs,
      AllFavSongs } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          {(IsSearchDone && !IsGettingFavs)
            && (
              <div>
                <h1 data-testid="artist-name">{ArtistName}</h1>
                <h2 data-testid="album-name">{AlbumName}</h2>
                {AlbumSongs
                  .map((songObject) => (<MusicCard
                    key={ songObject.trackId }
                    entireObject={ songObject }
                    MusicName={ songObject.trackName }
                    MusicURL={ songObject.previewUrl }
                    MusicId={ songObject.trackId }
                    AllFavs={ AllFavSongs }
                  />)) }
              </div>)}
        </div>
      </>);
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
