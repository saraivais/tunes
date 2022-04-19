import React from 'react';
import propTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumDeck extends React.Component {
  render() {
    const { albumArray, artistName } = this.props;
    return (
      albumArray.length < 1 ? <div>Nenhum álbum foi encontrado</div>
        : (
          <section>
            <p>
              Resultado de álbuns de:
              {' '}
              { artistName }
            </p>
            {albumArray
              .map(({ collectionId, artworkUrl100, collectionName }) => (
                <AlbumCard
                  key={ collectionId }
                  Id={ collectionId }
                  Image={ artworkUrl100 }
                  AlbumName={ collectionName }
                />
              ))}
          </section>));
  }
}

AlbumDeck.propTypes = {
  albumArray: propTypes.arrayOf(Object).isRequired,
  artistName: propTypes.string.isRequired,
};

export default AlbumDeck;
