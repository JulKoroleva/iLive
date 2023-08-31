import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { TranslationContext } from '../context/TranslationContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Preloader from './Preloader';
import StickyHeader from './StickyHeader';
import Photo from './Photo';
import * as constants from '../constants/constants';
import * as auth from '../utils/auth';
import APIManager from '../utils/api';

import customAddImageButton from '../images/photogallery/add-image__button.png';
import treeButton from '../images/photogallery/treeButton.png';
import twoButton from '../images/photogallery/twoButton.png';
import oneButton from '../images/photogallery/oneButton.png';
import addPlusButton from '../images/photogallery/plus.png';

const Photogallery = (props) => {
  const translation = useContext(TranslationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

 

  const [userAvatar, setUserAvatar] = useState({
    avatar: '',
  });


  const [userInfo, setUserInfo] = useState({});
  console.log('Photogallery userInfo = ', userInfo);
  const [photogallery, setPhotogallery] = useState([]);

  const [showNextElement, setShowNextElement] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const parts = props.photoAvatar.split("/"); // Split the string on the backslash character
  // const avatarName = parts[parts.length - 1];

  
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const inputRef = useRef(null);

  const getUserAvatar = async () => {
    try {
      const json = await APIManager.getUserData();
      const parts = json.avatar.split("/"); // Split the string on the backslash character
      const avatarName = parts[parts.length - 1];
      setUserAvatar({
        avatar: json.avatar,
      });
      setUserInfo({
        _id: json._id
    })
      console.log('UserData = ', userAvatar);
    } catch (error) {
      console.error(error);
    }
  };   

  useEffect(() => {   
    getUserAvatar();
    console.log("userDataAvatar", userAvatar);
  }, []);

  const getPhotogallery = async () => {
    setIsLoading(true);
    try {
      const json = await APIManager.getPhotogallery();
      setPhotogallery(json);
      console.log('photogallery =', photogallery);
      console.log('photogallery json =', json);
    } catch (error) {
      console.error('Error getting photogallery:', error);
      navigate('/login', { replace: true });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }    
  };
  
  useEffect(() => {    
    getPhotogallery();
  }, []);

  useEffect(() => {
    console.log('photogallery =', photogallery);
  }, [photogallery]);

  // Function to open the photo popup and set the selected photo index
  const openPhoto = (photo, index) => {
    console.log('photo = ', photo)
    const parts = photo.ownerAvatar.split("/"); // Split the string on the backslash character
    photo.ownerAvatar = parts[parts.length - 1];
    setCurrentIndex(index);
    
    setSelectedPhoto(photo);
    setIsPhotoOpen(true);
  };

  // Function to handle click on the arrow buttons to navigate photos
  const handleClick = () => {
    setShowDescription(true)
    setShowNextElement(false)
  };


  const openModal = () => {
    setIsModalOpen(true);
    setImageFile(null);
  };

  const closeModal = () => {
    setShowDescription(false)
    setIsModalOpen(false);
    setIsPhotoOpen(false)
    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Determining the state of the "arrow" button
    if (name === 'title') {
      setShowNextElement(value.length >= 3);
    }

    // Determining the state of the "Save" button
    if (name === 'description') {
      setShowSaveButton(value.length > 0);
    }
  };

  const resetForm = () => {
    setData({
      title: '',
      description: '',
    });
    setPreviewImage(null);
  };

  const handleDownloadImg = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
  
          let width = image.width;
          let height = image.height;
          const maxWidth = 2000; // Maximum width to scale images
  
          if (width < maxWidth) {
            // Stretch the image proportionally to fit the maxWidth
            const newHeight = (height * maxWidth) / width;
            canvas.width = maxWidth;
            canvas.height = newHeight;
            context.drawImage(image, 0, 0, maxWidth, newHeight);
          
            if (newHeight > maxWidth) {
              // Calculate the cropping offset
              const offsetTop = (newHeight - maxWidth) / 2;
          
              // Create a temporary canvas to hold the cropped image
              const tempCanvas = document.createElement('canvas');
              const tempContext = tempCanvas.getContext('2d');
              tempCanvas.width = maxWidth;
              tempCanvas.height = maxWidth;
          
              // Draw the stretched image on the temporary canvas
              tempContext.drawImage(canvas, 0, offsetTop, maxWidth, maxWidth, 0, 0, maxWidth, maxWidth);
          
              // Resize the main canvas to match the cropped dimensions
              canvas.width = maxWidth;
              canvas.height = maxWidth;
          
              // Draw the cropped image back onto the main canvas
              context.drawImage(tempCanvas, 0, 0, maxWidth, maxWidth);
            }
          } else if (height > width) {
            // Crop the image if it has greater height than width
            const offsetTop = height * 0.2;
            const offsetBottom = height * 0.2;
            const croppedHeight = height - offsetTop - offsetBottom;
          
            canvas.width = width;
            canvas.height = croppedHeight;
            context.drawImage(
              image,
              0,
              offsetTop,
              width,
              croppedHeight,
              0,
              0,
              width,
              croppedHeight
            );
          } else {
            // Image is already wider than maxWidth or it has normal proportions
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
          }
  
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPreviewImage(resizedDataUrl); // Set the preview image URL
        };
  
        image.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  
  
  function generateUniqueFileName() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `image_${timestamp}_${randomString}.jpg`;
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    document.querySelector('.form__save-button').disabled = true;
    

    
    if (imageFile) {
      const image = new Image();
  
      image.onload = async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        
  
          let width = image.width;
          let height = image.height;
          const maxWidth = 2000; // Maximum width to scale images
  
          if (width < maxWidth) {
            // Stretch the image proportionally to fit the maxWidth
            const newHeight = (height * maxWidth) / width;
            canvas.width = maxWidth;
            canvas.height = newHeight;
            context.drawImage(image, 0, 0, maxWidth, newHeight);
          
            if (newHeight > maxWidth) {
              // Calculate the cropping offset
              const offsetTop = (newHeight - maxWidth) / 2;
          
              // Create a temporary canvas to hold the cropped image
              const tempCanvas = document.createElement('canvas');
              const tempContext = tempCanvas.getContext('2d');
              tempCanvas.width = maxWidth;
              tempCanvas.height = maxWidth;
          
              // Draw the stretched image on the temporary canvas
              tempContext.drawImage(canvas, 0, offsetTop, maxWidth, maxWidth, 0, 0, maxWidth, maxWidth);
          
              // Resize the main canvas to match the cropped dimensions
              canvas.width = maxWidth;
              canvas.height = maxWidth;
          
              // Draw the cropped image back onto the main canvas
              context.drawImage(tempCanvas, 0, 0, maxWidth, maxWidth);
            }
          } else if (height > width) {
            // Crop the image if it has greater height than width
            const offsetTop = height * 0.2;
            const offsetBottom = height * 0.2;
            const croppedHeight = height - offsetTop - offsetBottom;
          
            canvas.width = width;
            canvas.height = croppedHeight;
            context.drawImage(
              image,
              0,
              offsetTop,
              width,
              croppedHeight,
              0,
              0,
              width,
              croppedHeight
            );
          } else {
            // Image is already wider than maxWidth or it has normal proportions
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
          }
  
        const uniqueFileName = generateUniqueFileName();
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const blob = dataURItoBlob(resizedDataUrl);
  
        // Convert Blob back to JPEG file
        const convertedFile = await blobToFile(blob, uniqueFileName);
  
        const fileData = new FormData();
        fileData.append('photo', convertedFile);
        fileData.append('title', data.title);
        fileData.append('description', data.description);
  
        await APIManager
          .postNewPhoto(fileData)
          .then(() => {
            console.log('Photo uploaded successfully');
          })
          .catch((error) => {
            console.log('Error uploading photo:', error);
          });
      };
  
      image.src = URL.createObjectURL(imageFile);

      setTimeout(() => {        
        window.location.reload();
      }, 1500);
    }
  };
  
  
  
  // Function to convert Blob to file
  const blobToFile = async (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };

  //Like the photo
  const handlePhotoLike = async (photo) => {
    const jwt = auth.getJwtFromLS();
    try {
      const response = await APIManager.likeToPhoto(photo._id, jwt);
      if (response.statusLike === constants.LIKE_PHOTO_STATUS.unknown) {
        console.error('Failed to like photo');
        return;
      } else {
        setPhotogallery((prevPhotogallery) => {
          const updatedPhotogallery = prevPhotogallery.map((item) => {
            if (item._id === photo._id) {
              const updatedLikes = photo.likes.includes(userInfo.id)
                ? photo.likes.filter((id) => id !== userInfo.id)
                : [...photo.likes, userInfo.id];
              return { ...item, likes: updatedLikes };
            }
            return item;
          });
          return updatedPhotogallery;
        });
      }
    } catch (error) {
      console.error('Failed to like photo:', error);
    }
  };

  //Delete photo
  function handlePhotoDelete(photo) {
    const photoIsMine = photo.user === userInfo.id;
    console.log('handlePhotoDelete userInfo ', userInfo);
    console.log('photo.user.id ', photo.user);
    console.log('userInfo.id ', userInfo.id);
    console.log('photoIsMine', photoIsMine);
    if (photoIsMine) {
      const jwt = auth.getJwtFromLS();
      APIManager
        .deletePhoto(photo._id, jwt)
        .then((res) => {
          const photoFilter = (item) => {
            if (item._id === photo._id) {
              return false;
            } else {
              return true;
            }
          };
          const deletedPhoto = photogallery.filter((item) => photoFilter(item));
          setPhotogallery(deletedPhoto);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }



  return (
    <>
      <section className='page photogallery'>
        <div className='page__sticky-header' style={{ boxShadow: '0 0 70px 70px #ffffff' }}>
          <StickyHeader loggedIn={props.loggedIn} isMobile={props.isMobile} loggedOut={props.loggedOut} >
            <NavLink to='/profile' className={`sticky-header__button_home`}></NavLink>
          </StickyHeader>
          <button className='photogallery__add-button' onClick={openModal}>
          <img style={{height:'20px'}} src={addPlusButton}/>
          </button>
        </div>
        {isLoading && (<Preloader />)}
        <div className={`elements ${isLoading ? 'loading' : ''}`}>
          {photogallery.map((photo) => (
            <Photo
              handlePhotoLike={handlePhotoLike}
              handlePhotoDelete={handlePhotoDelete}
              photo={photo}
              photoAvatar={photo.ownerAvatar}
              photoId={photo._id}
              userInfo={userInfo}
              openPhoto={openPhoto}
            />
          ))}
        </div>

      </section>
      {isPhotoOpen && selectedPhoto && (
        <>
          <div className='modal-overlay' onClick={closeModal}></div>
          <div className="photo-popup__container">
            <div className="photo-popup__container_content">

              <img className="photo-popup__photo" src={`${constants.baseURL}/${selectedPhoto.path}`} alt='photo' />
              </div>
              <div className="photo-popup__info">
                <div className="photo-popup__title">
                  <div style={{ width: '50px', height: '50px', margin: '0 20px 0 0' }} className="element__avatar">
                    <img className="owner-avatar" src={`${constants.baseURL}/${selectedPhoto.ownerAvatar}`} />
                  </div>
                  <h1 style={{ margin: 0, backgroundColor: 'transparent' }}>{selectedPhoto.title}</h1>
                </div>
                <div className="photo-popup__description">

                  <h3 className="photo-popup__description_text" style={{ margin: "0" }}>{selectedPhoto.description}</h3>
                  <div style={{ width: '100%', height: '5px', margin: 0, boxShadow: '0px -8px 41px 20px rgba(255, 255, 255, 0.6)', position: 'sticky', bottom: -10, zIndex: '10' }}></div>

                </div>

              </div>
              <button className="modal__close-btn" onClick={closeModal}></button>
            

          </div>

        </>
      )}

      {isModalOpen && (
        <>
          <div className='modal-overlay' onClick={closeModal}></div>
          <div className='popup__add-form_container'>
            <h3 className='form__title' style={{ borderBottom:'1px solid  rgba(0, 0, 0, 0.1)'}}>{translation.photogallery.postPhotoTitle}</h3>
            <form className='popup__add-form_container_content'>

              <label className={`form__label_add-photo ${imageFile ? 'form__label_photo_download' : ''}`}  >
                {imageFile ? (
                  <div className='form__review-photo_container'>
                    <LazyLoadImage className='form__review-photo' alt='photo'  effect='blur' src={previewImage}  />
                  </div>
                ) : (
                  <>

                    <div className='form__subtitle form__post-subtitle' >
                      <img style={{ width: '30px', height: '30px', marginRight: '10px' }} src={oneButton} alt='Button' />
                      <h4>{translation.photogallery.choosePhoto}</h4>
                    </div>
                    <input
                      ref={inputRef}
                      onChange={handleDownloadImg}
                      className='form__input form__input-img'
                      type='file'
                      name='img'
                      placeholder='Image'
                      multiple
                      required
                      style={{ display: 'none' }}
                    />
                    <div className='file-input-container'>
                      <img
                        src={customAddImageButton}
                        alt='Add Button'
                        className='file-input-button'
                        
                      />
                    </div>

                  </>
                )}
              </label>

              {imageFile && (
                <label className='form__label_add-photo'>
                  <div className='form__post-title' >
                    {showDescription ? (
                      <div className="form__element_avatar">
                        <img className="owner-avatar" src={`${constants.baseURL}/${userAvatar.avatar}`} />
                      </div>
                    ) : (
                      <img className='form__post-img'  src={twoButton} alt='Button' />
                    )}
                    <input
                      value={data.title}
                      onChange={handleChange}
                      id='photo-title'
                      className='form__input form__input_title'
                      type='text'
                      name='title'
                      minLength='2'
                      maxLength='20'
                      placeholder={translation.photogallery.writeTitle}
                      autoComplete='off'
                      required
                    />

                    {data.title.length >= 2 && !showDescription && (
                      <button className="form__next-button" onClick={handleClick} ></button>
                    )}
                  </div>
                </label>
              )}

              {showDescription && (
                <label className='form__label_add-photo'>
                  {data.description.length === 0 && (
                    <div className='form__subtitle-placeholder'>
                      <img className='form__post-img' src={treeButton} alt='Button' />
                      <h4 style={{fontWeight:'500'}}>{translation.photogallery.writePost}</h4>
                    </div>
                  )}
                  <textarea
                    value={data.description}
                    onChange={handleChange}
                    id='photo-description'
                    className='form__input form__input_description'
                    name='description'
                    minLength='2'
                    maxLength='2000'

                    autoComplete='off'
                    required
                    autoFocus
                  />
                </label>
              )}
              {data.description.length >= 3 ? (
                <button className={`form__save-button`} onClick={handleSubmit} type='submit'>
                  {translation.photogallery.postPhotoButton}
                </button>
              ) : (
                <button className={`form__save-button`} onClick={handleSubmit} type='submit' disabled>
                  {translation.photogallery.postPhotoButton}
                </button>
              )}
            </form>
            <button className='modal__close-btn' onClick={closeModal}></button>
          </div>
        </>
      )}
    </>
  );
};

export default Photogallery;
