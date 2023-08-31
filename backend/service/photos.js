const User = require('../models/users')
const fs = require('fs');

const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const tokenService = require('./token')
const UserDto = require('../dto/user-dto')
const ServerError = require('../exceptions/error')
const IdeaCard = require('../models/idea_cards')
const Photo = require('../models/photo')
const {LIKE_PHOTO_STATUS} = require('../constants/constants')

class photoService {
    async findAndDeletePhoto(photoId) {
        try {
          const photo = await Photo.findById(photoId);
          console.log('photo', photo)
          if (photo) {
            await Photo.deleteOne({ _id: photoId });
            const imagePath = photo.path;
            if (fs.existsSync(imagePath)) {
              // Delete the file
              fs.unlink(imagePath, (error) => {
                if (error) {
                  console.log('Error deleting file:', error);
                } else {
                  console.log('File deleted successfully.');
                }
              });
            } else {
              console.log('File not found.');
            }
          }
        } catch (e) {
          console.log('Error deleting photo:', e);
        }
      }


      async  findAndLikePhoto(photoId, userId) {
        try {
          const currentPhoto = await Photo.findById(photoId);
          console.log('currentPhoto = ', currentPhoto);
          console.log('userId = ', userId);
          
          if (currentPhoto) {
            const findedItemIndex = currentPhoto.likes.findIndex(like => JSON.stringify(like) === JSON.stringify(userId));
           
            console.log('findedItemIndex', findedItemIndex);
            console.log('findedItemIndex', findedItemIndex);

            if (findedItemIndex === -1) {
                currentPhoto.likes.push(userId);
                currentPhoto.markModified('likes');
                await currentPhoto.save();
                console.log('User liked the photo');
                return LIKE_PHOTO_STATUS.liked
            } else {
                currentPhoto.likes.splice(findedItemIndex, 1);
                currentPhoto.markModified('likes');
                await currentPhoto.save();
                console.log('User already liked the photo');
                console.log('LIKE_PHOTO_STATUS.unliked', LIKE_PHOTO_STATUS.unliked);
                return LIKE_PHOTO_STATUS.unliked
            }
          } else {
            console.log('Photo not found');
            return LIKE_PHOTO_STATUS.unknown
          }
        } catch (e) {
          console.log('Error when searching and adding a like to a photo:', e);
        }
      }
      
}


module.exports = new photoService()