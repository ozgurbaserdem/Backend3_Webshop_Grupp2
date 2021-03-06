const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    const verified = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    req.user = verified.user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ errorMessage: 'Unauthorized' });
  }
}

module.exports = authAdmin;
