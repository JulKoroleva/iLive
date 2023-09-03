import React, { useState, useEffect, useContext } from 'react';

import { TranslationContext } from '../context/TranslationContext';

import * as constants from '../constants/constants';
import APIManager from '../utils/api';

function Carousel() {
  const translation = useContext(TranslationContext);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [previousIndex, setPreviousIndex] = useState(activeIndex);

  const getCarouselData = async () => {
    const jsonData = await APIManager.getCarouselData();
    if (jsonData) {
      setData(jsonData);
    }
  };

  console.log('Carousel data = ', data)
  useEffect(() => { 
    getCarouselData();
  }, []);


  useEffect(() => {
    nextSlide();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Automatic forward switching
      nextSlide();
    }, 5000);

    
      clearInterval(interval);
   
  }, [activeIndex]);

  const prevSlide = () => {
    const lastIndex = data.length - 1;
    const index = activeIndex === 0 ? lastIndex : activeIndex - 1;
    setActiveIndex(index);
    setPreviousIndex(activeIndex);
  };

  const nextSlide = () => {
    const lastIndex = data.length - 1;
    const index = activeIndex === lastIndex ? 0 : activeIndex + 1;
    setActiveIndex(index);
    setPreviousIndex(activeIndex);
  };

  return (
    <>
      <div className="home__carousel_buttons">
        <button className="home__carousel_left-button" onClick={prevSlide}></button>
        <button className="home__carousel_right-button" onClick={nextSlide}></button>
      </div>
      <div className="home__carousel">
        {data.map((item, index) => (
          <div key={index} className={`home__carousel_item ${index === activeIndex ? 'active' : ''} ${index === previousIndex ? 'previous' : ''}`} >
           <div style={{display:'flex', width:'45%', justifyContent:'flex-start'}}>
            <img src={`${constants.baseURL}/${item.image}`} className="home__carousel_image" />
           </div>
           
            <p className="home__carousel_text">{item.title[translation.lang]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carousel;
