const express = require('express');
const router = express.Router();
const { getAllUsefulArticles, getArticle, addArticleToFavorite, getUserArticles } = require('../controllers/articles');
const auth = require('../middlewares/auth');

router.get('/articles', auth, getAllUsefulArticles);
router.get('/articles/article/:articleURL', auth, getArticle);
router.get('/articles/user-favorite-list', auth, getUserArticles);

router.post('/articles/add-favorite', auth, addArticleToFavorite);
// router.post('/profile', auth, getUserData);

module.exports = router;


