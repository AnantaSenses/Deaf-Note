const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load variables from .env file
dotenv.config();

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Unauthorized: Missing or invalid token format' } });
  }

  const tokenWithoutBearer = token.split('Bearer ')[1];

  if (!tokenWithoutBearer) {
    return res.status(401).json({ error: { message: 'Unauthorized: Missing token value' } });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(401).json({ error: { message: 'Unauthorized: Token verification failed', details: error.message } });
  }
};

module.exports = authMiddleware;
