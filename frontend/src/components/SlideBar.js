import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

import foreground from '../images/header/foreground.png';
import backgroundLine from '../images/header/background_line.png';
import Carousel from './Carousel';

function SlideBar() {
  return (
    <>
      <div className='slide-bar'>
        <div className='slide-bar__gradient'>
          <svg  width="100%" height="240px" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="paint0_linear_4_115" x1="0" y1="423.8" x2="1920" y2="423.8" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#4D7FC7">
                  <animate attributeName="stop-color" values="#4D7FC7; #73EC95; #F6FDA4; #C53F3F; #4D7FC7" dur="10s" repeatCount="indefinite" />
                </stop>
                <stop offset="1" stop-color="#A1CFFC">
                  <animate attributeName="stop-color" values="#A1CFFC; #42C53F; #D4A21F; #EC7373 ; #A1CFFC" dur="10s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M1920 847V22.1718C1778.96 89.6937 1680.38 51.2256 1554.43 18.472C1501.64 4.74331 1430.34 -0.489662 1364.73 35.2289C1134.63 160.516 1094.46 32.4097 929.277 40.1325C827.305 44.8966 761.134 84.0173 701.33 120.521C603.459 180.257 522.731 232.942 330.283 116.27C160.402 13.2707 57.9385 -3.96142 0 1.4933V847H1920Z" fill="url(#paint0_linear_4_115)"/>
          </svg>
        </div>

        <div className='slide-bar__line'></div>

        <img src={foreground} className='slide-bar__foreground' />
        <Carousel />
      </div>
    </>
  );
}

export default SlideBar;
