import React, { useState, useEffect, useContext, useRef } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

import { TranslationContext } from '../context/TranslationContext';
import { homeMainText } from '../constants/homePageText';
import UpperHeader from './UpperHeader';
import SlideBar from './SlideBar';
import StickyHeader from './StickyHeader';
import LanguageButton from './LanguageButton';

function Home(props) {
  const translation = useContext(TranslationContext);
  console.log('translation', translation)

  const [isSticky, setIsSticky] = useState(false);
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    const onEntry = (entry) => {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          change.target.classList.add('element-show');
        }
      });
    };

    const options = {
      threshold: 0.05,
    };

    observer.current = new IntersectionObserver(onEntry, options);

    const elements = document.querySelectorAll('.element-animation');
    elements.forEach((elm) => {
      observer.current.observe(elm);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 600);
      setIsHomeButtonVisible(true)
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 600);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);
  

  return (
    <div className='page'>
      <UpperHeader>
        <nav>
          {!props.isMobile && <LanguageButton />}
        </nav>

        <nav className='upper-header__container'>
          {props.loggedIn ? (
            <>
              <NavLink to='/profile' className='upper-header__button upper-header__button_home'></NavLink>
            </>
          ) : (
            <>
              <NavLink to='/registration' className='upper-header__button_signup'>{translation.signup.homeRegButton}</NavLink>
              <NavLink to='/login' className='upper-header__button_signin'>{translation.login.homeLogButton}</NavLink>
            </>
          )}
        </nav>
      </UpperHeader>

      <SlideBar />
      <section className='home__main'>
        {props.loggedIn ? (
          <StickyHeader isSticky={isSticky} isHomeButtonVisible={isHomeButtonVisible}  loggedOut={props.loggedOut} loggedIn={props.loggedIn} isMobile={props.isMobile}>
            {props.isMobile && <LanguageButton />}
          </StickyHeader>
        ) : (
          <StickyHeader isSticky={isSticky} isHomeButtonVisible={isHomeButtonVisible} isMobile={props.isMobile}>{props.isMobile && <LanguageButton />}</StickyHeader>
        )}

        <div className='home__main_text'>
          <div className='element-animation'>
          <h2 className='home__main_text_title'>
            {homeMainText.titleIntroduction[translation.lang]}
          </h2> 
          <h3 className='home__main_text_subtitle'>
            {homeMainText.subtitleIntroduction[translation.lang]}
          </h3> 
          <p className='home__main_text_paragraph' style={{color:'gray', fontWeight: '500', width: '90%'}}>
            {homeMainText.paragraphFirst[translation.lang]}
          </p> 
          </div>

          <div className='element-animation'>
          <h2 className='home__main_text_title'>
            {homeMainText.titleOne[translation.lang]}
          </h2>
          <p className='home__main_text_paragraph'>
            {homeMainText.paragraphSecond[translation.lang]}
          </p>  
          <p className='home__main_text_paragraph'>
            {homeMainText.paragraphThird[translation.lang]}
          </p> 
          <p className='home__main_text_paragraph'>
            {homeMainText.paragraphFourth[translation.lang]}
          </p> 
          </div>

          <div className='element-animation'>
          <h2 className='home__main_text_title' style={{fontWeight:'600'}}>
            {homeMainText.titleTwo[translation.lang]}
          </h2>
          <p className='home__main_text_paragraph'>
            <NavLink to='/ideas' className='home__main_text_button'>{homeMainText.firstButton[translation.lang]}</NavLink>
            {homeMainText.paragraphFifth[translation.lang]}
          </p>           
          <p className='home__main_text_paragraph' style={{color:'rgb(166 166 166 / 61%)'}}>
            {homeMainText.paragraphSixth[translation.lang]}
          </p>         
          <p className='home__main_text_paragraph'>
            <NavLink to='/articles' className='home__main_text_button'>{homeMainText.secondButton[translation.lang]}</NavLink>
            {homeMainText.paragraphSeventh[translation.lang]}
          </p> 
          <p className='home__main_text_paragraph'>
            <NavLink to='/photogallery' className='home__main_text_button'>{homeMainText.thirdButton[translation.lang]}</NavLink>
            {homeMainText.paragraphEighth[translation.lang]}
          </p> 
          <p className='home__main_text_paragraph'>
          <NavLink to='/registration' className='home__main_text_button'>{homeMainText.fourthButton[translation.lang]}</NavLink>
          {homeMainText.paragraphNinth[translation.lang]}
          </p> 
          <p className='home__main_text_paragraph'>
          {homeMainText.paragraphTenth[translation.lang]}
          </p>
          </div>
          <div className='element-animation' style={{textAlign: 'center' , backgroundColor: 'rgba(159, 191, 208, 0.762)', borderRadius: '20px'}}>
          <NavLink to='/registration' className='home__main_text_button' style={{backgroundColor: 'transparent'}}>{homeMainText.fifthButton[translation.lang]}</NavLink>
        </div>
        </div>
      </section>
      <footer className='footer'></footer>
    </div>
  );
}

export default Home;
