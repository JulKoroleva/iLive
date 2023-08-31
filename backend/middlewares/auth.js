const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('req authorization = ',req )
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(400).send(`Header authorization is wrong: ${authorization}`)
    req.connection.destroy(); //without calling next()
    console.log("Header error")
    return;
  } else {
    const token = authorization.replace('Bearer ', '');
    console.log("token = ", token)
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        console.log('payload = ', payload)
    } catch (err) {
        err.statusCode = 401;
        res.status(err.statusCode).send(`Unauthorization`)
        req.connection.destroy(); //without calling next()
        console.log("authorization err = ", err)
        return;
    }
    //req.user = payload;
    console.log(`Auth is successfull. URL: ${req.originalUrl}`)
    return next();
  }
  
};
