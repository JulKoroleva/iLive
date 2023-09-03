import React, { useState } from 'react';
import Form from './Form';

function EditProfilePopup(props) {
  const [formData, setFormData] = useState({
    name: props.userData.name || '',
    age: props.userData.age || '',
    quote: props.userData.quote || '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUserInfo(formData);
    props.onClose();
  }

  return (
    <Form submit='save' onSubmit={handleSubmit} title='Edit profile'>
      <label className='form__label'>
        <input
          value={formData.name}
          onChange={handleChange}
          id='profile-name'
          className='form__input form__input_name'
          type='text'
          name='name'
          minLength='2'
          maxLength='40'
          placeholder={props.userData.name ? props.userData.name : 'Name'}
          autoComplete='off'
          required
        />
      </label>

      <label className='popup__label'>
        <input
          value={formData.age}
          onChange={handleChange}
          id='profile-profession'
          className='form__input form__input_profession'
          type='date'
          name='age'
          minLength='2'
          maxLength='400'
          placeholder={props.userData.age ? props.userData.age : 'Age'}
          autoComplete='off'
          required
        />
      </label>

      <label className='popup__label'>
        <input
          value={formData.quote}
          onChange={handleChange}
          id='profile-quote'
          className='form__input form__input_quote'
          type='text'
          name='quote'
          minLength='2'
          maxLength='400'
          placeholder={props.userData.quote ? props.userData.quote : 'Quote'}
          autoComplete='off'
          required
        />
      </label>
      <button className='modal__close-btn' onClick={props.onClose}></button>
    </Form>
  );
}

export default EditProfilePopup;
