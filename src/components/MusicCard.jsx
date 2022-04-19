import React from 'react';
import propTypes from 'prop-types';
import LoadingPage from './LoadingPage';
import { addSong } from '../services/favoriteSongsAPI';

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

  handleCheckbox({ target }) {
    const { entireObject } = this.props;
    const value = target.checked;
    this.setState({
      CheckboxChecked: value,
    });
    if (value) {
      this.sendSongToFavorites(entireObject);
    }
  }

  async sendSongToFavorites(SongObject) {
    this.setState({ IsSendingSong: true });
    await addSong(SongObject);
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
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${MusicId}` }
              checked={ CheckboxChecked }
              onChange={ this.handleCheckbox }
            />
          </section>)
    );
  }
}

MusicCard.propTypes = {
  MusicName: propTypes.string.isRequired,
  MusicURL: propTypes.string.isRequired,
  MusicId: propTypes.number.isRequired,
  entireObject: propTypes.shape().isRequired,
};

export default MusicCard;
