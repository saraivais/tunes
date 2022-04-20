import React from 'react';
import propTypes from 'prop-types';
import MusicCard from './MusicCard';

class FavoriteListing extends React.Component {
  render() {
    const { FavSongs, ClickFunc } = this.props;
    return (
      <div>
        {FavSongs.map((songObject) => (<MusicCard
          key={ songObject.trackId }
          entireObject={ songObject }
          MusicName={ songObject.trackName }
          MusicURL={ songObject.previewUrl }
          MusicId={ songObject.trackId }
          AllFavs={ FavSongs }
          ClickFunction={ ClickFunc }
        />))}
      </div>
    );
  }
}

FavoriteListing.propTypes = {
  FavSongs: propTypes.arrayOf(Object).isRequired,
  ClickFunc: propTypes.func.isRequired,
};

export default FavoriteListing;
