const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

        const verified = jwt.verify(token, process.env.JWT_SECRET_USER);

        req.user = verified.user;

        
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errorMessage: 'Unauthorized' });
    }
}

module.exports = authUser;
