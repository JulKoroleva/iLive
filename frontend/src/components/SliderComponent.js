import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ghfh from '../images/like__button.svg'

const SliderComponent = (props) => {
  return (
    <Carousel>
      {props.children}
    </Carousel>
  );
};

export default SliderComponent;
