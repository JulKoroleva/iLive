import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import StickyHeader from './StickyHeader';
import { TranslationContext } from '../context/TranslationContext';
import underConstructionImage from '../images/underconstruction/underConstraction.svg'
import greyGear from '../images/underconstruction/grey_gear.svg'
import darkGear from '../images/underconstruction/dark_gear.svg'
import blueGear from '../images/underconstruction/blue_gear.svg'

const UnderConstruction = (props) => {
  const navigate = useNavigate();
  const translation = useContext(TranslationContext);

  useEffect(() => {
    if (!props.loggedIn) {
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <section className='page'>
        <StickyHeader loggedIn={props.loggedIn} isMobile={props.isMobile} loggedOut={props.loggedOut} >
                <NavLink to='/profile' className={`sticky-header__button_home`}></NavLink>
        </StickyHeader>
        <div className='page__construction'>
        <img className='page__construction_image' src={underConstructionImage}></img>
        <img className='page__construction_gear grey' src={greyGear}></img>
        <img className='page__construction_gear dark' src={darkGear}></img>
        <img className='page__construction_gear blue' src={blueGear}></img>
        </div>
        <div className='page__construction_title'>
            <h2>{translation.underConstruction.title} :(</h2>
            <NavLink to='/home' className='page__construction_text_button'>{translation.underConstruction.button}</NavLink>
        </div>
    </section>
  );
};

export default UnderConstruction;
