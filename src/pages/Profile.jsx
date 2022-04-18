import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">Componente Profile</div>
      </>);
  }
}

export default Profile;
