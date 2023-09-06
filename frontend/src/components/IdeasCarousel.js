import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TranslationContext } from '../context/TranslationContext';

import APIManager from '../utils/api';

import * as auth from '../utils/auth';
import * as constants from '../constants/constants';
import Preloader from './Preloader';
import deleteButton from '../images/ideas/delete.png';
import waitButton from '../images/ideas/alarm-clock.png';
import checkButton from '../images/ideas/checked.png';

function IdeasCarousel(props) {
  const translation = useContext(TranslationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  console.log('carouselData', carouselData)
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('activeIndex', activeIndex)
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const getGeneralIdeaCarouselCards = async () => {
      try {
        const carouselData = await APIManager.getGeneralIdeaCarouselCards();
        const randomIndex = Math.floor(Math.random() * carouselData.length);
        setCarouselData(carouselData);
        setActiveIndex(randomIndex);
      } catch (error) {
        console.error('Error while getting data:', error);

        navigate('/login', { replace: true });
      }
    };

    getGeneralIdeaCarouselCards();
    setTimeout(() => {
      setIsLoading(false);
    }, 1100);
  }, []);


  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * carouselData.length);
    setActiveIndex(randomIndex);
  }, [carouselData]);

  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * carouselData.length);
    setActiveIndex(randomIndex);
    slideRight();
  };

  const slideUp = async () => {
    sliderRef.current.classList.add('slide-up');

    setTimeout(() => {
      if (sliderRef.current !== null) {
        sliderRef.current.classList.remove('slide-up');
        nextCard();
      }
    }, constants.TIMEOUT_SLIDER_UP);

    sliderRef.current.classList.innerHTML = '';
  };

  const slideLeft = async () => {
    sliderRef.current.classList.add('slide-left');
    setTimeout(() => {
      if (sliderRef.current !== null) {
        sliderRef.current.classList.remove('slide-left');
        nextCard();
      }
    }, constants.TIMEOUT_SLIDER_LEFT);

  };

  const slideRight = async () => {
    sliderRef.current.classList.add('slide-right');
    setTimeout(() => {
      if (sliderRef.current !== null) {
        sliderRef.current.classList.remove('slide-right');
      }
    }, constants.TIMEOUT_SLIDER_RIGHT);

  };


  const deleteCard = async () => {
    closeModal()

    // const index = activeIndex;
    // carouselData.splice(index, 1);

    await APIManager.deleteCardForever(carouselData[activeIndex].key)
    setTimeout(() => {
      setCarouselData((prevCards) => prevCards.filter((card) => card.key !== carouselData[activeIndex].key));
    }, constants.TIMEOUT_DELETE_CARD);

    slideLeft()
  };

  const addCard = async () => {
    await APIManager.addPersonalIdeaCard(carouselData[activeIndex].key)
    deleteCard()
    slideUp();
  };

  const waitCard = () => {
    slideLeft();
  };

  console.log('carouselData', carouselData)
  // console.log('carouselData[activeIndex].image', carouselData[activeIndex].image)

  return (
    <>
      {isLoading && (<Preloader />)}
      <section className={`ideas ${isLoading ? 'loading' : ''}`}>
        <div ref={sliderRef} className='ideas__carousel-card slider slide-animation' >
          {carouselData && carouselData[activeIndex] && (
            <>
              <h2 className='ideas__carousel-card_title' style={{ color: `${carouselData[activeIndex].title.color}` }}>{carouselData[activeIndex].title[translation.lang]}</h2>
              <p className='ideas__carousel-card_subtitle'>{carouselData[activeIndex].subtitle[translation.lang]}</p>
              <LazyLoadImage effect='blur' className='ideas__carousel-card_image' src={`${constants.baseURL}/${carouselData[activeIndex].image}`} />
              {carouselData[activeIndex].link === true && (<Link to={`/ideas/articles/${carouselData[activeIndex].name}`} className='ideas__carousel-card_link'>{translation.ideas.linkButton}</Link>)}
            </>
          )}
        </div>

        <div className='ideas__carousel-card_buttons'>
          {carouselData.length ? (
            <>
              <button onClick={openModal} ><img src={deleteButton} className='ideas__carousel-card_button' /></button>
              <button onClick={waitCard} ><img src={waitButton} className='ideas__carousel-card_button' /></button>
              <button onClick={addCard}  ><img src={checkButton} className='ideas__carousel-card_button' /></button>
            </>
          ) : (
            <>
              <button onClick={openModal} disabled><img src={deleteButton} className='ideas__carousel-card_button' style={{ opacity: '0.3' }} /></button>
              <button onClick={waitCard} disabled><img src={waitButton} className='ideas__carousel-card_button' style={{ opacity: '0.3' }} /></button>
              <button onClick={addCard} disabled ><img src={checkButton} className='ideas__carousel-card_button' style={{ opacity: '0.3' }} /></button>
            </>)}
        </div>
        {isModalOpen && (
          <>
            <div className='modal-overlay' onClick={closeModal}></div>
            <div className='modal-card__container'>
              <div className='modal-card__container_content_delete' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '20px' }}>
                  <h1>{translation.ideas.deleteCardForeverTitle}</h1>
                  <h3>{translation.ideas.deleteCardForeverSubtitle}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginBottom: '30px' }}>
                  <button onClick={closeModal}><img src={deleteButton} className='ideas__carousel-card_button' /></button>
                  <button onClick={deleteCard}><img src={checkButton} className='ideas__carousel-card_button' /></button>
                </div>

                <button className='modal__close-btn' onClick={closeModal}></button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default IdeasCarousel;