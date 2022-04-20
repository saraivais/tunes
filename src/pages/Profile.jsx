import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import UserCard from '../components/UserCard';
import LoadingPage from '../components/LoadingPage';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      UserObject: {},
      IsLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ IsLoading: true });
    const userResult = await getUser();
    this.setState({
      IsLoading: false,
      UserObject: userResult,
    });
  }

  render() {
    const { IsLoading, UserObject: { name, email, image, description } } = this.state;
    return (
      <>
        <Header />
        {IsLoading ? <LoadingPage />
          : (
            <div data-testid="page-profile">
              <UserCard
                userName={ name }
                userMail={ email }
                userDesc={ description }
                userImage={ image }
              />
            </div>)}
      </>);
  }
}

export default Profile;
