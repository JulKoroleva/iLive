const HomeCard = require('../models/home_cards');
const mongoose = require('mongoose');
const path = require('path');

module.exports.getHomeCards = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const carouselDataQuery = await HomeCard.find();
  console.log('carouselDataQuery = ', carouselDataQuery)
  console.log('lalal')

  const originalPath = path.join(__dirname, 'IdeasArticles', 'ideasImages');
  const modifiedPath = originalPath.replace('controllers', 'components');

  let carouselData = carouselDataQuery.map(function (queryObject) { return queryObject.toObject(); });
  const homeCardsData = carouselDataQuery.map(card => ({
    _id: card._id,
    title: card.title,
    image: card.image, // Relative path to the image
  }));
  console.log('carouselData = ', carouselData)
  res.json(homeCardsData);

}