import React, { useRef, useState, useEffect, useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import StickyHeader from './StickyHeader';
import Article from './Article';
import ArticlePage from './ArticlePage';
import UserArticles from './UserArticles';

import APIManager from '../utils/api';
import * as auth from '../utils/auth';
import * as constants from '../constants/constants';

import gridButton from '../images/articles/grid.png'
import flexButton from '../images/articles/flex.png'
import likeButton from '../images/like__button_active.svg'

function UsefulArticles(props) {
  const translation = useContext(TranslationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  
  const [userArticles, setUserArticles] = useState([]);

  const [isGrid, setIsGrid] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('allArticles');

  const handleTabChange = (tab) => {
    if (activeTab === 'userArticles'){
      setActiveTab('allArticles');
      document.querySelector('.articles__button_favorite').classList.remove('userArticles__active')
    } else {
      setActiveTab(tab);
      document.querySelector('.articles__button_favorite').classList.add('userArticles__active')
    }
    
  };

  const getUserArticles = async () => {
    try {
      const json = await APIManager.getUserArticles();
      console.log('Fetched user articles:', json);
      setUserArticles(json);
      
    } catch (error) {
      console.error('Error while fetching user articles:', error);
    }    
  };
 

  const getUsefulArticle = async () => {
    try {
      const json = await APIManager.getUsefulArticle();
      console.log('setArticles json = ', json);
      setArticles(json);
      await getUserArticles();
    } catch (error) {
      console.error('Error while getting data:', error);
      navigate('/login', { replace: true });
    }
   
  };
  
  useEffect(() => {
    getUsefulArticle();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const addArticleToFavorite = async (articleId) => {
    const jwt = auth.getJwtFromLS();

    try {
      await fetch(`${constants.baseURL}${constants.API_paths.addArticleToFavorite}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
        body: JSON.stringify({ articleId }),
      });

      const updatedUserArticles = [...userArticles];
      if (updatedUserArticles.includes(articleId)) {
        updatedUserArticles.splice(updatedUserArticles.indexOf(articleId), 1); // Remove articleId from array
      } else {
        updatedUserArticles.push(articleId); // Add articleId to array
      }
      setUserArticles(updatedUserArticles);
    } catch (error) {
      console.error('Error while getting data:', error);
    }
  };

  const handleArticleClick = (article) => {
    console.log('handleArticleClick ', article)
    const articleTitle = encodeURIComponent(article.url);
    console.log('encodeURIComponent ', articleTitle)
    navigate(`/articles/article/${articleTitle}`);
  };

  const handleToggleLayout = () => {
    setIsGrid(!isGrid);
  };

  return (
    <>
      <section className='page'>
      {isLoading && (<Preloader/>)}
        <div className='page__sticky-header'>
          <StickyHeader loggedIn={props.loggedIn} loggedOut={props.loggedOut} isMobile={props.isMobile}>
            <NavLink to='/profile' className={`sticky-header__button_home`}></NavLink>
          </StickyHeader>
        </div>
        <div className={`page__article_info-container ${isLoading ? 'loading' : ''}`}>
          <button className='toggle-layout__button' onClick={handleToggleLayout}>
            {isGrid ? (<img style={{width:'100%'}} src={flexButton}/>) : (<img style={{width:'100%'}} src={gridButton}/>)}
          </button>
          
          <button className='articles__button_favorite' onClick={() => handleTabChange('userArticles')}>           
            <img style={{width:'35px'}} src={likeButton}/>
          </button>
        </div>
        
        <div className={`articles__container ${isLoading ? 'loading' : ''}`}>
          <div className={`articles ${isGrid ? 'grid-layout' : 'column-layout'}`}>
            {activeTab === 'allArticles' ? (
              articles.map((article) => (
                <Article
                  isGrid={isGrid}
                  article={article}
                  key={article._id}
                  onClick={handleArticleClick}
                  addArticleToFavorite={addArticleToFavorite}
                  isLiked={userArticles.includes(article._id)}
                />
              ))
            ) : activeTab === 'userArticles' ? (
              userArticles.length > 0 ? (
                articles
                  .filter((article) => userArticles.includes(article._id))
                  .map((article) => (
                    <Article
                      isGrid={isGrid}
                      article={article}
                      key={article._id}
                      onClick={handleArticleClick}
                      addArticleToFavorite={addArticleToFavorite}
                      isLiked={userArticles.includes(article._id)}
                    />
                    
                  ))
                  
              ) : (
                <p className='empty__title'>{translation.articles.emptyTitle}</p>
              )
            ) : null}
          </div>
        </div>
      </section>
      <Routes>
        <Route path='/articles/article/:articleTitle' element={<ArticlePage  loggedIn={props.loggedIn} loggedOut={props.loggedOut} isMobile={props.isMobile}/>} />
      </Routes>
    </>
  );
}
export default UsefulArticles;
