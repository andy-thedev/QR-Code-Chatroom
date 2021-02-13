const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        room: user.room,
    }, config.JWT_SECRET);
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return
        });
    } else{
        return res.status(401).send({msg:"Token is not supplied."})
    }
}

module.exports = {getToken, isAuth};