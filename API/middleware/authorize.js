//authorize request with jwt
const jwt = require('jsonwebtoken');
const { fetchById } = require('../utils/helpers');

const authorize = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //check if its bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Access denied. No token provided.');
  }
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Access denied. No token provided.');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      res.status(403);
      throw new Error('Invalid or expired token.');
    }
    const verifiedUser = await fetchById('users', user.id);
    res.locals.user = verifiedUser[0];
    if (!res.locals.user) {
      res.status(403);
      throw new Error('User not found.');
    }
    next(err);
  });
};

// check if user is admin
const isAdmin = async (req, res, next) => {
  if (!res.locals.user.admin) {
    res.status(403);
    throw new Error(
      'Access denied. You do not have permission to perform this action.'
    );
  }
  next();
};

module.exports = { authorize, isAdmin };
