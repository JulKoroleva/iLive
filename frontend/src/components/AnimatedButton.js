import React, { useState } from 'react';

const AnimatedButton = ({ onClick, completed }) => {
  return (
    <button className={`animated-button canvas__save-button ${completed ? 'completed' : ''}`} onClick={onClick}>
      <div className={`checkmark ${completed ? 'checked' : ''}`}>
        <svg className="svg-icon" viewBox="0 0 20 20">
          <path d="M5,10.75 L8.5,14.25 L15,7"></path>
        </svg>
      </div>
    </button>
  );
};

export default AnimatedButton;
