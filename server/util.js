const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, config.JWT_SECRET, {
        expiresIn: "48h",
    });
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) throw "Token is undefined."
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
        });
    } catch(err) {
        res.status(401).json({
            message: "Invalid Token."
        });
    }
}

module.exports = {getToken, isAuth};