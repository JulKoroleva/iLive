import React, { useRef, useState, useEffect, useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';
import * as constants from '../constants/constants';
import * as auth from '../utils/auth';
import APIManager from '../utils/api';
import AnimatedButton from './AnimatedButton';
import brushButton  from '../images/propfile/drawing/paint-brush.png';


const UserDreamList = () => {
  const translation = useContext(TranslationContext);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [brushColor, setBrushColor] = useState('#4ca5e4');
  const [brushSize, setBrushSize] = useState(2);
  const [eraserMode, setEraserMode] = useState(false);
  const [maxHeight, setMaxHeight] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(maxHeight);
  const [drawingDataURL, setDrawingDataURL] = useState(null);
  const [completed, setCompleted] = useState(false);


  const getDrawingData = async () => {
    try {
      const jwt = auth.getJwtFromLS();
      const dataURL = await APIManager.getDrawing(jwt);
      if (dataURL) {
        localStorage.setItem('drawingDataURL', dataURL);
        setDrawingDataURL(dataURL);
      }
    } catch (error) {
      console.error('Error getting drawing:', error);
    }
  };


  
  useEffect(() => {
      getDrawingData();
  }, []);

  useEffect(() => {
    if (drawingDataURL) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = '#FFFFFF';
      const image = new Image();
      image.src = drawingDataURL;
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
      };
    }
  }, [drawingDataURL]);

  const getCanvasScalingFactor = () => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const currentCanvasWidth = canvas.clientWidth;
    return  currentCanvasWidth / canvasWidth;
    
  };

  const startDrawing = (event) => {
    setCompleted(false)
    setIsDrawing(true);
    setShowInstruction(false);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { clientX, clientY } = event.nativeEvent;

    // Calculate the scaling factor
    const scalingFactor = getCanvasScalingFactor();

    // Adjust the cursor position based on the scaling factor
    const offsetX = (clientX - canvas.getBoundingClientRect().left) / scalingFactor;
    const offsetY = (clientY - canvas.getBoundingClientRect().top) / scalingFactor;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { clientX, clientY } = event.nativeEvent;

    // Calculate the scaling factor
    const scalingFactor = getCanvasScalingFactor();

    // Adjust the cursor position based on the scaling factor
    const offsetX = (clientX - canvas.getBoundingClientRect().left) / scalingFactor;
    const offsetY = (clientY - canvas.getBoundingClientRect().top) / scalingFactor;

    if (offsetY > maxHeight) {
      setMaxHeight(offsetY + 10);
      setCanvasHeight(offsetY + 10);
    }

    // Adjust the drawing position to be centered under the cursor
    const halfBrushSize = brushSize / 2;
    context.lineTo(offsetX - halfBrushSize, offsetY - halfBrushSize);

    if (eraserMode) {
      context.strokeStyle = 'white';
    } else {
      context.strokeStyle = brushColor;
    }

    context.lineWidth = brushSize;
    context.stroke();
  };

  const startDrawingTouch = (event) => {
    event.preventDefault(); // Prevent common behavior (such as scrolling) on touch devices
    setCompleted(false);
    setIsDrawing(true);
    setShowInstruction(false);
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const touch = event.touches[0]; // Get the first touch
    
    const scalingFactor = getCanvasScalingFactor();
    const offsetX = (touch.clientX - canvas.getBoundingClientRect().left) / scalingFactor;
    const offsetY = (touch.clientY - canvas.getBoundingClientRect().top) / scalingFactor;
    
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };
  
  const finishDrawingTouch = () => {
    setIsDrawing(false);
  };
  
  const drawTouch = (event) => {
    if (!isDrawing) return;
    event.preventDefault();
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const touch = event.touches[0];
    
    const scalingFactor = getCanvasScalingFactor();
    const offsetX = (touch.clientX - canvas.getBoundingClientRect().left) / scalingFactor;
    const offsetY = (touch.clientY - canvas.getBoundingClientRect().top) / scalingFactor;
    
    if (offsetY > maxHeight) {
      setMaxHeight(offsetY + 10);
      setCanvasHeight(offsetY + 10);
    }
    
    const halfBrushSize = brushSize / 2;
    context.lineTo(offsetX - halfBrushSize, offsetY - halfBrushSize);
    
    if (eraserMode) {
      context.strokeStyle = 'white';
    } else {
      context.strokeStyle = brushColor;
    }
    
    context.lineWidth = brushSize;
    context.stroke();
  };

  
  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setBrushSize(newSize);
  };

  const handleColorChange = (event) => {
    setBrushColor(event.target.value);
    setEraserMode(false);
  };

  const handleEraserClick = () => {
    setEraserMode(!eraserMode);
  };



  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png', 0.9);
    const jwt = auth.getJwtFromLS();

    APIManager
      .saveDrawing(dataURL, jwt)
      .then(() => {
        localStorage.setItem('drawingDataURL', dataURL);
        setCompleted(true);
        console.log('Drawing saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving drawing:', error);
      });
  };

  return (
    <>
      <div className='drawing__container'>
        <div className='controls-container'>

          
          <button className={`erase-button  ${eraserMode ? 'active' : ''}`} onClick={handleEraserClick}></button>
          <button className={`brush-button  ${eraserMode ? '' : 'active'}`} onClick={handleEraserClick}>
            <img src={brushButton} style={{height:'100%'}}/>
          </button>

          
          <input className='brush-color' type='color' id='color' value={brushColor} onChange={handleColorChange} />


          <div className='brush-size-container'>            
            <input
              type='range'
              id='brush-size'
              className='brush-size-slider'
              min='1'
              max='10'
              value={brushSize}
              onChange={handleSizeChange}
            />
            <span style={{marginLeft: '5px'}}>{brushSize}</span>
          </div>

          
          <div className='item-button'>
          <AnimatedButton onClick={() => saveDrawing()} completed={completed} />
          </div>

        </div>
        <div className='canvas-container'>

          {!drawingDataURL && showInstruction && (
            <p className='instruction-text'>{translation.sketchpad}</p>
          )}
          <canvas
            ref={canvasRef}
            style={{ border: 'none' }}
            width={constants.CANVAS_WIDTH}
            height={canvasHeight}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawingTouch}  
            onTouchEnd={finishDrawingTouch} 
            onTouchMove={drawTouch}  
          />
        </div>
      </div>
    </>
  );
};

export default UserDreamList;
