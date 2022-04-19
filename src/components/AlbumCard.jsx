import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { Id, Image, AlbumName } = this.props;
    return (
      <section>
        <div>
          <img src={ Image } alt={ AlbumName } />
          <p>{ AlbumName }</p>
        </div>
        <Link
          to={ `album/${Id}` }
          data-testid={ `link-to-album-${Id}` }
        >
          Album
        </Link>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  Id: propTypes.string.isRequired,
  Image: propTypes.string.isRequired,
  AlbumName: propTypes.string.isRequired,
};

export default AlbumCard;
