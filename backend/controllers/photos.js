const Photo = require('../models/photo')
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const tokenService = require('../service/token')
const photoService = require('../service/photos')
const UserDto = require('../dto/user-dto')
const userService = require('../service/users')
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const LIKE_PHOTO_STATUS = require('../constants/constants')


const getPhotogallery = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  try {
    const photogallery = await Photo.find();

    // Formation of an array of objects with information about images
    const photosData = photogallery.map(photo => ({
      _id: photo._id,
      user: photo.user,
      title: photo.title,
      description: photo.description,
      likes: photo.likes,
      path: photo.name, // URL to access the image
      ownerAvatar: photo.ownerAvatar
    }));
    console.log('photosData:', photosData);

    res.status(200).json(photosData);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Error retrieving images' });
  }
}



const postNewPhoto = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { title, description } = req.body;
    const file = req.file;

    // Data processing

    console.log('file:', file);
    console.log('Title:', title);
    console.log('Description:', description);

    const userData = req.headers;
    const user = await userService.findUserByJWT(userData);
    console.log('user:', user);

    if (user) {
      const newPhoto = await Photo.create({
        title: title,
        name: file.originalname,
        description: description,
        user: user._id,
        path: file.path,
        likes: [],
        ownerAvatar: user.avatar
      });
      console.log('newPhoto:', newPhoto);
      return newPhoto
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Request processing error:', error);
    res.status(500).json({ error: 'Request processing error:' });
  }
};

const deletePhoto = async (req, res) => {
  const { photoId } = req.params;
  console.log('deletePhoto photoId', photoId)
  try {
    await photoService.findAndDeletePhoto(photoId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Error when deleting a photo' });
  }
};

const likePhoto = async (req, res) => {
  const { photoId } = req.params;
  console.log('photoId = ', photoId)
  const userData = req.headers;
  console.log('userData = ', userData)
  const user = await userService.findUserByJWT(userData);
  console.log('likePhoto user = ', user)

  try {
    const likeStatus = await photoService.findAndLikePhoto(photoId, user._id)
    console.log('likeStatus = ', likeStatus);
    if (likeStatus === LIKE_PHOTO_STATUS.unknown) {
      console.log('The requested resource was not found = ',);
      res.status(404).json({ statusLike: likeStatus });
    } else {
      res.status(200).json({ statusLike: likeStatus });
    }
    return likeStatus;

  } catch (e) {
    console.log('Error when to like photo =', e);
    res.status(500).json({ error: 'Error when to like photo =' });
  }
};


module.exports = {
  postNewPhoto,
  getPhotogallery,
  deletePhoto,
  likePhoto
};


