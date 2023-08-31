import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import Article from './Article';

import APIManager from '../utils/api';
import * as auth from '../utils/auth';
import * as constants from '../constants/constants';

function UserArticle(props) {
  const [articles, setArticles] = useState([]);

  return (
    <div>
      {props.articles.map((articleId) => {
        const matchingArticle = props.articles.find((article) => article.id === articleId);
        if (matchingArticle) {
          return (
            <Article
              article={matchingArticle}
              key={matchingArticle.id}
              onClick={props.handleArticleClick}
              addArticleToFavorite={props.addArticleToFavorite}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default UserArticle;
