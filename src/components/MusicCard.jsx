import React from 'react';
import propTypes from 'prop-types';
import LoadingPage from './LoadingPage';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.sendSongToFavorites = this.sendSongToFavorites.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);

    this.state = {
      IsSendingSong: false,
      CheckboxChecked: false,
    };
  }

  componentDidMount() {
    this.IsThisAFav();
  }

  handleCheckbox({ target }) {
    const { entireObject, ClickFunction } = this.props;
    const value = target.checked;
    this.setState({
      CheckboxChecked: value,
    });
    if (value) {
      this.sendSongToFavorites(entireObject);
    } else {
      this.removeSongFromFavorites(entireObject);
    }
    ClickFunction();
  }

  IsThisAFav() {
    const { AllFavs, MusicId } = this.props;
    const IsFav = AllFavs.some((FavSong) => FavSong.trackId === MusicId);
    this.setState({
      CheckboxChecked: IsFav,
    });
  }

  async sendSongToFavorites(SongObject) {
    this.setState({ IsSendingSong: true });
    await addSong(SongObject);
    this.setState({ IsSendingSong: false });
  }

  async removeSongFromFavorites(SongObject) {
    this.setState({ IsSendingSong: true });
    await removeSong(SongObject);
    this.setState({ IsSendingSong: false });
  }

  render() {
    const { MusicName, MusicURL, MusicId } = this.props;
    const { IsSendingSong, CheckboxChecked } = this.state;

    return (
      IsSendingSong ? <LoadingPage />
        : (
          <section>
            <p>{ MusicName }</p>
            <audio data-testid="audio-component" src={ MusicURL } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ MusicId }>
              Favorita
              <input
                type="checkbox"
                id={ MusicId }
                data-testid={ `checkbox-music-${MusicId}` }
                checked={ CheckboxChecked }
                onChange={ this.handleCheckbox }
              />
            </label>
          </section>)
    );
  }
}

MusicCard.propTypes = {
  MusicName: propTypes.string.isRequired,
  MusicURL: propTypes.string.isRequired,
  MusicId: propTypes.number.isRequired,
  entireObject: propTypes.shape().isRequired,
  AllFavs: propTypes.arrayOf(Object).isRequired,
  ClickFunction: propTypes.func,
};

MusicCard.defaultProps = {
  ClickFunction: () => console.log('boo'),
};

export default MusicCard;
