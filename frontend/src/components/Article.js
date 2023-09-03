import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TranslationContext } from '../context/TranslationContext';
import * as constants from '../constants/constants';


function Article(props) {
  const translation = useContext(TranslationContext);
  const [isHovered, setIsHovered] = useState(false);

  console.log('props.article.url', `url(C:/Users/PC/Desktop/ilive/ilive/frontend/src/images/articles/bg/${props.article.url}.jpg)`)

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleArticleClick = () => {
    props.onClick(props.article);
  };

  const imageName = props.article.url.replace(/-/g, "");

  return (
    <div
      className={props.isGrid ? 'article__container-grid' : 'article__container-flex'}
      style={{ backgroundImage: `url(${constants.articleBackgrounds[imageName]})`, objectFit: 'cover', backgroundSize: 'cover' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
        to={{
          pathname: `/articles/article/${encodeURIComponent(props.article.url)}`,
          state: { article: props.article },
        }}
        onClick={handleArticleClick}
      >
        <h3 className='article__title'>{props.article.introduction.title[translation.lang]}</h3>
        <p className='article__subtitle'>{props.article.introduction.subtitle[translation.lang]}</p>
      </NavLink>
      {isHovered && (
        <button
          className={` ${props.isLiked ? 'article__button_like-button_active' : 'article__button_like-button'}`}
          onClick={() => props.addArticleToFavorite(props.article._id)}
        >
        </button>
      )}
    </div>
  );
}

export default Article;
