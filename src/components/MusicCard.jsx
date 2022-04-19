import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { MusicName, MusicURL } = this.props;
    return (
      <section>
        <p>{ MusicName }</p>
        <audio data-testid="audio-component" src={ MusicURL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  MusicName: propTypes.string.isRequired,
  MusicURL: propTypes.string.isRequired,
};

export default MusicCard;
