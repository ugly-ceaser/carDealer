// authorize request with jwt
const jwt = require('jsonwebtoken');
const { fetchById } = require('../utils/helpers');

const authorize = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //check if its bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Use next(error) instead of throwing
    return next(new Error('Access denied. No token provided.'));
  }
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new Error('Access denied. No token provided.'));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      // Pass the JWT verification error to the next middleware
      // This 'err' object from jwt.verify will contain specific details
      // like TokenExpiredError, JsonWebTokenError, etc.
      return next(err);
    }
    try {
      const verifiedUser = await fetchById('users', user.id);
      if (!verifiedUser || verifiedUser.length === 0) {
        return next(new Error('User not found.'));
      }
      res.locals.user = verifiedUser[0];
      next(); // Call next without an error when successful
    } catch (dbError) {
      // Catch any potential database errors during user fetching
      next(dbError);
    }
  });
};

// check if user is admin
const isAdmin = async (req, res, next) => {
  if (!res.locals.user || !res.locals.user.admin) {
    // Added a check for res.locals.user just in case
    return next(
      new Error(
        'Access denied. You do not have permission to perform this action.'
      )
    );
  }
  next();
};

module.exports = { authorize, isAdmin };
