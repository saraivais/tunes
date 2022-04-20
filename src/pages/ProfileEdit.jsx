import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingPage from '../components/LoadingPage';
import EditForm from '../components/EditForm';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.recoverUserData = this.recoverUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.sendUserInfo = this.sendUserInfo.bind(this);

    this.state = {
      userName: '',
      userMail: '',
      userDescription: '',
      userImage: '',
      IsGettingUserData: false,
      IsButtonOff: true,
      IsSendingUserData: false,
      IsReadyToRedirect: false,
    };
  }

  componentDidMount() {
    this.recoverUserData();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      () => ({ [name]: value }),
      () => this.validateButton(),
    );
  }

  async recoverUserData() {
    this.setState({ IsGettingUserData: true });
    const recoveredData = await getUser();
    this.setState({
      userName: recoveredData.name,
      userMail: recoveredData.email,
      userDescription: recoveredData.description,
      userImage: recoveredData.image,
      IsGettingUserData: false,
    });
    this.validateButton();
  }

  validateButton() {
    const { userName, userMail, userDescription, userImage } = this.state;
    const allFields = [
      !userName.length,
      !userMail.length,
      !userDescription.length,
      !userImage.length,
      !userMail.includes('@')];
    const areFieldsOk = !allFields.every((field) => field === false);
    this.setState({
      IsButtonOff: areFieldsOk,
    });
  }

  async sendUserInfo() {
    const { userName, userMail, userDescription, userImage } = this.state;
    const userObj = {
      name: userName,
      email: userMail,
      image: userImage,
      description: userDescription,
    };
    this.setState({ IsSendingUserData: true });
    await updateUser(userObj);
    this.setState({
      IsSendingUserData: false,
      IsReadyToRedirect: true,
    });
  }

  render() {
    const {
      userName,
      userMail,
      userDescription,
      userImage,
      IsGettingUserData,
      IsButtonOff,
      IsSendingUserData,
      IsReadyToRedirect,
    } = this.state;
    return (
      <>
        <Header />
        {IsGettingUserData || IsSendingUserData ? <LoadingPage />
          : (
            <div data-testid="page-profile-edit">
              <EditForm
                name={ userName }
                mail={ userMail }
                desc={ userDescription }
                img={ userImage }
                changeFunc={ this.handleChange }
                buttonStatus={ IsButtonOff }
                saveBtnFunc={ this.sendUserInfo }
              />
            </div>)}
        {IsReadyToRedirect && <Redirect to="/profile" /> }
      </>);
  }
}

export default ProfileEdit;
