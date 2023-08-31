import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { TranslationContext } from '../context/TranslationContext';

import StickyHeader from './StickyHeader';
import UserIdeasList from './UserIdeasList';
import UserDreamList from './UserDreamList';
import CalendarLife from './CalendarLife';
import * as constants from '../constants/constants';
import * as auth from '../utils/auth';
import APIManager from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import Preloader from './Preloader';

import addPlusButton from '../images/photogallery/plus.png';

const Profile = (props) => {
  const translation = useContext(TranslationContext);

  const [isLoading, setIsLoading] = useState(true);
  const textareaRef = useRef(null);
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isAgeEdit, setIsAgeEdit] = useState(false);
  const [isQuoteEdit, setIsQuoteEdit] = useState(false);
  const [enteredDate, setEnteredDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);

  const toggleNameEdit = () => {
    setIsNameEdit(!isNameEdit);
  };

  const toggleAgeEdit = () => {
    setIsAgeEdit(!isAgeEdit);
    if (isAgeEdit && !isDateValid) {
      // If the user tries to close the input while the date is invalid, reset the entered date and validation status.
      setEnteredDate('');
      setIsDateValid(true);
    }
  };

  const toggleQuoteEdit = () => {
    setIsQuoteEdit(!isQuoteEdit);
  };

  useEffect(() => {
    // Check if isQuoteEdit is true and the textareaRef is available
    if (isQuoteEdit && textareaRef.current) {
      // Focus on the textarea
      textareaRef.current.focus();
      // Move the cursor to the end of the text
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
    }
  }, [isQuoteEdit]);

  const handleTextareaKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key
      handleUpdateUserData('quote', event.target.value + ' '); // Append a space instead of a new line
    }
  };
  const handleAgeInputChange = (event) => {
    setEnteredDate(event.target.value);
    // Validate the entered date here (you can use a custom function or a library like date-fns).
    // For example, using date-fns:
    const currentDate = new Date();
    const selectedDate = new Date(event.target.value);
    const minAllowedYear = constants.MIN_ALLOWED_YEAR;
    const isValid = selectedDate.getFullYear() >= minAllowedYear && selectedDate < currentDate;
    setIsDateValid(isValid);
  };

  const handleAgeInputKeyDown = (event) => {
    // Prevent the input from closing when the user presses the "Enter" key
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAgeInputBlur();
    }
    // Handle "Escape" key to cancel editing
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsAgeEdit(false);
      setEnteredDate('');
      setIsDateValid(true);
    }
  };

  const handleAgeInputBlur = () => {
    if (isDateValid) {
      // Update the user data with the new age.
      handleUpdateUserData('age', enteredDate);
    }
    setIsAgeEdit(false);
    // If the date is not valid, you can show an error message or take appropriate action.
  };
  
  const handleUpdateUserData = async (field, value) => {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.updateUserInfo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS
        },
        body: JSON.stringify({ [field]: value })
      });

      if (!response.ok) {
        console.error('Failed to update data on the server');
        return;
      }

      const json = await response.json();

      setUserData((prevUserData) => ({
        ...prevUserData,
        [field]: json[field]
      }));

    } catch (error) {
      console.error(error);
    }
  };

  const [activeTab, setActiveTab] = useState('ideas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [userData, setUserData] = useState({
    email: '',
    avatar: '',
    name: '',
    age: '',
    quote: '',
  });

  const [avatar, setAvatar] = useState(null); // State to store the selected image
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);

  const getUserData = async () => {
    const jwt = auth.getJwtFromLS();
    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUserData}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS
        }
      });
      if (!response.ok) {
        navigate('/login', { replace: true });
        return () => {
          console.log('This will be logged on unmount');
        };
      }
      const json = await response.json();
      console.log('getUserData json = ', json)

      const parts = json.avatar.split("\\"); // Split the string on the backslash character
      const avatarName = parts[parts.length - 1];

      setUserData((prevUserData) => ({
        ...prevUserData,
        email: json.email,
        avatar: `${constants.baseURL}/${avatarName}`,
        name: json.name,
        age: json.age,
        quote: json.quote
      }));
      console.log('getUserData UserData = ', userData)
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  useEffect(() => {    
    getUserData();
  }, []);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const editProfileFormOpen = () => {
    setIsEditProfileFormOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditProfileFormOpen(false)
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = new Image();
      image.onload = async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        let width = image.width;
        let height = image.height;
        const maxWidth = constants.MAX_WIDTH;
        const maxHeight = constants.MAX_HEIGHT;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const blob = dataURItoBlob(resizedDataUrl);

        const convertedFile = await blobToFile(blob, file.name);

        setAvatar(URL.createObjectURL(convertedFile));
        uploadAvatar(convertedFile);
      };

      image.src = URL.createObjectURL(file);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const blobToFile = async (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };

  const uploadAvatar = async (file) => {
    const jwt = auth.getJwtFromLS();
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.changeUserAvatar}`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS
        },
        body: formData
      });
      if (response.ok) {
        const json = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: json.avatar,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUserInfo = async (newInfo) => {
    const jwt = auth.getJwtFromLS();
    console.log('data', newInfo)

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.updateUserInfo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS
        },
        body: JSON.stringify({
          name: newInfo.name,
          age: newInfo.age,
          quote: newInfo.quote
        })
      });
      if (response.ok) {
        const json = await response.json();
        console.log('handleUpdateUserInfo json = ', json)
        setUserData((prevUserData) => ({
          ...prevUserData,
          name: json.name,
          age: json.age,
          quote: json.quote,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    console.log('UserData = ', userData);
  }, [userData]);

  return (
    <>
      <section className='page'>
        {isLoading && (<Preloader/>)}
        <div className='profile__block_first'>
          <div className='profile-page'>
            <div className='profile-page__header'>
              <StickyHeader loggedIn={props.loggedIn} isMobile={props.isMobile} loggedOut={props.loggedOut}><NavLink to='/logout' loggedOut={props.loggedOut} className='sticky-header__button_logout' ></NavLink></StickyHeader>
            </div>
  
            <div className={`profile ${isLoading ? 'loading' : ''}`}>
              <div className='profile__photo_container'>
                <label htmlFor='fileInput'>
                  <img className='profile__photo' src={userData.avatar || avatar} alt='Avatar' />
                </label>
                {/* Hidden input field for file selection */}
                <input
                  id='fileInput'
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  className='profile__photo_fileInput'
                  onChange={handleFileSelect}
                />
              </div>
  
              <div className='profile__info'>
                {isNameEdit ? (
                  <>
                    <input
                      className='profile__info_name-input'
                      type='text'
                      maxLength={20} // Limit to 20 characters
                      value={userData.name}
                      onChange={(e) => handleUpdateUserData('name', e.target.value)}
                      onBlur={toggleNameEdit}
                      autoFocus
                    />
                  </>
                ) : (
                  <h2 className='profile__info_name' onClick={toggleNameEdit}>{userData?.name || `${translation.profile.name}`}</h2>
                )}
                {isAgeEdit ? (
                  <>
                    <input
                      className={`profile__info_age-input ${!isDateValid && 'profile__info_age-input_err'}`}
                      type='date'
                      value={enteredDate}
                      onChange={handleAgeInputChange}
                      onBlur={handleAgeInputBlur}
                      onKeyDown={handleAgeInputKeyDown} 
                      autoFocus
                    />                    
                  </>
                ) : (
                  <h4 className='profile__info_age' onClick={toggleAgeEdit}>{calculateAge(userData?.age) || `${translation.profile.age}`}</h4>
                )}
                {isQuoteEdit ? (
                  <>
                    <textarea
                      ref={textareaRef} 
                      className='profile__info_quote-input'          
                      maxLength={180}
                      value={userData.quote}
                      onChange={(e) => handleUpdateUserData('quote', e.target.value)}
                      onBlur={toggleQuoteEdit}
                      autoFocus
                      onKeyPress={handleTextareaKeyPress} 
                    />
                  </>
                ) : (
                  <h2 className='profile__info_quote' onClick={toggleQuoteEdit}>
                    «{userData?.quote || `${translation.profile.quote}`}»
                  </h2>
                )}
              </div>
            </div>
  
            <div className={`profile__buttons_container ${isLoading ? 'loading' : ''}`}>
              <div className={`profile__button ${activeTab === 'ideas' ? 'active-tab' : ''}`}>
                <button style={{width:'100%'}} onClick={() => handleTabChange('ideas')}>{translation.profile.ideasButton}</button>
              </div>
              <div className={`profile__button ${activeTab === 'dreams' ? 'active-tab' : ''}`}>
                <button style={{width:'100%'}} onClick={() => handleTabChange('dreams')}>{translation.profile.drawingButton}</button>
              </div>
              <div className={`profile__button ${activeTab === 'calendar' ? 'active-tab' : ''}`}>
                <button style={{width:'100%'}} onClick={() => handleTabChange('calendar')}>{translation.profile.calendarButton}</button>
              </div>
            </div>
  
            {activeTab === 'ideas' && (
            <div className={`add-botton__container ${isLoading ? 'loading' : ''}`}>
               <NavLink to='/ideas' className='add-botton'><img style={{height:'40px'}} src={addPlusButton}/></NavLink>
            </div>)}
            
          </div>
        </div>
  
        <div className={`profile__block_second ${isLoading ? 'loading' : ''}`}>
          {activeTab === 'ideas' && (
            <UserIdeasList
              selectedCard={selectedCard}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          )}
          {activeTab === 'calendar' && <CalendarLife userData={userData}/>}
        </div>
        {activeTab === 'dreams' && <UserDreamList />}
      </section>
  
      {isModalOpen && (
        <>
          <div className='modal-overlay' onClick={closeModal}></div>
          <div className='modal-card__container'>
            <div className='modal-card__container_content'>
             <h2 className='ideas__carousel-card_title' style={{color:`${selectedCard?.title.color}`}}>{selectedCard?.title[translation.lang]}</h2>
              <p className='ideas__carousel-card_subtitle'>{selectedCard?.subtitle[translation.lang]}</p>
              <img className='ideas__carousel-card_image' src={`${constants.baseURL}/${selectedCard?.image}`} />
              {selectedCard?.link === true && (<Link to={`/ideas/articles/${selectedCard?.name}`} className='ideas__carousel-card_link'>{translation.ideas.linkButton}</Link>)}
              <button className='modal__close-btn' onClick={closeModal}></button>
              
            </div>
           
          </div>
        </>
      )}
      {isEditProfileFormOpen && (
        <>
          <div className='modal-overlay' onClick={closeModal}></div>
          <EditProfilePopup onUpdateUserInfo={handleUpdateUserInfo} userData={userData} onClose={closeModal} /> 
        </>
      )}
    </>
  );
  };
  
  export default Profile;
  
