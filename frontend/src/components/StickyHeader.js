import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { TranslationContext } from '../context/TranslationContext';

import menuButton from '../images/header/menu_mobile.png';

function StickyHeader(props) {

  const translation = useContext(TranslationContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);    
    document.removeEventListener('click', handleOutsideClick);   
  }, [isMenuOpen]);

  console.log("isHomeButtonVisible:", props.isHomeButtonVisible);
  console.log("props.isSticky:", props.isSticky);
  
  return (
    <div className='sticky__container'>
      {props.isMobile ? (
        <>
          <button
            onClick={handleMenuToggle}
            className={isMenuOpen ? 'mobile-menu__button_menu_disable' : 'mobile-menu__button_menu'}
          >
            <img src={menuButton} style={{ width: '100%' }} />
          </button>
          {isMenuOpen && (
            <nav ref={menuRef} className='mobile-menu'>
              {props.loggedIn && 
              (<NavLink to='/profile' className='mobile-menu__button'>
                {translation.stickyMenu.profile}
              </NavLink>)}
              <NavLink to='/home' className='mobile-menu__button'>
                {translation.stickyMenu.homePage}
              </NavLink>
              <NavLink to='/articles' className='mobile-menu__button'>
                {translation.stickyMenu.articles}
              </NavLink>
              <NavLink to='/tests' className='mobile-menu__button'>
                {translation.stickyMenu.tests}
              </NavLink>
              <NavLink to='/ideas' className='mobile-menu__button'>
                {translation.stickyMenu.ideas}
              </NavLink>
              <NavLink to='/photogallery' className='mobile-menu__button'>
                {translation.stickyMenu.photogallery}
              </NavLink>
              {props.loggedIn && 
              (<NavLink to='/logout' className='mobile-menu__button mobile-menu__button_exit' onClick={props.loggedOut}>
                {translation.stickyMenu.logout}
              </NavLink>)}
            </nav>
          )}
        </>
      ) : (
        <nav className={`sticky-header ${props.isSticky ? 'sticky-header--sticky' : ''}`}>
          <NavLink to='/home' className='sticky-header__button'>
            {translation.stickyMenu.homePage}
          </NavLink>
          <NavLink to='/articles' className='sticky-header__button'>
            {translation.stickyMenu.articles}
          </NavLink>
          <NavLink to='/tests' className='sticky-header__button'>
            {translation.stickyMenu.tests}
          </NavLink>
          <NavLink to='/ideas' className='sticky-header__button'>
            {translation.stickyMenu.ideas}
          </NavLink>
          <NavLink to='/photogallery' className='sticky-header__button'>
            {translation.stickyMenu.photogallery}
          </NavLink>
          {props.children}
        </nav>
      )}
      {props.isHomeButtonVisible && !props.isMobile && (
        <NavLink
          to='/profile'
          className={`sticky-header__button_home ${
            props.isSticky ? 'sticky-header__button_home_fadeIn' : 'sticky-header__button_home_fadeOut'
          }`}
        ></NavLink>
      )}
    </div>
  );
}

export default StickyHeader;
