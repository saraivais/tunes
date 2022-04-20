import React from 'react';

class EditForm extends React.Component {
  render() {
    const { name, mail, desc, img, changeFunc } = this.props;
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
        >
          Salvar e Enviar

        </button>
      </section>
    );
  }
}

export default EditForm;
