const express = require('express');
const router = express.Router();
const { getHomeCards } = require('../controllers/home_cards');

router.get('/get_carousel_cards', getHomeCards);

module.exports = router;