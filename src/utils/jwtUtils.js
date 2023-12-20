const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load variables from .env file
dotenv.config();

const generateToken = (payload) => jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN },
);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Token verification failed
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
