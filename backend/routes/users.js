const express = require('express');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const { registration, login, logout, ckechToken, changeUserAvatar, getUserData, updateUserInfo, postUserDrawing, getDrawing } = require('../controllers/users');
const auth = require('../middlewares/auth');
const avatarMulter = require('../middlewares/userAvatar')

router.post('/registration', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), registration);

router.post('/login', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.post('/logout', auth, logout);
router.post('/checkToken', auth, ckechToken);

router.get('/profile', auth, getUserData);
router.patch('/profile/update-user', auth, updateUserInfo);
router.post('/profile/avatar', auth, avatarMulter.single('avatar'), changeUserAvatar);

router.post('/profile/drawing', auth, postUserDrawing);
router.get('/profile/drawing', auth, getDrawing);
module.exports = router;