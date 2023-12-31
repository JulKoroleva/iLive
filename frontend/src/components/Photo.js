import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import * as constants from '../constants/constants';

import trash from '../images/Trash.svg';

function Photo(props) {
  const parts = props.photoAvatar.split("/"); // Split the string on the backslash character
  const avatarName = parts[parts.length - 1];

  return (
    <div className='element'>
      <div className='element__info_container'>
        <LazyLoadImage src={`${constants.baseURL}/${props.photo.path}`} alt='photo' className='element__image' effect='blur' onClick={() => props.openPhoto(props.photo)} />
        {props.photo.user === props.userInfo._id ? (
          <button onClick={() => { props.handlePhotoDelete(props.photo) }} className='element__delete-button' type='button'>
            <img src={trash} alt='Удалить' />
          </button>
        ) : (<button className='element__delete-button' type='button' hidden></button>)}
        
      </div>
      <div className='element__description'>
          <div className='element__avatar'>
            <img className='owner-avatar' src={`${constants.baseURL}/${avatarName}`} />
          </div>
          <h3 className='element__title'>{props.photo.title}</h3>
          <div className='element__likes'>
            <p className='element__number-of-likes'>{props.photo.likes.length}</p>
            {props.photo.likes.includes(props.userInfo._id) ? (
              <button type='button' onClick={() => { props.handlePhotoLike(props.photo) }} className='element__like-button element__like-button_active'></button>
            ) : (
              <button type='button' onClick={() => { props.handlePhotoLike(props.photo) }} className='element__like-button'></button>
            )}
          </div>
        </div>
    </div>
  );
}

export default Photo;
