const express = require('express');
const router = express.Router();
const fileMulter = require('../middlewares/file')
const auth = require('../middlewares/auth');

const { getPhotogallery, postNewPhoto, deletePhoto, likePhoto } = require('../controllers/photos');

router.get('/photogallery', auth, getPhotogallery);

router.post('/photogallery/post', auth, fileMulter.single('photo'), postNewPhoto);

router.delete('/photogallery/delete/:photoId', auth, deletePhoto)

router.get('/photogallery/photos/:photoId/likes', auth, likePhoto);

module.exports = router;