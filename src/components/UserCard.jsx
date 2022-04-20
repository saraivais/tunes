import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class UserCard extends React.Component {
  render() {
    const { userName, userMail, userDesc, userImage } = this.props;
    return (
      <section>
        <img
          src={ userImage }
          alt={ userName }
          data-testid="profile-image"
        />
        <div>
          <h1>{ userName }</h1>
          <h3>Nome</h3>
          <p>{ userName }</p>
          <h3>E-mail</h3>
          <p>{ userMail }</p>
          <h3>Descrição</h3>
          <p>{ userDesc }</p>
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </section>);
  }
}

UserCard.propTypes = {
  userName: propTypes.string.isRequired,
  userMail: propTypes.string.isRequired,
  userDesc: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
};

export default UserCard;
