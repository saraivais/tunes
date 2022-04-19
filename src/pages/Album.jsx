import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
    };
  }

  async componentDidMount() {
    await this.getSongs();
    this.separateArray();
  }

  async getSongs() {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    this.setState({ MusicSearchResult: results });
  }

  separateArray() {
    const { MusicSearchResult } = this.state;
    console.log(MusicSearchResult);
    const AlbumInfo = MusicSearchResult
      .filter(({ wrapperType }) => wrapperType !== 'track');
    console.log(AlbumInfo);
    this.setState({
      AlbumSongs: MusicSearchResult
        .filter(({ kind }) => kind === 'song'),
      AlbumName: AlbumInfo[0].collectionName,
      ArtistName: AlbumInfo[0].artistName,
      IsSearchDone: true,
    });
  }

  render() {
    const { IsSearchDone, AlbumSongs, AlbumName, ArtistName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { IsSearchDone
          && (
            <div>
              <h1 data-testid="artist-name">{ArtistName}</h1>
              <h2 data-testid="album-name">{AlbumName}</h2>
              {AlbumSongs
                .map(({ trackId, trackName, previewUrl }) => (<MusicCard
                  key={ trackId }
                  MusicName={ trackName }
                  MusicURL={ previewUrl }
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
