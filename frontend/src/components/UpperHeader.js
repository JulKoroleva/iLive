import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink} from 'react-router-dom';



function UpperHeader (props) {
    return (          
        <header className='upper-header'> 
              {props.children} 
        </header>
          );
        }
        
        export default UpperHeader;