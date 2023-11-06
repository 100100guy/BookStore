const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized');
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      res.status(403)
      throw new Error('Forbidden');
    }
    // Attach the user to the request for future use
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
