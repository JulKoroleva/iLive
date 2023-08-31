const UsefulArticle = require('../models/article');
const mongoose = require('mongoose');
const userService = require('../service/users')

const getAllUsefulArticles = async (req, res) => {
  try {
    const allUsefulArticles = await UsefulArticle.find();
    res.json(allUsefulArticles);
  } catch (error) {
    console.error('Error getting data from database:', error);
     res.status(500).send('Internal Server Error');
   }
};

const getArticle = async (req, res) => {
    const { articleURL } = req.params;
    console.log('articleTitle', articleURL)
    try {
      const foundArticle = await UsefulArticle.findOne({ url: articleURL });
      res.json(foundArticle);
    } catch (error) {
      console.error('Error getting data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const addArticleToFavorite = async (req, res) => {
    const { articleId } = req.body;
    const userData = req.headers;
    const user = await userService.findUserByJWT(userData);
    console.log('articleId', articleId);
    
    if (user) {
      try {
        const selectedArticle = await UsefulArticle.findById(articleId);
  // Check if the selected article exists
        if (!selectedArticle) {
          return res.status(404).send('Article not found');
        }
  
        const userFavoriteArticles = `${user.email}_favorite-articles`; // collection name
  
        // Initialize the collection if it hasn't been created yet
        user.collections[userFavoriteArticles] = user.collections[userFavoriteArticles] || [];
 
        // Check if the collection contains an article
        const articleIndex = user.collections[userFavoriteArticles].indexOf(articleId);
 
        // If the article is already in the collection, then delete it
        if (articleIndex !== -1) {
          user.collections[userFavoriteArticles].splice(articleIndex, 1);
        } else {
          // If the article is not in the collection, then add it
          user.collections[userFavoriteArticles].push(articleId);
        }
        user.markModified('collections');
        await user.save();
  
        res.status(200).send('The article was successfully updated in the collection');
       } catch (error) {
         console.error('Error updating article in collection:', error);
         res.status(500).send('Internal Server Error');
       }
     } else {
       res.status(401).send('User not found');
     }
   };
  
  
  
  
  const getUserArticles = async (req, res) => {
    const userData = req.headers;
    const user = await userService.findUserByJWT(userData);
  
    if (user) {
      try {
        
        const userFavoriteArticles = user.collections[`${user.email}_favorite-articles`];  
        if (userFavoriteArticles) {
          console.log('userFavoriteArticles' , userFavoriteArticles);
         // Send response to Fetch request
         return res.json(userFavoriteArticles);
        } else {
          console.log(`Collection with name '${user.email}_favorite-articles' not found.`);
        }
      } catch (error) {
        console.error('Error getting user articles:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('User not found');
    }
  };

module.exports = {
  getAllUsefulArticles,
  getArticle,
  addArticleToFavorite,
  getUserArticles
};