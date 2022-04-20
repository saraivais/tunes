import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingPage from '../components/LoadingPage';
import EditForm from '../components/EditForm';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.recoverUserData = this.recoverUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);

    this.state = {
      userName: '',
      userMail: '',
      userDescription: '',
      userImage: '',
      IsGettingUserData: false,
      IsButtonOff: true,
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
    console.log('areFieldsOk', areFieldsOk);
    this.setState({
      IsButtonOff: areFieldsOk,
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
    } = this.state;
    return (
      <>
        <Header />
        {IsGettingUserData ? <LoadingPage />
          : (
            <div data-testid="page-profile-edit">
              <EditForm
                name={ userName }
                mail={ userMail }
                desc={ userDescription }
                img={ userImage }
                changeFunc={ this.handleChange }
                buttonStatus={ IsButtonOff }
              />
            </div>)}
      </>);
  }
}

export default ProfileEdit;
