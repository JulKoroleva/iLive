import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import flag_en from "../images/header/upper-header/__language-flag/flag_en.png";
import flag_ru from "../images/header/upper-header/__language-flag/flag_ru.png";
import downArrow from "../images/header/upper-header/__language-flag/down-arrow.png";

function LanguageButton() {
  const languageFlags = {
    en: flag_en,
    ru: flag_ru,
  };

  const getBrowserLanguage = () => {    
    let userLanguage = '';

    if (window.navigator.language.startsWith('ru')) {
      userLanguage = 'ru'
    } else {
      userLanguage = 'en'
    }
    return userLanguage
  };

  // Check if the selected language is available in the languageFlags object
  const isLanguageAvailable = (language) => Object.keys(languageFlags).includes(language);

 const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
 const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Try to get the selected language from localStorage
    const storedLanguage = localStorage.getItem('selectedLanguage');    
    return isLanguageAvailable(storedLanguage) ? storedLanguage : getBrowserLanguage();
  });

  console.log('storedLanguage = ', localStorage.getItem('selectedLanguage'))
    console.log('getBrowserLanguage() = ', getBrowserLanguage())

  const menuRef = useRef(null);

  // Close the menu with a delay
  const closeMenuWithDelay = () => {
    setTimeout(() => {
      setIsLanguageMenuVisible(false);
    }, 200); 
  };

  useEffect(() => {
    if (isLanguageMenuVisible) {
      document.addEventListener('mouseleave', closeMenuWithDelay);
      document.addEventListener('mouseleave', closeMenuWithDelay);

    }    
  }, [isLanguageMenuVisible]);

  // Event handler when hovering over the language button
  const handleLanguageButtonHover = () => {
    setIsLanguageMenuVisible(true);
  };

  // Language selection handler from the menu
  const handleLanguageSelect = (language) => {
    if (isLanguageAvailable(language)) {
      setSelectedLanguage(language);
      setIsLanguageMenuVisible(false);
      localStorage.setItem('selectedLanguage', language);
      window.location.reload();
    }
  };

  // Event handler when the mouse leaves the menu
  const handleMenuLeave = () => {
    // Check if the cursor is over the menu
    if (!menuRef.current.contains(document.activeElement)) {
      setIsLanguageMenuVisible(false);
    }
  };

  return (
    <nav style={{ position: "relative" }} ref={menuRef} onMouseLeave={handleMenuLeave}>
      <button
        data-testid="test-lang-button"
        className='upper-header__button_language_menu'
        onMouseEnter={handleLanguageButtonHover}
      >
        <img src={languageFlags[selectedLanguage]} alt={selectedLanguage} className="upper-header__language-flag" />
        <h4 style={{margin: "0 10px ", }}>
          {selectedLanguage === 'ru' ? ('Русский') : ('English')}
        </h4>
        <img src={downArrow}  style={{height: "16px", }} />
      </button>
      
      {isLanguageMenuVisible && (
        <div className='upper-header__button_language_menu_visible'>
          <ul>
            <li>
              <button className='upper-header__language-button' onClick={() => handleLanguageSelect('en')}>
                <img src={languageFlags['en']} alt="English" className="upper-header__language-flag" />
                <h4 style={{margin: "0 10px ", fontWeight: "normal"}}>English</h4>
              </button>
            </li>
            <li>
              <button data-testid="test-ru-lang-button" className='upper-header__language-button' onClick={() => handleLanguageSelect('ru')}>
                <img src={languageFlags['ru']} alt="Русский" className="upper-header__language-flag" />
                <h4 style={{margin: "0 10px ", fontWeight: "normal"}}>Русский</h4>
              </button>
            </li>           
          </ul>
        </div>
      )}
    </nav>
  );
}

export default LanguageButton;
