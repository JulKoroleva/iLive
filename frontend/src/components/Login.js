import React, { useState, useRef, useEffect, useContext  } from 'react';
import { NavLink, Navigate, useNavigate} from 'react-router-dom';
import { TranslationContext } from '../context/TranslationContext';

import LanguageButton from './LanguageButton';
import UpperHeader from './UpperHeader';
import Form from './Form';
import envelope from '../images/reg-log/envelope.png';
import key from '../images/reg-log/key.png';
import hide_eye from '../images/reg-log/hide_eye.png';
import show_eye from '../images/reg-log/show_eye.png';

function Login(props) {

  const translation = useContext(TranslationContext);

  const [emailShake, setEmailShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailImageRef = useRef(null);
  const passwordImageRef = useRef(null);

  const initialData = {
    email: '',
    password: '',
  };

  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailShake(false);
      emailImageRef.current.classList.remove('shake');
      emailImageRef.current.parentElement.classList.remove('shake-border');
    }
    if (name === 'password') {
      setPasswordShake(false);
      passwordImageRef.current.classList.remove('shake');
      passwordImageRef.current.parentElement.classList.remove('shake-border');
      setPasswordLengthError(false);
    }
  };

  const resetForm = () => {
    setData(initialData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.password || !data.email) {
      if (!data.email) {
        setEmailShake(true);
        emailImageRef.current.classList.add('shake');
        emailImageRef.current.parentElement.classList.add('shake-border');
      } else {
        setEmailShake(false);
        emailImageRef.current.parentElement.classList.remove('shake-border');
      }

      if (!data.password) {
        setPasswordShake(true);
        passwordImageRef.current.classList.add('shake');
        passwordImageRef.current.parentElement.classList.add('shake-border');
      } else {
        setPasswordShake(false);
        passwordImageRef.current.parentElement.classList.remove('shake-border');
      }
      
      return;
    }


    if (data.password.length < 8) {
      setPasswordShake(true);
      passwordImageRef.current.classList.add('shake');
      passwordImageRef.current.parentElement.classList.add('shake-border');
      setPasswordLengthError(true);
      return;
    }

    setEmailShake(false);
    setPasswordShake(false);
    emailImageRef.current.classList.remove('shake');
    emailImageRef.current.parentElement.classList.remove('shake-border');
    passwordImageRef.current.classList.remove('shake');
    passwordImageRef.current.parentElement.classList.remove('shake-border');
  
    await props.onLogin(data.email, data.password)
           
    resetForm();
  };
    
  

 

  return (
    <>
      <section className='page'>
        <UpperHeader>
          <nav> <LanguageButton /></nav>
          <NavLink to='/home' className='upper-header__button_reglog_home'>{translation.upperHeader.homePage}</NavLink>
        </UpperHeader>
        <Form submit={translation.login.submitButton} onSubmit={handleSubmit} title={translation.login.title}>
          <label className={`form__label ${emailShake ? 'shake-border' : ''}`}>
            <div className='form__label_img'>
              <img src={envelope} ref={emailImageRef} style={{ width: '30px', height: '30px', objectFit: 'contain' }} alt='Email' />
            </div>
            <input
              value={data.email}
              onChange={handleChange}
              className={`form__input form__input_email ${emailShake ? 'shake-input' : ''}`}
              type='email'
              name='email'
              minLength='2'
              maxLength='40'
              placeholder='email'
              autoComplete='off'
              required
            />
          </label>

          <label className={`form__label ${passwordShake || passwordLengthError ? 'shake-border' : ''}`} style={{ marginBottom: '50px' }}>
            <div className='form__label_img'>
              <img src={key} ref={passwordImageRef} style={{ width: '30px', height: '30px', objectFit: 'contain' }} alt='Password' />
            </div>
            <input
              value={data.password}
              onChange={handleChange}
              className={`form__input form__input_password ${passwordShake ? 'shake-input' : ''}`}
              type={showPassword ? 'text' : 'password'}
              name='password'
              minLength='8'
              maxLength='20'
              placeholder='password'
              autoComplete='off'
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword(!showPassword)}
              style={{backgroundImage: `url(${showPassword ? hide_eye : show_eye})`}}
            >
            </button>
          </label>
          {!props.errMessage && passwordLengthError && <p className='error-message'>{translation.login.passwordLengthError}</p>}
          {props.errMessage && <p className='error-message'>{props.errMessage}</p>}
        </Form>
        <NavLink to='/signup' style={{ marginTop: '40px' }} className='signup__button'>{translation.login.notRegistered}</NavLink>
      </section>
    </>
  );
}

export default Login;
