import React from 'react';
import propTypes from 'prop-types';

class EditForm extends React.Component {
  render() {
    const {
      name,
      mail,
      desc,
      img,
      changeFunc,
      buttonStatus,
      saveBtnFunc,
    } = this.props;
    return (
      <section>
        <label htmlFor="userName">
          Name
          <input
            type="text"
            name="userName"
            value={ name }
            onChange={ changeFunc }
            data-testid="edit-input-name"
          />
        </label>

        <label htmlFor="userMail">
          Email
          <input
            type="email"
            name="userMail"
            value={ mail }
            onChange={ changeFunc }
            data-testid="edit-input-email"
          />
        </label>
        <label htmlFor="userDescription">
          Description
          <input
            type="text"
            name="userDescription"
            value={ desc }
            onChange={ changeFunc }
            data-testid="edit-input-description"
          />
        </label>
        <label htmlFor="userImage">
          Image
          <input
            type="text"
            name="userImage"
            value={ img }
            onChange={ changeFunc }
            data-testid="edit-input-image"
          />
        </label>

        <button
          type="button"
          name="saveButton"
          data-testid="edit-button-save"
          disabled={ buttonStatus }
          onClick={ saveBtnFunc }
        >
          Salvar e Enviar

        </button>
      </section>
    );
  }
}

EditForm.propTypes = {
  name: propTypes.string.isRequired,
  mail: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  changeFunc: propTypes.func.isRequired,
  buttonStatus: propTypes.bool.isRequired,
  saveBtnFunc: propTypes.func.isRequired,
};

export default EditForm;
