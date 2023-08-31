import React from 'react';
import { NavLink } from 'react-router-dom';

import StickyHeader from './StickyHeader';
import IdeasCarousel from './IdeasCarousel';

function Ideas(props) {
  return (
    <div className='page'>
      <div className='page__sticky-header'>
        <StickyHeader loggedIn={props.loggedIn} loggedOut={props.loggedOut} isMobile={props.isMobile}>
          <NavLink to='/profile' className='sticky-header__button_home'></NavLink>
        </StickyHeader>
      </div>
      <IdeasCarousel />
    </div>
  );
}

export default Ideas;
