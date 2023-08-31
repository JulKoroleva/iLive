import React, { useState } from 'react';

const PhotoSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="idea-article__photo-slider">
      <button className="prev-button" onClick={prevImage}>Previous</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button className="next-button" onClick={nextImage}>Next</button>
    </div>
  );
};

export default PhotoSlider;