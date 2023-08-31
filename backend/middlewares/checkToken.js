const jwt = require('jsonwebtoken');

// Middleware to check if the token is valid
module.exports.checkToken = (req, res, next) => {
  const token = req.body.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET); 
    req.user = decodedToken; // Store the user data from the token in the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};




