import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";

import * as auth from '../utils/auth';
import * as constants from '../constants/constants';

import { CurrentUserContext } from '../context/CurrentUserContext';
import { TranslationContext, translations } from '../context/TranslationContext';

import Home from './Home';
import Profile from './Profile';
import Ideas from './Ideas';
import IdeaArticlePage from './IdeaArticlePage';
import UsefulArticles from './UsefulArticles';
import ArticlePage from './ArticlePage';
import Login from './Login';
import Registration from './Registration';
import Logout from './Logout';
import Photogallery from './Photogallery';
import UnderConstruction from './UnderConstruction';


const App = () => {
  const [lang, setLang] = useState(() => {
    // Try to get the selected language from localStorage
    const storedLanguage = localStorage.getItem('selectedLanguage');    
    if (!storedLanguage) {
      if (window.navigator.language.startsWith('ru')) {
        return 'ru'
      } else {
        return 'en'
      }
    } else {
      return storedLanguage
    }
  });

  const [errMessage, setErrMessage] = useState('');
  console.log('setErrMessage', errMessage)
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  console.log('lang', lang);
  
 


  useEffect(() => {
    const handleAuthorize = () => {
      
      const jwt = auth.getJwtFromLS();
      if (jwt) {
        // Validate the token on page load
        auth
          .checkToken(jwt)
          .then((response) => {
            if (response.status === 200) {
              setLoggedIn(true);
            } else {
              setLoggedIn(false);              
            }
          })
          .catch((error) => {
            console.log('Error validating token:', error);
            setLoggedIn(false);
          });
      }
    };

    handleAuthorize();
    
  }, []);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const handleLogOut = () => {
    if (loggedIn) {
      const token = auth.getJwtFromLS();
      auth.logout(token).then(() => {
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/home', { replace: true });
        window.location.reload();
      });
    } else {
      navigate('/home', { replace: true });
    }
  };
  

  const handleRegister = async (email, password) => {
       auth.register(password, email)
      .then(response => {
        if (response) { 
          navigate('/login', { replace: true });
        }
      })
      .catch(err => {
        console.error(err);
        setErrMessage(translations[lang].signup.errMessage);
      });
  };

  

  const handleLogin = async (email, password) => {
      auth.login(email, password)
     .then((response) => {
      console.log('response = ', response)
      if (response.ok) {
        setLoggedIn(true);                    
        navigate('/ideas', { replace: true });
        
      }
    })
    .catch(err => {
      console.error(err);       
      
      setErrMessage(translations[lang].login.errMessage);
    
    });

  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= constants.WINDOW_INNERWIDHT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= constants.WINDOW_INNERWIDHT);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
   }
  }, []);


  useEffect(() => {

  }, [loggedIn]); 
  
  const location = useLocation();

  useEffect(() => {
    setErrMessage('')
  }, [location.pathname]);

  return (
    <>
    <TranslationContext.Provider value={translations[lang]}>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/profile" replace /> : <Navigate to="/home" replace />
            }
          />
          <Route path="/home" element={<Home loggedOut={handleLogOut} loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route
            path="/profile"
            element={<Profile loggedOut={handleLogOut} loggedIn={loggedIn} isMobile={isMobile} />}
          />
          <Route path="/ideas" element={<Ideas loggedOut={handleLogOut} loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route
            path="/ideas/articles/:ideaArticleName"
            element={<IdeaArticlePage loggedIn={loggedIn} isMobile={isMobile}  lang={lang}/>}
          />
          <Route path="/articles" element={<UsefulArticles loggedOut={handleLogOut} loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route path="/articles/article/:articleTitle" element={<ArticlePage loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route path="/tests" element={<UnderConstruction loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route path="/photogallery" element={<Photogallery loggedOut={handleLogOut} loggedIn={loggedIn} isMobile={isMobile} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} loggedIn={loggedIn} errMessage={errMessage} isMobile={isMobile} />} />
          <Route path="/registration" element={<Registration onRegister={handleRegister}  errMessage={errMessage} isMobile={isMobile} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

         <CookieConsent
            location="bottom"
            buttonText="Принять"
            cookieName="myCookieConsent"
            style={{ background: "#333", opacity: 0.9 }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={constants.COOKIES_EXPIRES}
          >
            Этот сайт использует куки для лучшей работы.
          </CookieConsent>
      </CurrentUserContext.Provider>
      </TranslationContext.Provider>
    </>
  );
};

export default App;
