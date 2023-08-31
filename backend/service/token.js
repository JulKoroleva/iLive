const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token')


class TokenService {

   generateToken (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
    console.log('accessToken', accessToken)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'})
    console.log('refreshToken', refreshToken)
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
      try {
          const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
          return userData;
      } catch (e) {
          return null;
      }
  }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

async saveToken(userId, refreshToken) {
  try {
    console.log('userId, refreshToken', userId, refreshToken);
    const tokenData = await tokenModel.findOne({ user: userId });
    console.log('saveToken tokenData', tokenData);
    if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({ user: userId, refreshToken });
  return token;
  } catch (error) {
    console.error('Error saving token:', error);
    throw error; 
  }
}

async removeToken(refreshToken) {
  console.log('Token is being deleted', refreshToken);
   try {
     await tokenModel.deleteOne({refreshToken});
     console.log('Token deleted successfully', refreshToken);
   } catch (err) {
     console.log(err);
     throw new Error('Error while deleting token from database');
   }
}


  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData;
}

  
}

module.exports = new TokenService();
