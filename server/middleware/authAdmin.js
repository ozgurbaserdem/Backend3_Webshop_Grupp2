const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({errorMessage: "Unauthorized"})

        const verified = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

        // Skapar ny prop på req
        req.user = verified.user;

        next();

    } catch (err){
        console.log(err);
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = authAdmin