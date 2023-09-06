const User = require('../models/users')
const Photo = require('../models/photo')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const tokenService = require('../service/token')
const userService = require('../service/users')
const UserDto = require('../dto/user-dto')
const fs = require('fs');
const path = require('path');

const registration = async (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  try {
    const { email, password } = req.body
    console.log('req.body = ', req.body)
    const userData = await userService.registration(email, password);
    console.log('userData.refreshToken = ', userData)

    return res.json(userData);

  } catch (e) {
    next(e);
  }
}


const login = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  try {
    const { email, password } = req.body;
    console.log('req.body = ', req.body);
    const userData = await userService.login(email, password);
    console.log('userData.!login = ', userData);

    return res.json(userData);
  } catch (e) {
    console.log(e)
    next(e);
  }
}

const logout = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');


  try {
    const refreshToken = req.body;
    console.log('Looking for a token', req.body)
    // Deleting the token from the database
    await userService.logout(refreshToken);
    return res.json({ message: 'Token removed' });
  } catch (e) {
    console.log(e);
  }
};


const ckechToken = async (req, res) => {
  const userData = req.headers;

  try {
    const user = await userService.findUserByJWT(userData);
    res.status(200).json({ status: "Authorized", user });
  } catch (error) {
    res.status(401).json({ status: "Unauthorized" });
  }
};


const getUserData = async (req, res) => {
  const userData = req.headers;
  console.log('getUserDat auserData = ', userData);
  try {
    const user = await userService.findUserByJWT(userData);
    if (user) {
      res.status(200).json(user);
    }
  }
  catch (error) {
    console.error('Error when changing avatar = ', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const changeUserAvatar = async (req, res) => {
  const userData = req.headers;
  const file = req.file;
  console.log('file:', file);


  const user = await userService.findUserByJWT(userData);


  // Get file path
  const filePath = file.path;

  // Generate a new filename based on the user ID
  const newFileName = `${user._id}${path.extname(file.originalname)}`;
  console.log('filePath', filePath);
  // Formation of a new path to the file
  const newFilePath = path.join(path.dirname(filePath), newFileName);
  console.log('newFilePath', newFilePath);
  try {
    // Check if file with new name exists
    if (fs.existsSync(newFilePath)) {
      // If the file exists, delete it
      fs.unlinkSync(newFilePath);
    }

    // Rename file
    fs.renameSync(filePath, newFilePath);

    // Rename file
    user.avatar = newFilePath;
    await user.save();

    try {
      // Find all photos containing user._id
      const photos = await Photo.find({ user: user._id });

      // Update the avatar property of each photo
      for (const photo of photos) {
        photo.ownerAvatar = newFilePath;
        await photo.save();
      }
    } catch (e) {
      console.error('Error when changing avatar in photos = ', error);
    }
    console.log('user.avatar', user.avatar)
    // Return a response
    res.status(200).json(user.avatar);
  } catch (error) {
    console.error('Error when changing avatar = ', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}


const updateUserInfo = async (req, res) => {
  const userData = req.headers;

  try {
    const { name, age, quote } = req.body;
    console.log('newInfo = ', name, age, quote);
    const user = await userService.findUserByJWT(userData);
    if (name) {
      user.name = name;
      await user.save();
    }

    if (age) {
      user.age = age;
      await user.save();
    }

    if (quote) {
      user.quote = quote;
      await user.save();
    }

    // Save updated user data
    await user.save();

    // Send successful response
    res.status(200).json(user);
  } catch (error) {
    // Error Handling
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating user information' });
  }
}



const postUserDrawing = async (req, res) => {
  const userData = req.headers;
  const { dataURL } = req.body;

  try {
    const user = await userService.findUserByJWT(userData);
    if (dataURL) {
      user.drawing = dataURL;
    }
    const savedDrawing = await user.save(); // Use await with user.save() to get the saved document
    res.status(201).send(savedDrawing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving picture = ', error);
  }
};

const getDrawing = async (req, res) => {
  const userData = req.headers;
  try {
    const user = await userService.findUserByJWT(userData);
    if (user.drawing) {
      res.json({ dataURL: user.drawing }); // Return the drawing from the user.drawing property
    } else {
      res.status(404).json({ error: 'Picture not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting picture' });
  }
};


module.exports = {
  registration,
  login,
  logout,
  ckechToken,
  changeUserAvatar,
  getUserData,
  updateUserInfo,
  postUserDrawing,
  getDrawing
};
